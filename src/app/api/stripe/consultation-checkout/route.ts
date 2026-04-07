import { NextResponse } from "next/server";
import { stripe, CONSULTATION_PRICES, CONSULTATION_PRODUCT_NAME } from "@/lib/stripe";

type Tier = keyof typeof CONSULTATION_PRICES;

const tierDescriptions: Record<Tier, { name: string; description: string }> = {
  intro: {
    name: `${CONSULTATION_PRODUCT_NAME} — Intro Call`,
    description: "30-minute introductory consultation to discuss your property goals in Colombia's Coffee Region.",
  },
  standard: {
    name: `${CONSULTATION_PRODUCT_NAME} — Standard`,
    description: "60-minute in-depth consultation covering market analysis, neighborhoods, legal process, and personalized recommendations.",
  },
  premium: {
    name: `${CONSULTATION_PRODUCT_NAME} — Premium`,
    description: "90-minute comprehensive consultation with follow-up report, curated property listings, and local contact introductions.",
  },
};

export async function POST(request: Request) {
  try {
    const { email, tier } = (await request.json()) as { email?: string; tier?: string };

    if (!tier || !(tier in CONSULTATION_PRICES)) {
      return NextResponse.json({ error: "Invalid consultation tier" }, { status: 400 });
    }

    const t = tier as Tier;
    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: tierDescriptions[t].name,
              description: tierDescriptions[t].description,
            },
            unit_amount: CONSULTATION_PRICES[t],
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/consultations/success?session_id={CHECKOUT_SESSION_ID}&tier=${t}`,
      cancel_url: `${origin}/consultations`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe consultation checkout error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to create checkout session", detail: message }, { status: 500 });
  }
}
