// ─── Booking System Types ────────────────────────────────────────────────────
// Designed for OTA compatibility (Booking.com, Airbnb, Expedia, etc.)

export type BookingSource =
  | "direct"
  | "booking.com"
  | "airbnb"
  | "expedia"
  | "other";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "checked_in"
  | "checked_out"
  | "no_show";

export interface RoomType {
  id: string;
  nameEn: string;
  nameEs: string;
  descriptionEn: string;
  descriptionEs: string;
  capacity: number;
  totalInventory: number;
  basePriceUSD: number;
  basePriceCOP: number;
  image: string;
  amenities: string[];
}

export interface Booking {
  id: string;
  roomTypeId: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCountry?: string;
  adults: number;
  children: number;
  specialRequests?: string;
  status: BookingStatus;
  source: BookingSource;
  externalId?: string; // OTA booking reference
  totalPriceUSD: number;
  totalPriceCOP: number;
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilityQuery {
  checkIn: string;
  checkOut: string;
  guests?: number;
}

export interface RoomAvailability {
  roomTypeId: string;
  available: boolean;
  remainingRooms: number;
  pricePerNightUSD: number;
  pricePerNightCOP: number;
  totalNights: number;
  totalPriceUSD: number;
  totalPriceCOP: number;
}

export interface CreateBookingInput {
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCountry?: string;
  adults: number;
  children: number;
  specialRequests?: string;
  source?: BookingSource;
  externalId?: string;
}
