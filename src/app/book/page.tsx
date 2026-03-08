"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Users,
  Check,
  Loader2,
  AlertCircle,
  Star,
  Wifi,
  Wind,
  Droplets,
  Eye,
  Bed,
  Home,
  Copy,
  MessageCircle,
} from "lucide-react";

// ─── Bilingual Support ───────────────────────────────────────────────────────

type Lang = "en" | "es";

const tx = {
  "book.title": { en: "Book Your Stay", es: "Reserva Tu Estadía" },
  "book.subtitle": {
    en: "Direct booking — best rate guaranteed",
    es: "Reserva directa — mejor tarifa garantizada",
  },
  "step.dates": { en: "Dates", es: "Fechas" },
  "step.room": { en: "Room", es: "Habitación" },
  "step.details": { en: "Details", es: "Datos" },
  "step.confirm": { en: "Confirm", es: "Confirmar" },
  "dates.checkin": { en: "Check-in", es: "Llegada" },
  "dates.checkout": { en: "Check-out", es: "Salida" },
  "dates.adults": { en: "Adults", es: "Adultos" },
  "dates.children": { en: "Children", es: "Niños" },
  "dates.next": { en: "Check Availability", es: "Ver Disponibilidad" },
  "dates.checkin.time": { en: "From 4:00 PM", es: "Desde las 4:00 PM" },
  "dates.checkout.time": { en: "Until 2:00 PM", es: "Hasta las 2:00 PM" },
  "room.select": { en: "Select Room", es: "Seleccionar" },
  "room.selected": { en: "Selected", es: "Seleccionado" },
  "room.pernight": { en: "/ night", es: "/ noche" },
  "room.total": { en: "Total", es: "Total" },
  "room.nights": { en: "nights", es: "noches" },
  "room.night": { en: "night", es: "noche" },
  "room.guests": { en: "Up to", es: "Hasta" },
  "room.guestsEnd": { en: "guests", es: "huéspedes" },
  "room.unavailable": { en: "Unavailable", es: "No disponible" },
  "room.left": { en: "left", es: "disponible(s)" },
  "details.name": { en: "Full Name", es: "Nombre Completo" },
  "details.email": { en: "Email", es: "Correo Electrónico" },
  "details.phone": { en: "Phone (with country code)", es: "Teléfono (con código de país)" },
  "details.country": { en: "Country", es: "País" },
  "details.requests": {
    en: "Special Requests (optional)",
    es: "Solicitudes Especiales (opcional)",
  },
  "details.next": { en: "Review Booking", es: "Revisar Reserva" },
  "confirm.title": { en: "Booking Summary", es: "Resumen de Reserva" },
  "confirm.room": { en: "Room", es: "Habitación" },
  "confirm.dates": { en: "Dates", es: "Fechas" },
  "confirm.guest": { en: "Guest", es: "Huésped" },
  "confirm.guests": { en: "Guests", es: "Huéspedes" },
  "confirm.total": { en: "Total", es: "Total" },
  "confirm.submit": { en: "Confirm Booking", es: "Confirmar Reserva" },
  "confirm.submitting": { en: "Booking...", es: "Reservando..." },
  "confirm.policy": {
    en: "Free cancellation up to 48 hours before check-in.",
    es: "Cancelación gratuita hasta 48 horas antes del check-in.",
  },
  "success.title": { en: "Booking Confirmed!", es: "¡Reserva Confirmada!" },
  "success.subtitle": {
    en: "Your reservation has been received. You will receive a confirmation email shortly.",
    es: "Tu reserva ha sido recibida. Recibirás un correo de confirmación pronto.",
  },
  "success.ref": { en: "Booking Reference", es: "Referencia de Reserva" },
  "success.whatsapp": { en: "Contact us on WhatsApp", es: "Contáctanos por WhatsApp" },
  "success.home": { en: "Back to Home", es: "Volver al Inicio" },
  "error.unavailable": {
    en: "This room is no longer available for the selected dates.",
    es: "Esta habitación ya no está disponible para las fechas seleccionadas.",
  },
  "error.generic": {
    en: "Something went wrong. Please try again.",
    es: "Algo salió mal. Por favor intenta de nuevo.",
  },
  back: { en: "Back", es: "Atrás" },
  or: { en: "or", es: "o" },
} as const;

type TxKey = keyof typeof tx;

// ─── Types ───────────────────────────────────────────────────────────────────

interface RoomAvailability {
  roomTypeId: string;
  available: boolean;
  remainingRooms: number;
  pricePerNightUSD: number;
  pricePerNightCOP: number;
  totalNights: number;
  totalPriceUSD: number;
  totalPriceCOP: number;
}

interface RoomInfo {
  id: string;
  nameEn: string;
  nameEs: string;
  descriptionEn: string;
  descriptionEs: string;
  capacity: number;
  image: string;
  amenities: string[];
}

