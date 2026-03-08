import type { RoomType } from "./types";

export const ROOM_TYPES: RoomType[] = [
  {
    id: "standard",
    nameEn: "Standard Room",
    nameEs: "Habitación Estándar",
    descriptionEn:
      "A cozy retreat with garden views, queen-size bed, private bathroom, air conditioning, and complimentary WiFi.",
    descriptionEs:
      "Un acogedor refugio con vistas al jardín, cama queen, baño privado, aire acondicionado y WiFi gratuito.",
    capacity: 2,
    totalInventory: 4,
    basePriceUSD: 65,
    basePriceCOP: 270000,
    image:
      "https://static.wixstatic.com/media/ea9539_89143b8883ca406b92cac1d8f4d156e1~mv2.jpg/v1/fit/w_800,h_600,q_90,enc_avif,quality_auto/ea9539_89143b8883ca406b92cac1d8f4d156e1~mv2.jpg",
    amenities: ["Queen bed", "Garden view", "AC", "WiFi", "Private bathroom"],
  },
  {
    id: "family",
    nameEn: "Family Suite",
    nameEs: "Suite Familiar",
    descriptionEn:
      "Spacious suite with separate living area, two bedrooms, garden and pool views. Designed for families.",
    descriptionEs:
      "Amplia suite con sala independiente, dos habitaciones, vistas al jardín y la piscina. Diseñada para familias.",
    capacity: 5,
    totalInventory: 2,
    basePriceUSD: 120,
    basePriceCOP: 500000,
    image:
      "https://static.wixstatic.com/media/ea9539_89f4ce11a3344d41b82b9f75796ca8c6~mv2.jpg/v1/fit/w_800,h_600,q_90,enc_avif,quality_auto/ea9539_89f4ce11a3344d41b82b9f75796ca8c6~mv2.jpg",
    amenities: [
      "2 bedrooms",
      "Living area",
      "Pool view",
      "AC",
      "WiFi",
      "Private bathroom",
    ],
  },
  {
    id: "premium",
    nameEn: "Premium Suite",
    nameEs: "Suite Premium",
    descriptionEn:
      "Our finest accommodation with private balcony, sunset views, king-size bed, and luxury bamboo-finished bathroom.",
    descriptionEs:
      "Nuestro mejor alojamiento con balcón privado, vistas al atardecer, cama king y baño de lujo con acabados en bambú.",
    capacity: 2,
    totalInventory: 2,
    basePriceUSD: 160,
    basePriceCOP: 670000,
    image:
      "https://static.wixstatic.com/media/ea9539_a4a237ebd38544e0b56d6ebc39a41dc9~mv2.jpg/v1/fit/w_800,h_600,q_90,enc_avif,quality_auto/ea9539_a4a237ebd38544e0b56d6ebc39a41dc9~mv2.jpg",
    amenities: [
      "King bed",
      "Private balcony",
      "Sunset view",
      "AC",
      "WiFi",
      "Luxury bathroom",
      "Premium amenities",
    ],
  },
];

export function getRoomType(id: string): RoomType | undefined {
  return ROOM_TYPES.find((r) => r.id === id);
}
