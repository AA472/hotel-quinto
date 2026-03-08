import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import type { Booking } from "./types";

// ─── Storage Abstraction ─────────────────────────────────────────────────────
// Currently uses JSON file. Swap this for Supabase/Prisma/etc. by implementing
// the same interface.

const DATA_DIR = join(process.cwd(), "data");
const BOOKINGS_FILE = join(DATA_DIR, "bookings.json");

function ensureFile() {
  if (!existsSync(BOOKINGS_FILE)) {
    writeFileSync(BOOKINGS_FILE, "[]", "utf-8");
  }
}

export function getAllBookings(): Booking[] {
  ensureFile();
  const raw = readFileSync(BOOKINGS_FILE, "utf-8");
  return JSON.parse(raw) as Booking[];
}

export function getBookingById(id: string): Booking | undefined {
  return getAllBookings().find((b) => b.id === id);
}

export function getActiveBookings(): Booking[] {
  return getAllBookings().filter(
    (b) => b.status !== "cancelled" && b.status !== "no_show"
  );
}

export function saveBooking(booking: Booking): Booking {
  const bookings = getAllBookings();
  const idx = bookings.findIndex((b) => b.id === booking.id);
  if (idx >= 0) {
    bookings[idx] = booking;
  } else {
    bookings.push(booking);
  }
  writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
  return booking;
}

export function getBookingsForDateRange(
  checkIn: string,
  checkOut: string,
  roomTypeId?: string
): Booking[] {
  return getActiveBookings().filter((b) => {
    if (roomTypeId && b.roomTypeId !== roomTypeId) return false;
    // Overlapping: booking.checkIn < query.checkOut AND booking.checkOut > query.checkIn
    return b.checkIn < checkOut && b.checkOut > checkIn;
  });
}
