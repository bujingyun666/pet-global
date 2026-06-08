import { nanoid } from "nanoid";

export function createPaymentIntent({ orderId, amountCents, currency }) {
  return {
    provider: "mock",
    paymentIntentId: `pi_mock_${nanoid(16)}`,
    orderId,
    amountCents,
    currency,
    clientSecret: `mock_secret_${nanoid(24)}`,
    status: "requires_confirmation",
  };
}

export function confirmPaymentIntent(paymentIntentId) {
  return {
    provider: "mock",
    paymentIntentId,
    status: "succeeded",
    eventId: `evt_mock_${nanoid(16)}`,
  };
}
