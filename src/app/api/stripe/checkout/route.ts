import { NextResponse } from "next/server";
import { stripe, BUYERS_GUIDE_PRICE, BUYERS_GUIDE_PRODUCT_NAME } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: BUYERS_GUIDE_PRODUCT_NAME,
              description:
                "Comprehensive guide to buying property in Colombia's Coffee Region — insider tips, legal process, neighborhoods, and more.",
            },
            unit_amount: BUYERS_GUIDE_PRICE,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/buyers-guide?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/buyers-guide`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
