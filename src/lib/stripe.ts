import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-02-25.clover",
    })
  : (null as unknown as Stripe);

export const BUYERS_GUIDE_PRICE = 1999; // $19.99 in cents
export const BUYERS_GUIDE_PRODUCT_NAME =
  "Hotel Quinto — Ultimate Coffee Region Buyer's Guide";
