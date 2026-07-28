import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createShipment } from "@/lib/easyship";
import { sendOrderConfirmation } from "@/lib/email";
import { formatEur, productPriceEur } from "@/lib/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// constructEvent is synchronous and needs Node crypto — pin the runtime so this
// never silently ends up on edge. No bodyParser config is needed in App Router;
// that was a Pages Router concern.
export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  // Must be the raw body — parsing and re-serialising breaks the signature.
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe signature verification failed:", message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    try {
      await fulfill(event.data.object.id);
    } catch (err) {
      console.error("Fulfilment failed:", err);
      // Non-2xx makes Stripe retry, which is what we want — fulfil() is
      // idempotent, so a retry will not duplicate the shipment or the email.
      return NextResponse.json({ error: "Fulfilment failed." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

/**
 * Create the Easyship shipment and email the customer.
 *
 * Safe to call more than once for the same session: the shipment id is stashed
 * on the PaymentIntent, so a retry reuses it rather than creating a second
 * shipment, and the Resend send is keyed on the session id.
 *
 * Note this creates the shipment only — it does not buy the label, so no money
 * moves and UPS is not booked. You buy labels from the Easyship dashboard when
 * you pack. To automate that later, pass `buyLabel: true` below.
 */
async function fulfill(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent"],
  });

  // completed can fire while still unpaid for delayed payment methods.
  if (session.payment_status === "unpaid") return;

  const meta = session.metadata ?? {};
  const email = session.customer_details?.email || session.customer_email;

  if (!email) {
    throw new Error(`No customer email on session ${sessionId}.`);
  }

  const paymentIntent =
    typeof session.payment_intent === "string"
      ? await stripe.paymentIntents.retrieve(session.payment_intent)
      : session.payment_intent;

  let shipmentId = paymentIntent?.metadata?.easyship_shipment_id;

  if (!shipmentId) {
    const shipment = await createShipment({
      destination: {
        line_1: meta.shipping_address ?? "",
        city: meta.shipping_city ?? "",
        postal_code: meta.shipping_zip ?? "",
        country_alpha2: meta.country ?? "",
        contact_name: meta.customer_name ?? "",
        contact_email: email,
        contact_phone: meta.phone ?? "",
        ...(meta.is_company === "true" && {
          company_name: meta.customer_name ?? "",
        }),
      },
      courierServiceId: meta.courier_service_id ?? "",
      platformOrderNumber: session.id,
      declaredValue: productPriceEur(),
      currency: "EUR",
      buyLabel: false,
    });

    shipmentId = shipment.easyship_shipment_id;

    // Record it so a webhook retry reuses this shipment instead of making another.
    if (paymentIntent) {
      await stripe.paymentIntents.update(paymentIntent.id, {
        metadata: { easyship_shipment_id: shipmentId },
      });
    }
  }

  const shippingCents = session.total_details?.amount_shipping ?? 0;

  await sendOrderConfirmation({
    to: email,
    customerName: meta.customer_name || "there",
    orderId: shipmentId,
    vehicle: meta.harness || "—",
    productName: "DashKit",
    productAmount: formatEur(productPriceEur()),
    shippingAmount: formatEur(shippingCents / 100),
    totalAmount: formatEur((session.amount_total ?? 0) / 100),
    shippingMethod:
      [meta.shipping_courier, meta.shipping_service].filter(Boolean).join(" — ") ||
      "Shipping",
    deliveryEstimate: meta.delivery_estimate || "we'll confirm when it ships",
    address: [
      meta.customer_name ?? "",
      meta.shipping_address ?? "",
      `${meta.shipping_zip ?? ""} ${meta.shipping_city ?? ""}`.trim(),
      meta.country ?? "",
    ].filter(Boolean),
    idempotencyKey: session.id,
  });
}
