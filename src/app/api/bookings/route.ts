import { NextRequest, NextResponse } from "next/server";
import { checkAvailability } from "@/lib/booking/availability";
import { saveBooking } from "@/lib/booking/store";
import { getRoomType } from "@/lib/booking/rooms";
import type { Booking, CreateBookingInput } from "@/lib/booking/types";

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

export async function POST(req: NextRequest) {
  let body: CreateBookingInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    roomTypeId,
    checkIn,
    checkOut,
    guestName,
    guestEmail,
    guestPhone,
    adults,
    children,
    specialRequests,
    guestCountry,
    source = "direct",
    externalId,
  } = body;

  // Validate required fields
  if (
    !roomTypeId ||
    !checkIn ||
    !checkOut ||
    !guestName ||
    !guestEmail ||
    !guestPhone ||
    !adults
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Validate room type
  const room = getRoomType(roomTypeId);
  if (!room) {
    return NextResponse.json(
      { error: "Invalid room type" },
      { status: 400 }
    );
  }

  // Check capacity
  const totalGuests = adults + (children || 0);
  if (totalGuests > room.capacity) {
    return NextResponse.json(
      {
        error: `Room capacity is ${room.capacity} guests. You selected ${totalGuests}.`,
      },
      { status: 400 }
    );
  }

  // Check availability
  const availability = checkAvailability({
    checkIn,
    checkOut,
    guests: totalGuests,
  });
  const roomAvail = availability.find((a) => a.roomTypeId === roomTypeId);

  if (!roomAvail || !roomAvail.available) {
    return NextResponse.json(
      { error: "Room not available for selected dates" },
      { status: 409 }
    );
  }

  const nights = daysBetween(checkIn, checkOut);
  const now = new Date().toISOString();

  const booking: Booking = {
    id: generateId(),
    roomTypeId,
    checkIn,
    checkOut,
    nights,
    guestName,
    guestEmail,
    guestPhone,
    guestCountry,
    adults,
    children: children || 0,
    specialRequests,
    status: "pending",
    source,
    externalId,
    totalPriceUSD: room.basePriceUSD * nights,
    totalPriceCOP: room.basePriceCOP * nights,
    createdAt: now,
    updatedAt: now,
  };

  saveBooking(booking);

  return NextResponse.json({ booking }, { status: 201 });
}