const ROOMS: RoomInfo[] = [
  {
    id: "standard",
    nameEn: "Standard Room",
    nameEs: "Habitación Estándar",
    descriptionEn:
      "A cozy retreat with garden views, queen-size bed, private bathroom, air conditioning, and complimentary WiFi.",
    descriptionEs:
      "Un acogedor refugio con vistas al jardín, cama queen, baño privado, aire acondicionado y WiFi gratuito.",
    capacity: 2,
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

const amenityIcons: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  AC: Wind,
  "Pool view": Droplets,
  "Garden view": Eye,
  "Sunset view": Eye,
  "Queen bed": Bed,
  "King bed": Bed,
  "2 bedrooms": Home,
  "Living area": Home,
  "Private bathroom": Droplets,
  "Luxury bathroom": Star,
  "Premium amenities": Star,
  "Private balcony": Eye,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO").format(value);
}

function getTomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function getDayAfterTomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
}

function formatDate(dateStr: string, lang: Lang): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString(
    lang === "es" ? "es-CO" : "en-US",
    { weekday: "short", month: "short", day: "numeric", year: "numeric" }
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function BookPage() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const htmlLang = document.documentElement.lang;
    if (htmlLang === "es") setLang("es");
  }, []);

  const t = useCallback(
    (key: TxKey) => tx[key][lang],
    [lang]
  );

  const [step, setStep] = useState(0);

  // Step 0: Dates
  const [checkIn, setCheckIn] = useState(getTomorrow);
  const [checkOut, setCheckOut] = useState(getDayAfterTomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Step 1: Room selection
  const [availability, setAvailability] = useState<RoomAvailability[]>([]);
  const [loadingAvail, setLoadingAvail] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Step 2: Guest details
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCountry, setGuestCountry] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Step 3: Confirmation
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    t("step.dates"),
    t("step.room"),
    t("step.details"),
    t("step.confirm"),
  ];

  // ─── Fetch availability ──────────────────────────────────────────────────
  async function fetchAvailability() {
    setLoadingAvail(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        checkIn,
        checkOut,
        guests: String(adults + children),
      });
      const res = await fetch(`/api/availability?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAvailability(data.availability);
      setStep(1);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("error.generic"));
    } finally {
      setLoadingAvail(false);
    }
  }

  // ─── Submit booking ──────────────────────────────────────────────────────
  async function submitBooking() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomTypeId: selectedRoom,
          checkIn,
          checkOut,
          guestName,
          guestEmail,
          guestPhone,
          guestCountry: guestCountry || undefined,
          adults,
          children,
          specialRequests: specialRequests || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) throw new Error(t("error.unavailable"));
        throw new Error(data.error || t("error.generic"));
      }
      setBookingRef(data.booking.id);
      setStep(4); // success
    } catch (e) {
      setError(e instanceof Error ? e.message : t("error.generic"));
    } finally {
      setSubmitting(false);
    }
  }

  const selectedRoomInfo = ROOMS.find((r) => r.id === selectedRoom);
  const selectedAvail = availability.find(
    (a) => a.roomTypeId === selectedRoom
  );

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 flex h-16 items-center justify-between">
          <a
            href="/"
            className="font-heading text-xl font-bold text-stone-900"
          >
            Hotel <span className="text-gold">Quinto</span>
          </a>
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-stone-100"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-2">
            {t("book.title")}
          </h1>
          <p className="text-stone-500">{t("book.subtitle")}</p>
        </div>

        {/* Stepper (hidden on success) */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    i === step
                      ? "bg-amber-700 text-white"
                      : i < step
                        ? "bg-forest/10 text-forest"
                        : "bg-stone-100 text-stone-400"
                  }`}
                >
                  {i < step ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <span className="w-5 text-center">{i + 1}</span>
                  )}
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 ${
                      i < step ? "bg-forest/30" : "bg-stone-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* ─── Step 0: Dates ──────────────────────────────────────────── */}
        {step === 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  <Calendar className="inline h-4 w-4 mr-1.5 text-forest" />
                  {t("dates.checkin")}
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={getTomorrow()}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (e.target.value >= checkOut) {
                      const next = new Date(e.target.value);
                      next.setDate(next.getDate() + 1);
                      setCheckOut(next.toISOString().split("T")[0]);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-charcoal"
                />
                <p className="text-xs text-stone-400 mt-1">
                  {t("dates.checkin.time")}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  <Calendar className="inline h-4 w-4 mr-1.5 text-forest" />
                  {t("dates.checkout")}
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-charcoal"
                />
                <p className="text-xs text-stone-400 mt-1">
                  {t("dates.checkout.time")}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  <Users className="inline h-4 w-4 mr-1.5 text-forest" />
                  {t("dates.adults")}
                </label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-charcoal bg-white"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  <Users className="inline h-4 w-4 mr-1.5 text-forest" />
                  {t("dates.children")}
                </label>
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-charcoal bg-white"
                >
                  {[0, 1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={fetchAvailability}
              disabled={loadingAvail}
              className="w-full bg-amber-700 hover:bg-amber-600 disabled:bg-stone-300 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              {loadingAvail ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {t("dates.next")}
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        )}

        {/* ─── Step 1: Room Selection ─────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-6">
            <button
              onClick={() => setStep(0)}
              className="text-sm text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </button>

            <p className="text-sm text-stone-500 text-center">
              {formatDate(checkIn, lang)} → {formatDate(checkOut, lang)} ·{" "}
              {adults + children}{" "}
              {lang === "es" ? "huéspedes" : "guests"}
            </p>

            <div className="space-y-4">
              {ROOMS.map((room) => {
                const avail = availability.find(
                  (a) => a.roomTypeId === room.id
                );
                const isAvailable = avail?.available ?? false;
                const isSelected = selectedRoom === room.id;
                const totalGuests = adults + children;
                const fitsGuests = room.capacity >= totalGuests;

                return (
                  <div
                    key={room.id}
                    className={`bg-white rounded-2xl overflow-hidden border-2 transition-all ${
                      isSelected
                        ? "border-amber-600 shadow-lg shadow-amber-600/10"
                        : isAvailable && fitsGuests
                          ? "border-stone-200 hover:border-stone-300 hover:shadow-md"
                          : "border-stone-200 opacity-60"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative sm:w-64 shrink-0">
                        <div
                          className="relative w-full"
                          style={{ aspectRatio: "16/10" }}
                        >
                          <Image
                            src={room.image}
                            alt={lang === "es" ? room.nameEs : room.nameEn}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 256px"
                          />
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="font-heading text-xl font-bold text-charcoal mb-1">
                            {lang === "es" ? room.nameEs : room.nameEn}
                          </h3>
                          <p className="text-stone-500 text-sm mb-3">
                            {lang === "es"
                              ? room.descriptionEs
                              : room.descriptionEn}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.amenities.map((a) => {
                              const Icon = amenityIcons[a] || Star;
                              return (
                                <span
                                  key={a}
                                  className="inline-flex items-center gap-1 text-xs text-stone-500 bg-stone-50 px-2 py-1 rounded-md"
                                >
                                  <Icon className="h-3 w-3" />
                                  {a}
                                </span>
                              );
                            })}
                          </div>
                          <p className="text-xs text-stone-400">
                            {t("room.guests")} {room.capacity}{" "}
                            {t("room.guestsEnd")}
                          </p>
                        </div>
                        <div className="flex items-end justify-between mt-4 pt-4 border-t border-stone-100">
                          <div>
                            {avail && (
                              <>
                                <p className="font-heading text-2xl font-bold text-charcoal">
                                  ${avail.pricePerNightUSD}{" "}
                                  <span className="text-sm font-normal text-stone-400">
                                    USD {t("room.pernight")}
                                  </span>
                                </p>
                                <p className="text-xs text-stone-400">
                                  COP {formatCOP(avail.pricePerNightCOP)}{" "}
                                  {t("room.pernight")}
                                </p>
                                {isAvailable && avail.remainingRooms <= 2 && (
                                  <p className="text-xs text-amber-600 font-medium mt-1">
                                    {avail.remainingRooms} {t("room.left")}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                          {isAvailable && fitsGuests ? (
                            <button
                              onClick={() => {
                                setSelectedRoom(room.id);
                                setStep(2);
                              }}
                              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                                isSelected
                                  ? "bg-forest text-white"
                                  : "bg-amber-700 hover:bg-amber-600 text-white"
                              }`}
                            >
                              {isSelected ? (
                                <span className="flex items-center gap-1.5">
                                  <Check className="h-4 w-4" />
                                  {t("room.selected")}
                                </span>
                              ) : (
                                t("room.select")
                              )}
                            </button>
                          ) : (
                            <span className="px-5 py-2.5 rounded-xl text-sm font-medium text-stone-400 bg-stone-100">
                              {!fitsGuests
                                ? `Max ${room.capacity}`
                                : t("room.unavailable")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Step 2: Guest Details ──────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-6">
            <button
              onClick={() => setStep(1)}
              className="text-sm text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </button>

            {selectedRoomInfo && selectedAvail && (
              <div className="bg-forest/5 border border-forest/20 rounded-xl p-4 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={selectedRoomInfo.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-charcoal">
                    {lang === "es"
                      ? selectedRoomInfo.nameEs
                      : selectedRoomInfo.nameEn}
                  </p>
                  <p className="text-sm text-stone-500">
                    {selectedAvail.totalNights}{" "}
                    {selectedAvail.totalNights === 1
                      ? t("room.night")
                      : t("room.nights")}{" "}
                    · ${selectedAvail.totalPriceUSD} USD
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    {t("details.name")} *
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-charcoal"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">
                      {t("details.email")} *
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">
                      {t("details.phone")} *
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+1 555 123 4567"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-charcoal"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    {t("details.country")}
                  </label>
                  <input
                    type="text"
                    value={guestCountry}
                    onChange={(e) => setGuestCountry(e.target.value)}
                    placeholder="Colombia"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    {t("details.requests")}
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none transition-all text-charcoal resize-none"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  if (!guestName || !guestEmail || !guestPhone) {
                    setError(
                      lang === "es"
                        ? "Por favor completa los campos requeridos."
                        : "Please fill in all required fields."
                    );
                    return;
                  }
                  setError(null);
                  setStep(3);
                }}
                className="w-full mt-6 bg-amber-700 hover:bg-amber-600 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
              >
                {t("details.next")}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 3: Review & Confirm ───────────────────────────────── */}
        {step === 3 && selectedRoomInfo && selectedAvail && (
          <div className="space-y-6">
            <button
              onClick={() => setStep(2)}
              className="text-sm text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </button>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
                {t("confirm.title")}
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-stone-100">
                  <span className="text-stone-500">{t("confirm.room")}</span>
                  <span className="font-semibold text-charcoal">
                    {lang === "es"
                      ? selectedRoomInfo.nameEs
                      : selectedRoomInfo.nameEn}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-stone-100">
                  <span className="text-stone-500">{t("confirm.dates")}</span>
                  <span className="font-semibold text-charcoal text-right">
                    {formatDate(checkIn, lang)} → {formatDate(checkOut, lang)}
                    <br />
                    <span className="text-sm font-normal text-stone-400">
                      {selectedAvail.totalNights}{" "}
                      {selectedAvail.totalNights === 1
                        ? t("room.night")
                        : t("room.nights")}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-stone-100">
                  <span className="text-stone-500">{t("confirm.guest")}</span>
                  <span className="font-semibold text-charcoal text-right">
                    {guestName}
                    <br />
                    <span className="text-sm font-normal text-stone-400">
                      {guestEmail}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-stone-100">
                  <span className="text-stone-500">{t("confirm.guests")}</span>
                  <span className="font-semibold text-charcoal">
                    {adults} {t("dates.adults")}
                    {children > 0 &&
                      `, ${children} ${t("dates.children")}`}
                  </span>
                </div>
                {specialRequests && (
                  <div className="py-3 border-b border-stone-100">
                    <p className="text-stone-500 text-sm mb-1">
                      {t("details.requests")}
                    </p>
                    <p className="text-charcoal text-sm">{specialRequests}</p>
                  </div>
                )}
                <div className="flex justify-between py-4 bg-forest/5 -mx-8 px-8 rounded-xl mt-4">
                  <span className="font-heading text-lg font-bold text-charcoal">
                    {t("confirm.total")}
                  </span>
                  <div className="text-right">
                    <p className="font-heading text-2xl font-bold text-forest">
                      ${selectedAvail.totalPriceUSD} USD
                    </p>
                    <p className="text-sm text-stone-500">
                      COP {formatCOP(selectedAvail.totalPriceCOP)}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-400 mb-6 text-center">
                {t("confirm.policy")}
              </p>

              <button
                onClick={submitBooking}
                disabled={submitting}
                className="w-full bg-forest hover:bg-emerald-800 disabled:bg-stone-300 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t("confirm.submitting")}
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    {t("confirm.submit")}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 4: Success ────────────────────────────────────────── */}
        {step === 4 && bookingRef && (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-stone-200 text-center">
            <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-forest" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-charcoal mb-3">
              {t("success.title")}
            </h2>
            <p className="text-stone-500 mb-8 max-w-md mx-auto">
              {t("success.subtitle")}
            </p>

            <div className="inline-flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl px-6 py-4 mb-8">
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider">
                  {t("success.ref")}
                </p>
                <p className="font-heading text-2xl font-bold text-charcoal tracking-wider">
                  {bookingRef}
                </p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(bookingRef)}
                className="p-2 rounded-lg hover:bg-stone-200 transition-colors text-stone-400 hover:text-stone-600"
                title="Copy"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/573202190476?text=${encodeURIComponent(
                  `Hi! I just made a booking (ref: ${bookingRef}). Looking forward to my stay!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <MessageCircle className="h-5 w-5" />
                {t("success.whatsapp")}
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 border-2 border-stone-200 hover:border-stone-300 text-stone-600 hover:text-stone-900 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <Home className="h-5 w-5" />
                {t("success.home")}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
