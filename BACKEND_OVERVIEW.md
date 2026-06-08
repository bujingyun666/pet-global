# PetGlobal Backend Overview

## Implemented

- Email/password login with JWT cookie and bearer-token support.
- Roles: buyer, seller, admin.
- SQLite tables for users, pet listings, orders, payment events, and order events.
- Seller/admin pet listing submission.
- Admin listing review.
- Buyer/admin order creation.
- Server-side commission, service-fee, and seller-payout calculation.
- Mock payment provider with payment-intent creation and confirmation.
- Idempotent payment-event storage.
- Escrow order states: payment pending, escrow funded, docs cleared, transport booked, delivered, released, disputed, cancelled.
- Admin overview metrics and risk queue.
- Pet care services modeled after the local Petopia feeding app: feeding, grooming, boarding, and pickup.
- Service booking flow with provider status updates and commission calculation.
- Buyer/seller/admin messages.
- Seller wallet summary for trade and service settlement items.

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/listings`
- `POST /api/listings`
- `POST /api/orders`
- `GET /api/orders`
- `POST /api/orders/:id/mock-confirm-payment`
- `PATCH /api/orders/:id/status`
- `GET /api/services`
- `POST /api/service-bookings`
- `GET /api/service-bookings`
- `PATCH /api/service-bookings/:id/status`
- `GET /api/messages`
- `GET /api/wallet`
- `GET /api/admin/overview`
- `PATCH /api/admin/listings/:id/review`

## Payment Boundary

The current provider is a mock. For real payments, replace `server/payments/mock-provider.js` with a licensed provider integration and verify webhook signatures before changing order state.

Do not trust frontend totals. The backend already recalculates amount, commission, service fee, and seller payout from the stored listing price.

## Production Notes

- Replace SQLite with Postgres or another managed database.
- Add email verification, password reset, rate limits, audit logs, and 2FA for admins.
- Add real KYC/KYB and seller document verification.
- Add legal review for live animal sales, import/export rules, quarantine, transport welfare, consumer protection, and escrow/payment licensing.
