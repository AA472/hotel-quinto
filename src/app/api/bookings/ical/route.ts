import { NextRequest, NextResponse } from "next/server";
import { getActiveBookings } from "@/lib/booking/store";
import { getRoomType } from "@/lib/booking/rooms";

// ─── iCal Feed ───────────────────────────────────────────────────────────────
// This endpoint generates an iCal (.ics) feed of all active bookings.
// Channel managers (Booking.com, Airbnb, etc.) can subscribe to this URL
// to sync availability. Many OTAs support iCal import for small properties.
//
// Usage: GET /api/bookings/ical?room=standard
//        GET /api/bookings/ical (all rooms)

function formatICalDate(dateStr: string): string {
  return dateStr.replace(/-/g, "");
}

function escapeICalText(text: string): string {
  return text.replace(/[\\;,\n]/g, (m) => {
    if (m === "\n") return "\\n";
    return "\\" + m;
  });
}

export async function GET(req: NextRequest) {
  const roomFilter = req.nextUrl.searchParams.get("room");
  const bookings = getActiveBookings().filter(
    (b) => !roomFilter || b.roomTypeId === roomFilter
  );

  const events = bookings
    .map((b) => {
      const room = getRoomType(b.roomTypeId);
      const summary = room
        ? `${room.nameEn} - ${b.guestName}`
        : b.guestName;

      return [
        "BEGIN:VEVENT",
        `UID:${b.id}@hotelquinto.com`,
        `DTSTART;VALUE=DATE:${formatICalDate(b.checkIn)}`,
        `DTEND;VALUE=DATE:${formatICalDate(b.checkOut)}`,
        `SUMMARY:${escapeICalText(summary)}`,
        `DESCRIPTION:${escapeICalText(
          `Booking ${b.id}\\nGuests: ${b.adults + b.children}\\nSource: ${b.source}\\nStatus: ${b.status}`
        )}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
      ].join("\r\n");
    })
    .join("\r\n");

  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hotel Quinto//Booking System//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Hotel Quinto Bookings",
    events,
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(calendar, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="hotel-quinto-bookings.ics"',
    },
  });
}
