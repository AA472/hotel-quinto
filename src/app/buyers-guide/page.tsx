"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  CheckCircle,
  MapPin,
  FileText,
  Scale,
  Home,
  TrendingUp,
  Shield,
  BookOpen,
  ArrowLeft,
  Loader2,
  Mail,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

type GuideSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
  preview: string;
  content: string[];
};

/* ─── Guide Content ──────────────────────────────────────────────────────────── */

const guideSections: GuideSection[] = [
  {
    id: "overview",
    title: "Why Buy in Colombia's Coffee Region?",
    icon: <TrendingUp className="w-6 h-6" />,
    preview:
      "Discover why the Eje Cafetero is one of Latin America's fastest-growing real estate markets.",
    content: [
      "Colombia's Coffee Cultural Landscape, designated a UNESCO World Heritage Site in 2011, has experienced consistent property value appreciation averaging 8-12% annually over the past five years. The Quindío department — home to Montenegro, Circasia, Salento, and Armenia — sits at the heart of this growth.",
      "Several factors drive this momentum: improved infrastructure (the modernized El Edén Airport now receives direct flights from major cities), a booming tourism industry (Quindío welcomed over 4 million visitors in 2025), and Colombia's favorable foreign investment policies that grant equal property rights to non-citizens.",
      "Unlike coastal markets that face saturation, the Coffee Region offers a unique combination: pleasant year-round climate (18-24°C), lower cost of living than Medellín or Bogotá, world-class biodiversity, and a deeply rooted cultural identity that attracts discerning travelers and remote workers alike.",
      "The region's appeal extends beyond vacation properties. Many buyers are investing in boutique hotels, eco-lodges, and Airbnb-style rentals that generate 15-25% annual returns on investment, fueled by the steady flow of international and domestic tourists.",
    ],
  },
  {
    id: "neighborhoods",
    title: "Best Neighborhoods & Areas",
    icon: <MapPin className="w-6 h-6" />,
    preview:
      "A breakdown of Montenegro, Circasia, Salento, Armenia, and surrounding areas.",
    content: [
      "MONTENEGRO: The 'Gateway to Coffee Country.' Properties here range from $40,000 USD for rural fincas to $250,000+ for turnkey boutique hotels. Montenegro sits at the crossroads of major attractions (Parque del Café, PANACA) and benefits from excellent road connectivity. Residential lots on the Montenegro-Circasia corridor (where Hotel Quinto is located) offer 5+ hectare properties with river frontage starting at $60,000 USD.",
      "CIRCASIA: Known as the 'Garden City,' Circasia offers a charming pueblo atmosphere with a vibrant central plaza. The town is popular with artists and expatriates. Properties in the urban core start at $30,000 for apartments, while rural parcels with mountain views average $15-25 per square meter. Circasia's proximity to Armenia (15 minutes) makes it practical for daily needs while maintaining a tranquil lifestyle.",
      "SALENTO: The region's crown jewel for tourism. Properties here command premium prices — a well-located hostel can sell for $300,000-500,000 USD. While expensive to enter, Salento's occupancy rates (often 85%+ year-round) justify the investment. Be aware of stricter building regulations aimed at preserving the town's colonial character.",
      "ARMENIA: The departmental capital offers the most urban experience with shopping malls, hospitals, universities, and nightlife. Apartments in upscale neighborhoods like Norte or Portal del Quindío range from $50,000-150,000 USD. Armenia is ideal for those wanting a city base with easy access to the countryside.",
      "FILANDIA & QUIMBAYA: Emerging markets with significant upside. Filandia, with its stunning viewpoint over the Cocora Valley, is attracting upscale development. Quimbaya offers large agricultural parcels at lower price points, suitable for larger-scale eco-tourism projects.",
    ],
  },
  {
    id: "legal",
    title: "Legal Process for Foreign Buyers",
    icon: <Scale className="w-6 h-6" />,
    preview:
      "Step-by-step guide to the Colombian property purchase process.",
    content: [
      "STEP 1 — NIT/RUT Registration: Every foreign buyer needs a Número de Identificación Tributaria (NIT) or RUT from DIAN (Colombia's tax authority). This can be obtained at any DIAN office with your passport. Many lawyers can handle this on your behalf with a power of attorney. Allow 1-2 weeks.",
      "STEP 2 — Due Diligence: Your lawyer will obtain a Certificado de Tradición y Libertad from the Oficina de Registro de Instrumentos Públicos. This document shows the complete ownership history and any liens, mortgages, or legal claims against the property. NEVER skip this step. Additionally, verify the property's catastral (cadastral) records match the actual boundaries.",
      "STEP 3 — Promise of Sale (Promesa de Compraventa): This legally binding agreement outlines the terms, price, timeline, and penalties for breach. Typically, a 10-20% earnest money deposit is required at signing. Both parties must sign before a notary public.",
      "STEP 4 — Title Transfer (Escritura Pública): Executed at a notaría, this is the formal transfer of ownership. Both buyer and seller (or their legal representatives) must appear. The notary verifies identities, reads the deed aloud, and all parties sign. Registration taxes (approximately 1.94% of the property value) are paid at this stage.",
      "STEP 5 — Registration: The escritura is filed with the Oficina de Registro, officially transferring the title to your name. This process takes 5-15 business days. Once registered, you receive an updated Certificado de Tradición y Libertad showing you as the owner.",
      "KEY COSTS: Budget for approximately 3-5% of the purchase price in closing costs, including notary fees (~0.3%), registration tax (~1.67%), withholding tax (1% for sellers), lawyer fees ($1,000-3,000 USD), and the cadastral transfer fee.",
    ],
  },
  {
    id: "property-types",
    title: "Property Types & What to Expect",
    icon: <Home className="w-6 h-6" />,
    preview:
      "From rural fincas to boutique hotels — understanding what's available.",
    content: [
      "FINCAS (Rural Estates): The quintessential Coffee Region property. Fincas range from modest 1-hectare parcels with simple farmhouses ($25,000-40,000) to sprawling 10+ hectare estates with main houses, guest cabañas, and working coffee crops ($150,000-500,000+). Key considerations: water access, road quality, distance to town, and existing agricultural infrastructure.",
      "ECO-LODGES & BOUTIQUE HOTELS: The most popular investment vehicle for foreigners. A well-positioned eco-lodge with 4-8 rooms typically costs $150,000-350,000 to build or acquire. Essential factors: tourism license (RNT), proximity to attractions, unique selling proposition (river access, viewpoint, farm-to-table dining), and year-round accessibility.",
      "URBAN APARTMENTS & HOUSES: In Armenia and larger towns, modern apartments in estratos 4-6 offer comfortable living with amenities. Prices range from $40,000 for a 2BR apartment to $200,000+ for a penthouse. In pueblos like Circasia or Montenegro, colonial-style houses with interior courtyards can be found for $50,000-120,000.",
      "AGRICULTURAL LAND: Coffee, plantain, avocado, and citrus farms present productive land investments. Coffee land prices vary by altitude, soil quality, and existing infrastructure: expect $5,000-15,000 per hectare for unimproved land, $20,000-40,000 per hectare for established coffee farms with processing facilities.",
      "LOT PURCHASES & NEW CONSTRUCTION: Buying land and building custom is increasingly popular. Construction costs in the region average $400-600 USD per square meter for standard builds, $700-1,200 for premium finishes. Guadua (bamboo) construction — a regional specialty — can reduce costs while creating architecturally distinctive structures. Building permits typically take 2-4 months from application.",
    ],
  },
  {
    id: "investment",
    title: "Investment & Rental Returns",
    icon: <TrendingUp className="w-6 h-6" />,
    preview:
      "Realistic income projections for short-term rentals and hospitality businesses.",
    content: [
      "SHORT-TERM RENTALS (Airbnb/Booking.com): A well-managed 2-bedroom property near attractions can generate $60-120 USD per night with 60-75% occupancy, yielding $15,000-30,000 annually. Premium properties with unique features (pool, river, panoramic views) command $150-300 per night. Factor in 15-20% management costs, platform fees (3-15%), utilities, maintenance, and cleaning.",
      "BOUTIQUE HOTELS: Properties with 4-8 rooms generate substantially more but require higher operational involvement. A 6-room hotel charging $65-160 per room per night with 55-70% occupancy can gross $100,000-200,000 annually. After operating costs (staff, utilities, maintenance, marketing, taxes), net margins typically fall in the 25-40% range.",
      "LONG-TERM RENTALS: Less common for foreign investors but viable in Armenia and Circasia. Monthly rents for furnished apartments range from $300-800 USD depending on location and quality. Annual yields of 6-10% on property value are typical, with much lower management overhead.",
      "TAX CONSIDERATIONS: Colombia taxes rental income for non-residents at a flat 35% rate. However, deductions for property expenses (maintenance, depreciation, management fees, utilities) can significantly reduce the effective rate. Establishing a Colombian SAS (simplified stock company) can provide additional tax optimization opportunities. Consult a local tax advisor specializing in foreign investment.",
      "APPRECIATION: Coffee Region properties have appreciated 8-12% annually in recent years, though past performance doesn't guarantee future results. The ongoing infrastructure improvements (new highways, airport expansion, fiber internet rollout) suggest continued growth potential through 2030+.",
    ],
  },
  {
    id: "due-diligence",
    title: "Due Diligence Checklist",
    icon: <Shield className="w-6 h-6" />,
    preview:
      "Critical checks before signing anything — protect your investment.",
    content: [
      "TITLE VERIFICATION: Obtain and review the Certificado de Tradición y Libertad (CTL) going back at least 20 years. Look for: consistent chain of ownership, no current embargos or liens, matching property boundaries, and resolved succession claims. Red flag: gaps in ownership history or recent rapid transfers.",
      "PHYSICAL INSPECTION: Walk the entire property. Verify boundaries match the catastral map. Check for: water sources and rights, easements (servidumbres), neighboring land uses, road access quality in rainy season, structural integrity of buildings, electrical connections, and septic/water treatment systems.",
      "ZONING & PERMITS: Verify the property's uso de suelo (land use designation) matches your intended purpose. Rural properties may be classified as agricultural, eco-tourism, residential, or mixed use. Converting between designations is possible but time-consuming. Check with the municipal planning office (Oficina de Planeación) before purchasing.",
      "ENVIRONMENTAL RESTRICTIONS: Properties near rivers, in watershed zones, or within designated ecological corridors may have building restrictions. Colombia's environmental authority (CVC or CRQ in Quindío) enforces buffer zones (typically 30 meters from waterways). Some properties require environmental impact assessments before development.",
      "FINANCIAL VERIFICATION: Confirm the seller has no outstanding tax obligations on the property (paz y salvo de impuesto predial). Verify utility accounts are current. For rural properties, check if there are any existing agricultural loans or FINAGRO obligations tied to the land.",
      "RECOMMENDED PROFESSIONALS: Budget $2,000-5,000 for professional due diligence including: bilingual real estate lawyer ($1,000-2,000), independent property appraiser ($300-500), surveyor/topographer for rural properties ($500-1,500), and a structural engineer for existing buildings ($300-800).",
    ],
  },
  {
    id: "living",
    title: "Living in the Coffee Region",
    icon: <BookOpen className="w-6 h-6" />,
    preview:
      "Practical insights on daily life, healthcare, visas, and community.",
    content: [
      "COST OF LIVING: A comfortable lifestyle in the Coffee Region costs $1,200-2,000 USD per month for a single person, or $2,000-3,500 for a couple. This includes rent ($300-600 for a nice apartment), groceries ($200-400), utilities ($50-100), dining out ($100-200), transportation ($50-100), healthcare ($50-150), and entertainment. This is 40-60% less than Bogotá or Medellín.",
      "HEALTHCARE: Armenia has several quality hospitals including Hospital Universitario San Juan de Dios and Clínica Armenia. International health insurance (e.g., Cigna, Allianz) costs $100-300/month. Colombia's EPS system provides affordable public healthcare for residents. Many foreigners use a combination of private insurance and local EPS coverage.",
      "VISA OPTIONS: The most relevant visas for property owners are: (1) Migrant Visa (M-type) for property investment over ~$90,000 USD, granting 3-year residency; (2) Retirement Visa requiring proof of pension income of approximately $750+/month; (3) Digital Nomad Visa for remote workers earning $3,000+/month. After 5 years of residency, permanent residency (R-type) is available.",
      "COMMUNITY & CULTURE: The Quindío region is famously welcoming. Local paisa and cuyabro culture values warmth, family, and hospitality. There's a growing international community, especially in Salento and Circasia, with English-speaking social groups, co-working spaces, and events. Spanish proficiency dramatically improves the experience — local language schools offer immersive programs from $200/month.",
      "PRACTICAL TIPS: Internet speeds in urban areas reach 100+ Mbps; rural areas vary (check Claro or Movistar fiber coverage). Driving is the most practical transport — a used 4x4 costs $10,000-20,000 USD. The rainy seasons (March-May, October-December) affect rural road conditions. Power outages are infrequent but a backup generator is wise for hospitality businesses. Tap water in urban areas is safe; rural properties should have filtration systems.",
    ],
  },
];

