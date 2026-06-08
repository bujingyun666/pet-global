import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export function isStripeConfigured() {
  return Boolean(stripe);
}

export async function createStripeCheckoutSession({
  orderId,
  listing,
  buyer,
  amounts,
  successUrl,
  cancelUrl,
}) {
  if (!stripe) throw new Error("Stripe is not configured");

  const currency = String(listing.currency || "USD").toLowerCase();
  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      success_url: `${successUrl}?payment=stripe_success&order=${encodeURIComponent(orderId)}`,
      cancel_url: `${cancelUrl}?payment=stripe_cancelled&order=${encodeURIComponent(orderId)}`,
      customer_email: buyer.email,
      client_reference_id: orderId,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: amounts.totalDueCents,
            product_data: {
              name: `PetGlobal escrow order ${orderId}`,
              description: `${listing.name} - ${listing.breed} from ${listing.country}`,
              metadata: {
                listing_id: listing.id,
              },
            },
          },
        },
      ],
      metadata: {
        order_id: orderId,
        listing_id: listing.id,
        buyer_id: String(buyer.id),
        seller_id: String(listing.seller_id),
      },
      payment_intent_data: {
        metadata: {
          order_id: orderId,
          listing_id: listing.id,
          buyer_id: String(buyer.id),
          seller_id: String(listing.seller_id),
          platform_fee_cents: String(amounts.totalDueCents - amounts.sellerPayoutCents),
          seller_payout_cents: String(amounts.sellerPayoutCents),
        },
        transfer_group: orderId,
      },
    },
    { idempotencyKey: `checkout_${orderId}` },
  );

  return {
    provider: "stripe",
    orderId,
    checkoutSessionId: session.id,
    paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : session.id,
    checkoutUrl: session.url,
    status: session.payment_status || session.status,
  };
}

export async function createStripeShopCheckoutSession({
  orderId,
  order,
  buyer,
  successUrl,
  cancelUrl,
}) {
  if (!stripe) throw new Error("Stripe is not configured");

  const currency = String(order.currency || "USD").toLowerCase();
  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      success_url: `${successUrl}?payment=shop_success&order=${encodeURIComponent(orderId)}`,
      cancel_url: `${cancelUrl}?payment=shop_cancelled&order=${encodeURIComponent(orderId)}`,
      customer_email: buyer.email,
      client_reference_id: orderId,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: order.totalDueCents,
            product_data: {
              name: `PetGlobal shop order ${orderId}`,
              description: order.description,
              metadata: {
                shop_order_id: orderId,
              },
            },
          },
        },
      ],
      metadata: {
        order_id: orderId,
        order_type: "shop",
        buyer_id: String(buyer.id),
        seller_id: String(order.sellerId),
      },
      payment_intent_data: {
        metadata: {
          order_id: orderId,
          order_type: "shop",
          buyer_id: String(buyer.id),
          seller_id: String(order.sellerId),
          platform_fee_cents: String(order.totalDueCents - order.sellerPayoutCents),
          seller_payout_cents: String(order.sellerPayoutCents),
        },
        transfer_group: orderId,
      },
    },
    { idempotencyKey: `shop_checkout_${orderId}` },
  );

  return {
    provider: "stripe",
    orderId,
    checkoutSessionId: session.id,
    paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : session.id,
    checkoutUrl: session.url,
    status: session.payment_status || session.status,
  };
}

export function constructStripeWebhookEvent(payload, signature) {
  if (!stripe) throw new Error("Stripe is not configured");
  if (!stripeWebhookSecret) throw new Error("Stripe webhook secret is not configured");
  return stripe.webhooks.constructEvent(payload, signature, stripeWebhookSecret);
}

export async function createStripeConnectAccount({ user, country }) {
  if (!stripe) throw new Error("Stripe is not configured");
  return stripe.accounts.create({
    type: "express",
    country,
    email: user.email,
    capabilities: {
      transfers: { requested: true },
    },
    metadata: {
      user_id: String(user.id),
      role: user.role,
    },
  });
}

export async function createStripeAccountLink({ accountId, refreshUrl, returnUrl }) {
  if (!stripe) throw new Error("Stripe is not configured");
  return stripe.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: "account_onboarding",
  });
}

export async function retrieveStripeCheckoutSession(sessionId) {
  if (!stripe) throw new Error("Stripe is not configured");
  return stripe.checkout.sessions.retrieve(sessionId);
}

export async function createStripeTransfer({ payoutId, amountCents, currency, destination, transferGroup }) {
  if (!stripe) throw new Error("Stripe is not configured");
  return stripe.transfers.create(
    {
      amount: amountCents,
      currency: String(currency || "USD").toLowerCase(),
      destination,
      transfer_group: transferGroup,
      metadata: {
        payout_id: payoutId,
      },
    },
    { idempotencyKey: `payout_${payoutId}` },
  );
}
