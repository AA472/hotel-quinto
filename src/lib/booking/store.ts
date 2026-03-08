import { getSupabase } from "@/lib/supabase";
import type { Booking } from "./types";

// ─── Supabase Storage Layer ──────────────────────────────────────────────────

function rowToBooking(row: Record<string, unknown>): Booking {
  return {
    id: row.id as string,
    roomTypeId: row.room_type_id as string,
    checkIn: row.check_in as string,
    checkOut: row.check_out as string,
    nights: row.nights as number,
    guestName: row.guest_name as string,
    guestEmail: row.guest_email as string,
    guestPhone: row.guest_phone as string,
    guestCountry: (row.guest_country as string) || undefined,
    adults: row.adults as number,
    children: row.children as number,
    specialRequests: (row.special_requests as string) || undefined,
    status: row.status as Booking["status"],
    source: row.source as Booking["source"],
    externalId: (row.external_id as string) || undefined,
    totalPriceUSD: Number(row.total_price_usd),
    totalPriceCOP: Number(row.total_price_cop),
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function bookingToRow(b: Booking) {
  return {
    id: b.id,
    room_type_id: b.roomTypeId,
    check_in: b.checkIn,
    check_out: b.checkOut,
    nights: b.nights,
    guest_name: b.guestName,
    guest_email: b.guestEmail,
    guest_phone: b.guestPhone,
    guest_country: b.guestCountry || null,
    adults: b.adults,
    children: b.children,
    special_requests: b.specialRequests || null,
    status: b.status,
    source: b.source,
    external_id: b.externalId || null,
    total_price_usd: b.totalPriceUSD,
    total_price_cop: b.totalPriceCOP,
    created_at: b.createdAt,
    updated_at: b.updatedAt,
  };
}

export async function getAllBookings(): Promise<Booking[]> {
  const { data, error } = await getSupabase()
    .from("bookings")
    .select("*")
    .order("check_in", { ascending: true });
  if (error) throw error;
  return (data || []).map(rowToBooking);
}

export async function getBookingById(
  id: string
): Promise<Booking | undefined> {
  const { data, error } = await getSupabase()
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return undefined;
  return rowToBooking(data);
}

export async function getActiveBookings(): Promise<Booking[]> {
  const { data, error } = await getSupabase()
    .from("bookings")
    .select("*")
    .not("status", "in", '("cancelled","no_show")')
    .order("check_in", { ascending: true });
  if (error) throw error;
  return (data || []).map(rowToBooking);
}

export async function saveBooking(booking: Booking): Promise<Booking> {
  const row = bookingToRow(booking);
  const { error } = await getSupabase().from("bookings").upsert(row);
  if (error) throw error;
  return booking;
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<void> {
  const { error } = await getSupabase()
    .from("bookings")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function getBookingsForDateRange(
  checkIn: string,
  checkOut: string,
  roomTypeId?: string
): Promise<Booking[]> {
  let query = getSupabase()
    .from("bookings")
    .select("*")
    .not("status", "in", '("cancelled","no_show")')
    .lt("check_in", checkOut)
    .gt("check_out", checkIn);

  if (roomTypeId) {
    query = query.eq("room_type_id", roomTypeId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(rowToBooking);
}

export async function getBookingByExternalId(
  externalId: string,
  source: string
): Promise<Booking | undefined> {
  const { data, error } = await getSupabase()
    .from("bookings")
    .select("*")
    .eq("external_id", externalId)
    .eq("source", source)
    .single();
  if (error) return undefined;
  return rowToBooking(data);
}
