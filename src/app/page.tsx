"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Coffee,
  Bird,
  Waves,
  Mountain,
  TreePalm,
  Sunset,
  Wifi,
  Car,
  Dumbbell,
  UtensilsCrossed,
  Clock,
  Trees,
  Flower2,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  Users,
  ArrowRight,
  Droplets,
  HandHelping,
  WashingMachine,
  Plane,
  Quote,
} from "lucide-react";

import { LanguageProvider, useLanguage } from "./components/language-context";
import type { TranslationKey } from "./components/translations";
import {
  ScrollReveal,
  useNavScroll,
  MobileMenuButton,
  LanguageToggle,
  CountUp,
  HeroParticles,
  Divider,
} from "./components/interactive";
import { ChatWidget } from "./components/chat-widget";

// ─── Image Map (Wix CDN) ──────────────────────────────────────────────────────

const img = {
  // Hero
  hero: "https://static.wixstatic.com/media/ea9539_30fff02fdab94db8a1d8ef421a7edb0f~mv2.jpg/v1/fit/w_1920,h_1280,q_90,enc_avif,quality_auto/ea9539_30fff02fdab94db8a1d8ef421a7edb0f~mv2.jpg",
  // About
  aboutInterior:
    "https://static.wixstatic.com/media/ea9539_1d491b089ea44b47936b0caa281f0a5d~mv2.jpg/v1/fit/w_960,h_640,q_90,enc_avif,quality_auto/ea9539_1d491b089ea44b47936b0caa281f0a5d~mv2.jpg",
  aboutLounge:
    "https://static.wixstatic.com/media/ea9539_8e475f98cce546eb8b06610ddd574095~mv2.jpg/v1/fit/w_480,h_480,q_90,enc_avif,quality_auto/ea9539_8e475f98cce546eb8b06610ddd574095~mv2.jpg",
  aboutNature:
    "https://static.wixstatic.com/media/ea9539_ee12ef2aaa604fa9aed3c1b820936e19~mv2.jpg/v1/fit/w_480,h_480,q_90,enc_avif,quality_auto/ea9539_ee12ef2aaa604fa9aed3c1b820936e19~mv2.jpg",
  // Rooms
  roomStandard:
    "https://static.wixstatic.com/media/ea9539_89143b8883ca406b92cac1d8f4d156e1~mv2.jpg/v1/fit/w_800,h_600,q_90,enc_avif,quality_auto/ea9539_89143b8883ca406b92cac1d8f4d156e1~mv2.jpg",
  roomFamily:
    "https://static.wixstatic.com/media/ea9539_89f4ce11a3344d41b82b9f75796ca8c6~mv2.jpg/v1/fit/w_800,h_600,q_90,enc_avif,quality_auto/ea9539_89f4ce11a3344d41b82b9f75796ca8c6~mv2.jpg",
  roomPremium:
    "https://static.wixstatic.com/media/ea9539_a4a237ebd38544e0b56d6ebc39a41dc9~mv2.jpg/v1/fit/w_800,h_600,q_90,enc_avif,quality_auto/ea9539_a4a237ebd38544e0b56d6ebc39a41dc9~mv2.jpg",
  // Gallery
  galleryNightPool:
    "https://static.wixstatic.com/media/ea9539_589a0421b84b4f73a379bb776e7b8298~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/ea9539_589a0421b84b4f73a379bb776e7b8298~mv2.jpg",
  galleryBird:
    "https://static.wixstatic.com/media/ea9539_0e70daef764c42819a2079efc1139cd5~mv2.jpg/v1/fill/w_650,h_431,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/19a-Barranquero-Coronado-Andean-Motmot_Hotel-Quinto_diciembre-2018-scaled.jpg",
  galleryWaterfall:
    "https://static.wixstatic.com/media/ea9539_a7bbc364d7af461b8304dde90b536b00~mv2.jpg/v1/fit/w_480,h_360,q_90,enc_avif,quality_auto/ea9539_a7bbc364d7af461b8304dde90b536b00~mv2.jpg",
  galleryFood:
    "https://static.wixstatic.com/media/ea9539_bf14403e33244d03b1365e2f1001bb47~mv2.jpg/v1/fit/w_480,h_360,q_90,enc_avif,quality_auto/ea9539_bf14403e33244d03b1365e2f1001bb47~mv2.jpg",
  galleryArt:
    "https://static.wixstatic.com/media/ea9539_dd8a1a5545354bdda2736c3643259024~mv2.jpg/v1/fit/w_480,h_360,q_90,enc_avif,quality_auto/ea9539_dd8a1a5545354bdda2736c3643259024~mv2.jpg",
  galleryStaircase:
    "https://static.wixstatic.com/media/ea9539_f9a73444da0a4579b615b4793e49babf~mv2.jpg/v1/fit/w_480,h_640,q_90,enc_avif,quality_auto/ea9539_f9a73444da0a4579b615b4793e49babf~mv2.jpg",
  // Pool building wide
  poolWide:
    "https://static.wixstatic.com/media/ea9539_5a227098fbec49ee920ac3ff911f48e1~mv2.jpg/v1/fit/w_960,h_1280,q_90,enc_avif,quality_auto/ea9539_5a227098fbec49ee920ac3ff911f48e1~mv2.jpg",
  // Parakeets
  parakeets:
    "https://static.wixstatic.com/media/ea9539_ffedf7bc50ac44dc8096dad09752f457~mv2.jpg/v1/fit/w_960,h_640,q_90,enc_avif,quality_auto/ea9539_ffedf7bc50ac44dc8096dad09752f457~mv2.jpg",
  // River
  river:
    "https://static.wixstatic.com/media/ea9539_eb643a6d0e664ee1bbc2cb9af7a9bcb5~mv2.jpg/v1/fill/w_862,h_436,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/river%20john_JPG.jpg",
  // Food plate
  food: "https://static.wixstatic.com/media/ea9539_7c22e62c7bdb4c65b0ce9388ead41dee~mv2.jpg/v1/fit/w_480,h_480,q_90,enc_avif,quality_auto/ea9539_7c22e62c7bdb4c65b0ce9388ead41dee~mv2.jpg",
  // Garden with people
  garden:
    "https://static.wixstatic.com/media/ea9539_109b994c83354b1989af18da5997004b~mv2.jpg/v1/fill/w_960,h_1280,fp_0.5_0.42,q_90,enc_avif,quality_auto/ea9539_109b994c83354b1989af18da5997004b~mv2.jpg",
  // River hangout
  riverHangout:
    "https://static.wixstatic.com/media/ea9539_af88e8e9d32242c0a20c0db502f3ae07~mv2.jpg/v1/fill/w_960,h_1280,fp_0.51_0.23,q_90,enc_avif,quality_auto/ea9539_af88e8e9d32242c0a20c0db502f3ae07~mv2.jpg",
  // Kitchen staff
  kitchen:
    "https://static.wixstatic.com/media/ea9539_bb7dd4f3ef484e39926678444783a2ee~mv2.jpg/v1/fill/w_960,h_1280,fp_0.65_0.22,q_90,enc_avif,quality_auto/ea9539_bb7dd4f3ef484e39926678444783a2ee~mv2.jpg",
};

