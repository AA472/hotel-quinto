import type { AvailabilityQuery, RoomAvailability } from "./types";
import { ROOM_TYPES } from "./rooms";
import { getBookingsForDateRange } from "./store";

function daysBetween(a: string, b: string): number {
  const msPerDay = 86400000;
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / msPerDay
  );
}

export function checkAvailability(
  query: AvailabilityQuery
): RoomAvailability[] {
  const { checkIn, checkOut, guests } = query;
  const nights = daysBetween(checkIn, checkOut);

  if (nights < 1) return [];

  return ROOM_TYPES.filter((room) => !guests || room.capacity >= guests).map(
    (room) => {
      const overlapping = getBookingsForDateRange(
        checkIn,
        checkOut,
        room.id
      );
      const remaining = room.totalInventory - overlapping.length;

      return {
        roomTypeId: room.id,
        available: remaining > 0,
        remainingRooms: Math.max(0, remaining),
        pricePerNightUSD: room.basePriceUSD,
        pricePerNightCOP: room.basePriceCOP,
        totalNights: nights,
        totalPriceUSD: room.basePriceUSD * nights,
        totalPriceCOP: room.basePriceCOP * nights,
      };
    }
  );
}
