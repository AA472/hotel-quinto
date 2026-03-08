import { getSupabase } from "@/lib/supabase";
import { parseICal } from "./ical-parser";
import { saveBooking, getBookingByExternalId } from "./store";
import { getRoomType } from "./rooms";
import type { Booking, BookingSource } from "./types";

// ─── iCal Sync ───────────────────────────────────────────────────────────────
// Fetches iCal feeds from OTA channels (Booking.com, Airbnb, etc.)
// and creates/updates bookings in our system.

interface ChannelFeed {
  id: string;
  name: string;
  source: string;
  room_type_id: string;
  ical_url: string;
  enabled: boolean;
}

function generateId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "HQ-";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function daysBetween(a: string, b: string): number {
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / 86400000
  );
}

export interface SyncResult {
  feed: string;
  created: number;
  updated: number;
  errors: string[];
}

export async function syncAllFeeds(): Promise<SyncResult[]> {
  const { data: feeds, error } = await getSupabase()
    .from("channel_feeds")
    .select("*")
    .eq("enabled", true);

  if (error) throw error;
  if (!feeds || feeds.length === 0) return [];

  const results: SyncResult[] = [];

  for (const feed of feeds as ChannelFeed[]) {
    const result = await syncFeed(feed);
    results.push(result);

    // Update last_synced_at
    await getSupabase()
      .from("channel_feeds")
      .update({ last_synced_at: new Date().toISOString() })
      .eq("id", feed.id);
  }

  return results;
}

async function syncFeed(feed: ChannelFeed): Promise<SyncResult> {
  const result: SyncResult = {
    feed: feed.name,
    created: 0,
    updated: 0,
    errors: [],
  };

  let icalText: string;
  try {
    const res = await fetch(feed.ical_url, {
      headers: { "User-Agent": "HotelQuinto/1.0" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    icalText = await res.text();
  } catch (e) {
    result.errors.push(
      `Failed to fetch: ${e instanceof Error ? e.message : "unknown error"}`
    );
    return result;
  }

  const events = parseICal(icalText);
  const room = getRoomType(feed.room_type_id);
  if (!room) {
    result.errors.push(`Unknown room type: ${feed.room_type_id}`);
    return result;
  }

  for (const event of events) {
    try {
      const nights = daysBetween(event.dtstart, event.dtend);
      if (nights < 1) continue;

      // Check if we already have this booking
      const existing = await getBookingByExternalId(
        event.uid,
        feed.source
      );

      if (existing) {
        // Update dates if changed
        if (
          existing.checkIn !== event.dtstart ||
          existing.checkOut !== event.dtend
        ) {
          existing.checkIn = event.dtstart;
          existing.checkOut = event.dtend;
          existing.nights = nights;
          existing.totalPriceUSD = room.basePriceUSD * nights;
          existing.totalPriceCOP = room.basePriceCOP * nights;
          existing.updatedAt = new Date().toISOString();
          await saveBooking(existing);
          result.updated++;
        }
      } else {
        // Extract guest name from summary
        // Booking.com: "Booking.com - John Doe" or "CLOSED - Not available"
        // Airbnb: "Reserved - John Doe" or "John Doe"
        let guestName = event.summary || "OTA Guest";
        guestName = guestName
          .replace(/^(Booking\.com|Reserved|CLOSED)\s*[-–]\s*/i, "")
          .trim();

        // Skip "Not available" / blocked dates entries that aren't real bookings
        const isBlocked =
          /not available|closed|blocked|unavailable/i.test(event.summary);

        const now = new Date().toISOString();
        const booking: Booking = {
          id: generateId(),
          roomTypeId: feed.room_type_id,
          checkIn: event.dtstart,
          checkOut: event.dtend,
          nights,
          guestName: isBlocked ? "Blocked" : guestName,
          guestEmail: "",
          guestPhone: "",
          adults: 1,
          children: 0,
          status: isBlocked ? "confirmed" : "confirmed",
          source: feed.source as BookingSource,
          externalId: event.uid,
          totalPriceUSD: room.basePriceUSD * nights,
          totalPriceCOP: room.basePriceCOP * nights,
          createdAt: now,
          updatedAt: now,
        };

        await saveBooking(booking);
        result.created++;
      }
    } catch (e) {
      result.errors.push(
        `Event ${event.uid}: ${e instanceof Error ? e.message : "error"}`
      );
    }
  }

  return result;
}