/* ─── Purchase Button ────────────────────────────────────────────────────────── */

function PurchaseButton() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function handlePurchase() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gold/30 p-8 max-w-md mx-auto shadow-lg">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
          <Lock className="w-8 h-8 text-gold-dark" />
        </div>
        <h3 className="font-heading text-2xl text-forest mb-2">
          Unlock the Full Guide
        </h3>
        <p className="text-charcoal/60 text-sm">
          One-time purchase. Instant access. No subscription.
        </p>
      </div>

      <div className="text-center mb-6">
        <span className="text-4xl font-heading text-forest font-bold">$19</span>
        <span className="text-2xl font-heading text-forest">.99</span>
        <span className="text-charcoal/50 text-sm ml-1">USD</span>
      </div>

      <div className="space-y-3 mb-6">
        {[
          "7 comprehensive chapters",
          "Neighborhood price breakdowns",
          "Legal process step-by-step",
          "Investment return projections",
          "Due diligence checklist",
          "Insider tips from local experts",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-charcoal/80">
            <CheckCircle className="w-4 h-4 text-forest-light shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
          <input
            type="email"
            placeholder="Your email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-charcoal/10 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full py-3 bg-forest text-cream font-semibold rounded-lg hover:bg-forest-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Redirecting to checkout...
            </>
          ) : (
            "Purchase Now"
          )}
        </button>
        <p className="text-xs text-charcoal/40 text-center">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
}

