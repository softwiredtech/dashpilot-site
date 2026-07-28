import { Resend } from "resend";

const FROM = process.env.RESEND_FROM || "DashKit <orders@softwiredtech.com>";

export type OrderEmail = {
  to: string;
  customerName: string;
  /** Easyship shipment id, used as the order number. */
  orderId: string;
  vehicle: string;
  productName: string;
  productAmount: string;
  shippingAmount: string;
  totalAmount: string;
  shippingMethod: string;
  deliveryEstimate: string;
  address: string[];
  /** Stripe Checkout session id — makes the send idempotent across retries. */
  idempotencyKey: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHtml(order: OrderEmail) {
  const row = (label: string, value: string, strong = false) => `
    <tr>
      <td style="padding:8px 0;color:#5c5c66;font-size:14px;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;text-align:right;font-size:14px;color:#16161a;${
        strong ? "font-weight:600;" : ""
      }">${escapeHtml(value)}</td>
    </tr>`;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e4e4e7;">
            <tr>
              <td style="padding:32px 32px 8px;">
                <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#3f9e5f;font-weight:600;">Order confirmed</div>
                <h1 style="margin:12px 0 0;font-size:24px;line-height:1.25;color:#16161a;">Thank you, ${escapeHtml(
                  order.customerName
                )}!</h1>
                <p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:#5c5c66;">
                  We&rsquo;ve received your order and we&rsquo;re preparing it for shipping.
                  You&rsquo;ll get tracking details from us as soon as your parcel is on its way.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;">
                <div style="background:#f8f8f9;border:1px solid #e4e4e7;border-radius:10px;padding:16px;">
                  <div style="font-size:12px;color:#5c5c66;">Order number</div>
                  <div style="font-size:18px;font-weight:600;color:#16161a;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;margin-top:4px;">${escapeHtml(
                    order.orderId
                  )}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;">
                <h2 style="margin:0 0 4px;font-size:14px;text-transform:uppercase;letter-spacing:0.06em;color:#5c5c66;">Summary</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${row(order.productName, order.productAmount)}
                  ${row("Vehicle", order.vehicle)}
                  ${row(order.shippingMethod, order.shippingAmount)}
                  <tr><td colspan="2" style="border-top:1px solid #e4e4e7;padding-top:4px;"></td></tr>
                  ${row("Total paid", order.totalAmount, true)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;">
                <h2 style="margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:0.06em;color:#5c5c66;">Shipping to</h2>
                <p style="margin:0;font-size:14px;line-height:1.7;color:#16161a;">
                  ${order.address.map((line) => escapeHtml(line)).join("<br />")}
                </p>
                <p style="margin:12px 0 0;font-size:13px;color:#5c5c66;">
                  Estimated delivery once shipped: ${escapeHtml(order.deliveryEstimate)}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;">
                <p style="margin:0;font-size:13px;line-height:1.6;color:#5c5c66;border-top:1px solid #e4e4e7;padding-top:20px;">
                  Questions about your order? Just reply to this email, or reach us at
                  <a href="mailto:info@softwiredtech.com" style="color:#3f9e5f;">info@softwiredtech.com</a>.
                  Quote your order number and we&rsquo;ll find it straight away.
                </p>
                <p style="margin:16px 0 0;font-size:12px;color:#9a9aa3;">
                  Softwired Technologies Kft. &middot; Hungary
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderText(order: OrderEmail) {
  return [
    `Thank you, ${order.customerName}!`,
    "",
    "We've received your order and we're preparing it for shipping.",
    "You'll get tracking details from us as soon as your parcel is on its way.",
    "",
    `Order number: ${order.orderId}`,
    "",
    "Summary",
    `  ${order.productName}: ${order.productAmount}`,
    `  Vehicle: ${order.vehicle}`,
    `  ${order.shippingMethod}: ${order.shippingAmount}`,
    `  Total paid: ${order.totalAmount}`,
    "",
    "Shipping to",
    ...order.address.map((line) => `  ${line}`),
    "",
    `Estimated delivery once shipped: ${order.deliveryEstimate}`,
    "",
    "Questions? Reply to this email or contact info@softwiredtech.com.",
    "Softwired Technologies Kft., Hungary",
  ].join("\n");
}

/**
 * Send the order confirmation.
 *
 * Resend returns errors in `{ data, error }` rather than throwing, so the error
 * branch is explicit. The idempotency key means a Stripe webhook retry will not
 * send the customer a second copy (keys live for 24h).
 */
export async function sendOrderConfirmation(order: OrderEmail) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send(
    {
      from: FROM,
      to: [order.to],
      replyTo: "info@softwiredtech.com",
      subject: `Your DashKit order ${order.orderId}`,
      html: renderHtml(order),
      text: renderText(order),
    },
    { idempotencyKey: `order-confirmation/${order.idempotencyKey}` }
  );

  if (error) {
    throw new Error(`Resend: ${error.name} — ${error.message}`);
  }

  return data;
}
