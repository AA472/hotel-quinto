"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  CheckCircle,
  ChevronDown,
  ArrowLeft,
  Loader2,
  MapPin,
  Home,
  Scale,
  TrendingUp,
  Coffee,
  Users,
  FileText,
  Video,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

type Tier = "intro" | "standard" | "premium";

type ConsultationPackage = {
  tier: Tier;
  title: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
};

type FAQ = {
  question: string;
  answer: string;
};

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const packages: ConsultationPackage[] = [
  {
    tier: "intro",
    title: "Intro Call",
    price: 49,
    duration: "30 min",
    description:
      "A focused introductory session to discuss your goals and get initial guidance on buying property in Colombia.",
    features: [
      "Overview of the Coffee Region market",
      "Initial assessment of your goals & budget",
      "Key considerations for foreign buyers",
      "Q&A on the buying process",
    ],
  },
  {
    tier: "standard",
    title: "Standard Consultation",
    price: 149,
    duration: "60 min",
    description:
      "An in-depth session covering market analysis, neighborhoods, legal process, and personalized property recommendations.",
    features: [
      "Everything in Intro Call",
      "Detailed neighborhood breakdown",
      "Legal process walkthrough",
      "Personalized property type recommendations",
      "Investment return analysis",
      "Trusted local contacts shared",
    ],
    popular: true,
  },
  {
    tier: "premium",
    title: "Premium Consultation",
    price: 299,
    duration: "90 min",
    description:
      "A comprehensive deep-dive with a follow-up written report, curated property listings, and introductions to local professionals.",
    features: [
      "Everything in Standard Consultation",
      "Written follow-up report within 48 hours",
      "Curated property listings matching your criteria",
      "Introductions to lawyers, notaries & agents",
      "Tax & investment structure guidance",
      "30-day email follow-up support",
    ],
  },
];