export default function HomePage() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}

function Page() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Divider />
      <Rooms />
      <Testimonial />
      <Experiences />
      <Divider />
      <Amenities />
      <Gallery />
      <Location />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const { lang, setLang, t } = useLanguage();
  const scrolled = useNavScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "#about", label: t("nav.about") },
    { href: "#rooms", label: t("nav.rooms") },
    { href: "#experiences", label: t("nav.experiences") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <a
            href="/"
            className={`font-heading text-2xl font-bold tracking-tight transition-colors ${
              scrolled ? "text-stone-900" : "text-white"
            }`}
          >
            Hotel <span className="text-gold">Quinto</span>
          </a>

          <nav
            className={`hidden md:flex items-center gap-8 text-sm font-medium ${
              scrolled ? "text-stone-600" : "text-white/90"
            }`}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:opacity-100 opacity-80 transition-opacity"
              >
                {link.label}
              </a>
            ))}
            <LanguageToggle lang={lang} onChange={setLang} scrolled={scrolled} />
            <a
              href="https://www.hotelquinto.com/booking-engine"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
            >
              {t("nav.book")}
            </a>
          </nav>

          <div className="flex md:hidden items-center gap-3">
            <LanguageToggle lang={lang} onChange={setLang} scrolled={scrolled} />
            <div className={scrolled ? "text-stone-900" : "text-white"}>
              <MobileMenuButton
                open={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
              />
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 shadow-lg">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-stone-700 hover:text-stone-900 py-3 text-base font-medium border-b border-stone-100 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.hotelquinto.com/booking-engine"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 bg-amber-700 hover:bg-amber-800 text-white px-5 py-3 rounded-lg font-semibold text-center transition-colors"
            >
              {t("nav.book")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Real background photo */}
      <Image
        src={img.hero}
        alt="Hotel Quinto pool surrounded by tropical gardens"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Color tint */}
      <div className="absolute inset-0 bg-emerald-950/20" />

      {/* Animated floating particles */}
      <HeroParticles />

      {/* Vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.4)_100%)]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <p className="text-gold font-medium tracking-[0.15em] uppercase text-xs">
              Quindio, Colombia
            </p>
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] mb-8 drop-shadow-lg">
            {t("hero.tagline")}
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light drop-shadow">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.hotelquinto.com/booking-engine"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:shadow-amber-700/20"
            >
              {t("hero.cta")}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white px-8 py-4 rounded-lg border border-white/20 hover:border-white/40 font-medium transition-all hover:bg-white/10 backdrop-blur-sm"
            >
              {t("hero.explore")}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-gentle">
        <ChevronDown className="h-5 w-5 text-white/40" />
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 sm:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal>
            <div>
              <p className="text-gold-dark font-semibold tracking-[0.15em] uppercase text-sm mb-3">
                {t("about.label")}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-6">
                {t("about.heading")}
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed mb-4">
                {t("about.p1")}
              </p>
              <p className="text-stone-600 text-lg leading-relaxed mb-10">
                {t("about.p2")}
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200">
                <div>
                  <p className="font-heading text-4xl font-bold text-forest">
                    <CountUp to={9} suffix="+" />
                  </p>
                  <p className="text-sm text-stone-500 mt-1">
                    {t("about.stat.years")}
                  </p>
                </div>
                <div>
                  <p className="font-heading text-4xl font-bold text-forest">
                    UNESCO
                  </p>
                  <p className="text-sm text-stone-500 mt-1">
                    {t("about.stat.landscape")}
                  </p>
                </div>
                <div>
                  <p className="font-heading text-4xl font-bold text-forest">
                    <CountUp to={5} suffix="+" />
                  </p>
                  <p className="text-sm text-stone-500 mt-1">
                    {t("about.stat.nature")}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "3/2" }}>
                <Image
                  src={img.aboutInterior}
                  alt="Bamboo architecture interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "1/1" }}>
                  <Image
                    src={img.aboutLounge}
                    alt="Bamboo lounge area"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "1/1" }}>
                  <Image
                    src={img.aboutNature}
                    alt="Bamboo forest stream"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Rooms ───────────────────────────────────────────────────────────────────

const rooms = [
  {
    nameKey: "rooms.standard.name" as TranslationKey,
    descKey: "rooms.standard.description" as TranslationKey,
    priceUSD: 65,
    priceCOP: 270000,
    capacity: 2,
    image: img.roomStandard,
    alt: "Standard room with queen bed",
  },
  {
    nameKey: "rooms.family.name" as TranslationKey,
    descKey: "rooms.family.description" as TranslationKey,
    priceUSD: 120,
    priceCOP: 500000,
    capacity: 5,
    image: img.roomFamily,
    alt: "Family suite with bamboo bunk beds",
  },
  {
    nameKey: "rooms.premium.name" as TranslationKey,
    descKey: "rooms.premium.description" as TranslationKey,
    priceUSD: 160,
    priceCOP: 670000,
    capacity: 2,
    image: img.roomPremium,
    alt: "Premium suite with bamboo walls",
  },
];

function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO").format(value);
}

function Rooms() {
  const { lang, t } = useLanguage();

  return (
    <section id="rooms" className="py-24 sm:py-32 bg-charcoal">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold font-semibold tracking-[0.15em] uppercase text-sm mb-3">
              {t("rooms.label")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {t("rooms.heading")}
            </h2>
            <p className="text-stone-400 text-lg">
              {t("rooms.subtitle")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {rooms.map((room, i) => (
            <ScrollReveal key={room.nameKey} delay={i * 150}>
              <div className="bg-charcoal-light rounded-2xl overflow-hidden border border-stone-800 hover:border-stone-600 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
                <div className="overflow-hidden">
                  <div
                    className="relative transition-transform duration-500 group-hover:scale-105"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <Image
                      src={room.image}
                      alt={room.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    {t(room.nameKey)}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed mb-4">
                    {t(room.descKey)}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-stone-500 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      {room.capacity} {t("rooms.guests")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                    <p>
                      <span className="text-xs text-stone-500">
                        {t("rooms.from")}{" "}
                      </span>
                      <span className="font-heading text-2xl font-bold text-gold">
                        {lang === "es"
                          ? `$${formatCOP(room.priceCOP)}`
                          : `$${room.priceUSD}`}
                      </span>
                      <span className="text-xs text-stone-500">
                        {" "}{lang === "es" ? "COP" : "USD"} {t("rooms.night")}
                      </span>
                    </p>
                    <a
                      href="https://www.hotelquinto.com/booking-engine"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors flex items-center gap-1 group/link"
                    >
                      {t("rooms.book")}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonial ─────────────────────────────────────────────────────────────

function Testimonial() {
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-28 bg-cream-dark relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-forest/[0.03] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gold/[0.05] rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          <p className="text-gold-dark font-semibold tracking-[0.15em] uppercase text-sm mb-8">
            {t("testimonial.label")}
          </p>
          <Quote className="h-10 w-10 text-gold/30 mx-auto mb-6" />
          <blockquote className="font-heading text-2xl sm:text-3xl lg:text-4xl font-medium text-charcoal leading-snug mb-8 italic">
            &ldquo;{t("testimonial.quote")}&rdquo;
          </blockquote>
          <div>
            <p className="font-semibold text-charcoal">{t("testimonial.author")}</p>
            <p className="text-sm text-stone-500">{t("testimonial.source")}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Experiences ─────────────────────────────────────────────────────────────

const experiences = [
  { icon: Coffee, titleKey: "exp.coffee.title" as TranslationKey, descKey: "exp.coffee.desc" as TranslationKey },
  { icon: Bird, titleKey: "exp.birds.title" as TranslationKey, descKey: "exp.birds.desc" as TranslationKey },
  { icon: Waves, titleKey: "exp.river.title" as TranslationKey, descKey: "exp.river.desc" as TranslationKey },
  { icon: Mountain, titleKey: "exp.hiking.title" as TranslationKey, descKey: "exp.hiking.desc" as TranslationKey },
  { icon: TreePalm, titleKey: "exp.pool.title" as TranslationKey, descKey: "exp.pool.desc" as TranslationKey },
  { icon: Sunset, titleKey: "exp.sunset.title" as TranslationKey, descKey: "exp.sunset.desc" as TranslationKey },
];

function Experiences() {
  const { t } = useLanguage();

  return (
    <section id="experiences" className="py-24 sm:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold-dark font-semibold tracking-[0.15em] uppercase text-sm mb-3">
              {t("exp.label")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-4">
              {t("exp.heading")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.titleKey} delay={i * 100}>
              <div className="group p-8 rounded-2xl bg-white border border-stone-200 hover:border-gold/30 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 h-full hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-forest/10 to-forest/5 flex items-center justify-center mb-6 group-hover:from-forest/20 group-hover:to-forest/10 transition-colors">
                  <exp.icon className="h-6 w-6 text-forest" />
                </div>
                <h3 className="font-heading text-xl font-bold text-charcoal mb-3">
                  {t(exp.titleKey)}
                </h3>
                <p className="text-stone-500 leading-relaxed">
                  {t(exp.descKey)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Amenities ───────────────────────────────────────────────────────────────

const amenityList = [
  { icon: Droplets, key: "amenity.pool" as TranslationKey },
  { icon: Wifi, key: "amenity.wifi" as TranslationKey },
  { icon: Car, key: "amenity.parking" as TranslationKey },
  { icon: Dumbbell, key: "amenity.gym" as TranslationKey },
  { icon: UtensilsCrossed, key: "amenity.dining" as TranslationKey },
  { icon: Clock, key: "amenity.reception" as TranslationKey },
  { icon: Trees, key: "amenity.bamboo" as TranslationKey },
  { icon: Flower2, key: "amenity.gardens" as TranslationKey },
  { icon: Waves, key: "amenity.river" as TranslationKey },
  { icon: HandHelping, key: "amenity.concierge" as TranslationKey },
  { icon: WashingMachine, key: "amenity.laundry" as TranslationKey },
  { icon: Plane, key: "amenity.transfer" as TranslationKey },
];

function Amenities() {
  const { t } = useLanguage();

  return (
    <section className="py-24 sm:py-32 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,169,110,0.08)_0%,_transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold font-semibold tracking-[0.15em] uppercase text-sm mb-3">
              {t("amenities.label")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {t("amenities.heading")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenityList.map((amenity, i) => (
            <ScrollReveal key={amenity.key} delay={i * 50}>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.06] border border-white/10 hover:border-gold/20 hover:bg-white/[0.1] transition-all duration-300">
                <amenity.icon className="h-5 w-5 text-gold shrink-0" />
                <span className="text-white/90 text-sm font-medium">
                  {t(amenity.key)}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

function Gallery() {
  const { t } = useLanguage();

  return (
    <section className="py-24 sm:py-32 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold-dark font-semibold tracking-[0.15em] uppercase text-sm mb-3">
              {t("gallery.label")}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
              {t("gallery.heading")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Large image spanning 2x2 */}
          <div className="col-span-2 row-span-2">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-2xl h-full group" style={{ aspectRatio: "1/1" }}>
                <Image
                  src={img.galleryNightPool}
                  alt="Hotel pool at night"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </ScrollReveal>
          </div>
          {/* Top-right pair */}
          <ScrollReveal delay={100}>
            <div className="relative overflow-hidden rounded-2xl group" style={{ aspectRatio: "4/3" }}>
              <Image
                src={img.galleryBird}
                alt="Andean Motmot bird"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="relative overflow-hidden rounded-2xl group" style={{ aspectRatio: "4/3" }}>
              <Image
                src={img.galleryWaterfall}
                alt="Natural waterfall"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </ScrollReveal>
          {/* Bottom-right pair */}
          <ScrollReveal delay={200}>
            <div className="relative overflow-hidden rounded-2xl group" style={{ aspectRatio: "4/3" }}>
              <Image
                src={img.galleryFood}
                alt="Traditional Colombian fish dish"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={250}>
            <div className="relative overflow-hidden rounded-2xl group" style={{ aspectRatio: "4/3" }}>
              <Image
                src={img.galleryArt}
                alt="Painted sphere garden art"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Location ────────────────────────────────────────────────────────────────