/* ─── Guide Content (Unlocked) ───────────────────────────────────────────────── */

function GuideContent() {
  return (
    <div className="space-y-16">
      {guideSections.map((section, i) => (
        <section key={section.id} id={section.id} className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-forest/10 text-forest">
              {section.icon}
            </div>
            <div>
              <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                Chapter {i + 1}
              </span>
              <h2 className="font-heading text-2xl md:text-3xl text-forest">
                {section.title}
              </h2>
            </div>
          </div>
          <div className="space-y-4 text-charcoal/80 leading-relaxed">
            {section.content.map((paragraph, j) => {
              // Bold the first word/phrase if it's ALL CAPS followed by a colon
              const match = paragraph.match(/^([A-Z\s&/()]+(?:—[^:]+)?):?\s*(.*)$/);
              if (match && match[1].length > 3) {
                return (
                  <p key={j}>
                    <strong className="text-forest font-semibold">
                      {match[1]}:
                    </strong>{" "}
                    {match[2]}
                  </p>
                );
              }
              return <p key={j}>{paragraph}</p>;
            })}
          </div>
          {i < guideSections.length - 1 && (
            <div className="mt-12 border-b border-charcoal/10" />
          )}
        </section>
      ))}

      {/* Closing CTA */}
      <section className="bg-forest rounded-2xl p-8 md:p-12 text-center text-cream">
        <h2 className="font-heading text-3xl mb-4">
          Ready to Take the Next Step?
        </h2>
        <p className="text-cream/80 max-w-lg mx-auto mb-6">
          Stay with us at Hotel Quinto while you explore the region. We can connect you
          with trusted local real estate lawyers, agents, and property managers.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-forest font-semibold rounded-lg hover:bg-gold-dark transition-colors"
        >
          Book Your Stay
        </Link>
      </section>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────────── */

export default function BuyersGuidePage() {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [accessGranted, setAccessGranted] = useState(true); // TODO: set back to false to enable paywall
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params);

    const sessionId = params.get("session_id");
    if (sessionId) {
      setVerifying(true);
      fetch(`/api/stripe/verify?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setAccessGranted(true);
            // Store access in localStorage for convenience
            localStorage.setItem("bg_session", sessionId);
          }
          setVerifying(false);
        })
        .catch(() => setVerifying(false));
    } else {
      // Check if they have a stored session
      const stored = localStorage.getItem("bg_session");
      if (stored) {
        setVerifying(true);
        fetch(`/api/stripe/verify?session_id=${stored}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.valid) setAccessGranted(true);
            else localStorage.removeItem("bg_session");
            setVerifying(false);
          })
          .catch(() => setVerifying(false));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-cream/80 hover:text-cream transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hotel Quinto
          </Link>
          <span className="font-heading text-lg">Hotel Quinto</span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-forest text-cream pb-16 pt-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold mb-4 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            Buyer&apos;s Guide
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            The Ultimate Guide to Buying Property in Colombia&apos;s Coffee Region
          </h1>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            Everything you need to know — from legal processes and neighborhoods to
            investment returns and insider tips — curated by locals who know the
            region inside and out.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg border border-charcoal/5 p-6 md:p-8">
          <h2 className="font-heading text-xl text-forest mb-4">
            What&apos;s Inside
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {guideSections.map((section, i) => (
              <div
                key={section.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-cream transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gold/10 text-gold-dark shrink-0 text-sm font-semibold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal text-sm">
                    {section.title}
                  </h3>
                  <p className="text-charcoal/50 text-xs mt-0.5">
                    {section.preview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <main className="max-w-3xl mx-auto px-4 py-16">
        {verifying ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-forest mb-4" />
            <p className="text-charcoal/60">Verifying your purchase...</p>
          </div>
        ) : accessGranted ? (
          <GuideContent />
        ) : (
          <>
            {/* Preview of first section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-forest/10 text-forest">
                  {guideSections[0].icon}
                </div>
                <div>
                  <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                    Chapter 1 — Free Preview
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl text-forest">
                    {guideSections[0].title}
                  </h2>
                </div>
              </div>
              <div className="space-y-4 text-charcoal/80 leading-relaxed">
                {guideSections[0].content.slice(0, 2).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {/* Fade out effect */}
              <div className="relative mt-4">
                <div className="text-charcoal/80 leading-relaxed">
                  {guideSections[0].content[2]?.slice(0, 120)}...
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream" />
              </div>
            </section>

            {/* Paywall */}
            <div className="relative py-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <PurchaseButton />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            </div>

            {/* Locked preview cards */}
            <section className="mt-12 space-y-4">
              {guideSections.slice(1).map((section, i) => (
                <div
                  key={section.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-charcoal/5 opacity-60"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-charcoal/5 text-charcoal/30 shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal/50 text-sm">
                      Chapter {i + 2}: {section.title}
                    </h3>
                    <p className="text-charcoal/30 text-xs mt-1">
                      {section.preview}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-forest text-cream/60 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Hotel Quinto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