const faqs: FAQ[] = [
  {
    question: "Who is Jason and why should I trust his advice?",
    answer:
      "Jason is the owner of Hotel Quinto, a boutique eco-hotel in Colombia's Coffee Region. He has lived in the Quindío department for over 8 years and has navigated the entire property buying process himself — from finding land to building a successful hospitality business. He has hands-on experience with fincas, eco-lodges, agricultural land, and urban properties throughout the region.",
  },
  {
    question: "How are consultations conducted?",
    answer:
      "Consultations take place over a secure video call (Google Meet or Zoom). After payment, you'll immediately choose a date and time that works for you. Sessions are available Monday through Saturday, with flexibility for different time zones.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Payment is processed securely through Stripe. We accept all major credit and debit cards (Visa, Mastercard, American Express). Payment is required in advance to confirm your booking.",
  },
  {
    question: "Can I get a refund if I need to cancel?",
    answer:
      "Yes. If you cancel at least 48 hours before your scheduled consultation, you'll receive a full refund. Cancellations within 48 hours can be rescheduled once at no additional charge. No-shows are non-refundable.",
  },
  {
    question: "I'm not sure which package to choose. What do you recommend?",
    answer:
      "If you're just starting to explore the idea of buying in Colombia, the Intro Call is perfect. If you're serious about purchasing and want actionable advice, the Standard Consultation covers everything you need. The Premium is ideal if you want a complete roadmap with follow-up support and curated listings to act on.",
  },
  {
    question: "Do I need to speak Spanish?",
    answer:
      "Not at all — Jason is fluent in both English and Spanish. The consultation is conducted in English. If you proceed with a purchase, Jason can also help bridge the language gap with local contacts and professionals.",
  },
  {
    question: "Is this the same as a real estate agent?",
    answer:
      "No. Jason is not a licensed real estate agent and does not earn commissions on property sales. This is an independent consultation service — his only incentive is to give you honest, practical advice based on years of personal experience in the region.",
  },
  {
    question: "What if I want to visit properties in person?",
    answer:
      "Jason can help coordinate an on-the-ground property tour during your visit to the Coffee Region. This can be discussed during your consultation. Many clients combine a stay at Hotel Quinto with property viewings in the area.",
  },
];

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function ConsultationsPage() {
  const [loading, setLoading] = useState<Tier | null>(null);

  async function handleBook(tier: Tier) {
    setLoading(tier);
    try {
      const res = await fetch("/api/stripe/consultation-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Nav */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            <Link
              href="/"
              className="font-heading text-2xl font-bold tracking-tight text-stone-900"
            >
              Hotel <span className="text-gold">Quinto</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
              <Link href="/#about" className="hover:text-stone-900 transition-colors">
                About
              </Link>
              <Link href="/#rooms" className="hover:text-stone-900 transition-colors">
                Rooms
              </Link>
              <Link href="/buyers-guide" className="hover:text-stone-900 transition-colors">
                Buyer&apos;s Guide
              </Link>
              <Link
                href="/consultations"
                className="text-stone-900 font-semibold"
              >
                Consultations
              </Link>
              <Link
                href="/book"
                className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
              >
                Book Now
              </Link>
            </nav>
            <Link
              href="/book"
              className="md:hidden bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-forest text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Hotel Quinto
              </Link>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Book a Consultation with Jason
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Thinking about buying property in Colombia&apos;s Coffee Region?
                Get clear, practical advice from someone who&apos;s done it —
                fincas, eco-lodges, land, and everything in between.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-72 h-96 md:w-80 md:h-[28rem] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10">
                <Image
                  src="/jason.png"
                  alt="Jason — Owner of Hotel Quinto"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 288px, 320px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Consultation */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-gold mb-3">
              How It Works
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mb-6">
              Expert Guidance for Your Property Search
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-stone-600 space-y-5">
            <p>
              Whether you&apos;re dreaming of a quiet finca in the hills, an income-generating
              eco-lodge, or a piece of agricultural land with coffee crops — buying property
              in Colombia as a foreigner can feel overwhelming. The legal process, local market
              dynamics, and cultural nuances are real hurdles.
            </p>
            <p>
              Jason has lived in Colombia&apos;s Quindío department for over 8 years. He
              purchased land, built Hotel Quinto from the ground up, and has helped friends
              and colleagues navigate the same journey. A consultation with Jason isn&apos;t
              theoretical — it&apos;s grounded in firsthand experience.
            </p>
            <p>
              Think of it like sitting down with a knowledgeable friend over coffee. You&apos;ll
              get honest, practical advice tailored to your situation — no sales pitch, no
              commissions, just real talk about what to expect and how to move forward.
            </p>
          </div>

          {/* What you'll learn */}
          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            {[
              { icon: <MapPin className="w-5 h-5" />, text: "Best neighborhoods & areas for your goals" },
              { icon: <Scale className="w-5 h-5" />, text: "Legal process for foreign property buyers" },
              { icon: <Home className="w-5 h-5" />, text: "Property types — fincas, lodges, land, apartments" },
              { icon: <TrendingUp className="w-5 h-5" />, text: "Realistic investment returns & rental income" },
              { icon: <Coffee className="w-5 h-5" />, text: "Living in the Coffee Region day-to-day" },
              { icon: <Users className="w-5 h-5" />, text: "Trusted local contacts & professionals" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-forest/10 text-forest flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="text-stone-700 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-cream-dark" id="pricing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-gold mb-3">
              Consultation Packages
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900">
              Choose Your Session
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.tier}
                className={`relative bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col ${
                  pkg.popular ? "ring-2 ring-gold shadow-lg md:scale-105" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gold text-white text-xs font-bold uppercase tracking-widest text-center py-2">
                    Most Popular
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-stone-400" />
                    <span className="text-sm text-stone-500 font-medium">
                      {pkg.duration}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-stone-900 mb-1">
                    {pkg.title}
                  </h3>
                  <div className="mb-4">
                    <span className="font-heading text-4xl font-bold text-forest">
                      ${pkg.price}
                    </span>
                    <span className="text-stone-400 text-sm ml-1">USD</span>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6">
                    {pkg.description}
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-stone-600"
                      >
                        <CheckCircle className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleBook(pkg.tier)}
                    disabled={loading !== null}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors ${
                      pkg.popular
                        ? "bg-forest hover:bg-forest-light text-white"
                        : "bg-stone-100 hover:bg-stone-200 text-stone-800"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading === pkg.tier ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing…
                      </span>
                    ) : (
                      "Book This Session"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900">
              What to Expect
            </h2>
          </div>
          <div className="space-y-8">
            {[
              {
                step: "1",
                icon: <FileText className="w-5 h-5" />,
                title: "Book & Pay",
                desc: "Choose a package above and complete your payment securely through Stripe.",
              },
              {
                step: "2",
                icon: <Clock className="w-5 h-5" />,
                title: "Schedule",
                desc: "Right after payment, you'll choose a date and time that works for you using our scheduling calendar.",
              },
              {
                step: "3",
                icon: <Video className="w-5 h-5" />,
                title: "Meet with Jason",
                desc: "Join the video call and bring your questions. Jason will provide personalized guidance based on your situation.",
              },
              {
                step: "4",
                icon: <CheckCircle className="w-5 h-5" />,
                title: "Take Action",
                desc: "Walk away with a clear understanding of your next steps — and the confidence to move forward.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-forest text-white flex items-center justify-center font-heading text-lg font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-stone-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-forest text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore Your Options?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Book a consultation today and take the first step toward owning
            property in one of the most beautiful regions in the world.
          </p>
          <a
            href="#pricing"
            className="inline-block bg-gold hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            View Packages
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <Link href="/" className="font-heading text-lg text-white font-bold">
            Hotel <span className="text-gold">Quinto</span>
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/buyers-guide" className="hover:text-white transition-colors">
              Buyer&apos;s Guide
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Hotel Quinto</p>
        </div>
      </footer>
    </div>
  );
}

/* ─── FAQ Accordion ──────────────────────────────────────────────────────────── */

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-medium text-stone-800 pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 -mt-1">
          <p className="text-stone-500 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}
