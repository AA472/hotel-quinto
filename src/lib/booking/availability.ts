import type { AvailabilityQuery, RoomAvailability } from "./types";
import { ROOM_TYPES } from "./rooms";
import { getBookingsForDateRange } from "./store";

function daysBetween(a: string, b: string): number {
  const msPerDay = 86400000;
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / msPerDay
  );
}

export async function checkAvailability(
  query: AvailabilityQuery
): Promise<RoomAvailability[]> {
  const { checkIn, checkOut, guests } = query;
  const nights = daysBetween(checkIn, checkOut);

  if (nights < 1) return [];

  const results: RoomAvailability[] = [];

  for (const room of ROOM_TYPES) {
    if (guests && room.capacity < guests) continue;

    const overlapping = await getBookingsForDateRange(
      checkIn,
      checkOut,
      room.id
    );
    const remaining = room.totalInventory - overlapping.length;

    results.push({
      roomTypeId: room.id,
      available: remaining > 0,
      remainingRooms: Math.max(0, remaining),
      pricePerNightUSD: room.basePriceUSD,
      pricePerNightCOP: room.basePriceCOP,
      totalNights: nights,
      totalPriceUSD: room.basePriceUSD * nights,
      totalPriceCOP: room.basePriceCOP * nights,
    });
  }

  return results;
}
