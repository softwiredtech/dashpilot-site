import Stripe from "stripe";

let stripe: Stripe | null = null;

/** Created on first use and shared by every server route that needs Stripe. */
export function getStripe(): Stripe {
  stripe ??= new Stripe(process.env.STRIPE_SECRET_KEY!);
  return stripe;
}
