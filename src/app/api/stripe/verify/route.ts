import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const valid = session.payment_status === "paid";
    return NextResponse.json({ valid, email: session.customer_email });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
