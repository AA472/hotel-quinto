import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-02-25.clover",
});

export const BUYERS_GUIDE_PRICE = 1999; // $19.99 in cents
export const BUYERS_GUIDE_PRODUCT_NAME =
  "Hotel Quinto — Ultimate Coffee Region Buyer's Guide";