function Location() {
  const { t } = useLanguage();

  return (
    <section className="py-24 sm:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ScrollReveal>
            <div>
              <p className="text-gold-dark font-semibold tracking-[0.15em] uppercase text-sm mb-3">
                {t("location.label")}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-8">
                {t("location.heading")}
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-forest mt-0.5 shrink-0" />
                  <p className="text-stone-600">{t("location.address")}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Plane className="h-5 w-5 text-forest mt-0.5 shrink-0" />
                  <p className="text-stone-600">{t("location.airport")}</p>
                </div>
              </div>

              <h3 className="font-heading text-lg font-bold text-charcoal mb-4">
                {t("location.nearby.title")}
              </h3>
              <ul className="space-y-3">
                {(
                  [
                    "location.nearby.parque",
                    "location.nearby.salento",
                    "location.nearby.armenia",
                    "location.nearby.panaca",
                  ] as TranslationKey[]
                ).map((key) => (
                  <li
                    key={key}
                    className="flex items-center gap-3 text-stone-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm">
              <iframe
                title="Hotel Quinto Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.0!2d-75.75012!3d4.566637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e388f9a1c6e5c7d%3A0x5c6f3e6b1e8f5a0a!2sHotel%20Quinto!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-gradient-to-b from-charcoal via-stone-900 to-stone-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(201,169,110,0.06)_0%,_transparent_60%)]" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          <p className="text-gold font-semibold tracking-[0.15em] uppercase text-sm mb-3">
            {t("contact.label")}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {t("contact.heading")}
          </h2>
          <p className="text-stone-400 text-lg mb-12 max-w-xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <a
            href="https://www.hotelquinto.com/booking-engine"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-amber-700/20 mb-5"
          >
            {t("contact.book")}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <div className="flex items-center justify-center gap-4 text-sm text-stone-500 mb-12">
            <span>{t("contact.checkin")}</span>
            <span className="w-1 h-1 rounded-full bg-stone-600" />
            <span>{t("contact.checkout")}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="text-stone-500 text-sm mb-6">
            {t("contact.or")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/573202190476"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/15 hover:border-white/30 px-6 py-3 rounded-lg transition-all hover:bg-white/5"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href="mailto:info@hotelquinto.com"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/15 hover:border-white/30 px-6 py-3 rounded-lg transition-all hover:bg-white/5"
            >
              <Mail className="h-4 w-4" />
              info@hotelquinto.com
            </a>
            <a
              href="tel:+573202190476"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/15 hover:border-white/30 px-6 py-3 rounded-lg transition-all hover:bg-white/5"
            >
              <Phone className="h-4 w-4" />
              +57 320 219 0476
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── WhatsApp Button ─────────────────────────────────────────────────────────

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/573202190476"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="py-12 bg-stone-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="font-heading text-xl font-bold text-white mb-1">
              Hotel <span className="text-gold">Quinto</span>
            </p>
            <p className="text-stone-500 text-sm">
              {t("footer.tagline")}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/hotel_quinto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-gold transition-colors text-sm"
            >
              Instagram
            </a>
            <a
              href="https://www.tripadvisor.com/Hotel_Review-g1915404-d32758753-Reviews-Hotel_Quinto-Montenegro_Quindio_Department.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-gold transition-colors text-sm"
            >
              TripAdvisor
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-stone-800/50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-stone-600 text-xs">
            &copy; {new Date().getFullYear()} Hotel Quinto. {t("footer.rights")}
          </p>
          <a
            href="/privacy"
            className="text-stone-600 hover:text-stone-400 text-xs transition-colors"
          >
            {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
          </a>
        </div>
      </div>
    </footer>
  );
}
