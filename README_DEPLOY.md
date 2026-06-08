# PetGlobal Trade Deployment

This project now includes a Node/Express backend plus a static frontend.

## Local Full-Stack Run

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://127.0.0.1:4174`.

Demo accounts:

- `buyer@petglobal.test` / `petglobal2026`
- `seller@petglobal.test` / `petglobal2026`
- `admin@petglobal.test` / `petglobal2026`

The local full-stack version includes the Petopia-inspired service workflows: feeding, grooming, boarding, pickup bookings, messages, and seller wallet settlement.

## Buyer Checkout Flow

The buyer flow is now a fuller escrow-style demo:

- Buyer selects a verified pet and opens the checkout dialog.
- Buyer enters contact, phone, destination country/city, full address, import document status, transport option, order note, and KYC/terms confirmation.
- Backend recalculates pet price, platform commission, compliance/service fee, seller payout, and total due. The frontend total is never trusted.
- Backend creates the order and locks the pet listing as `sold` in one transaction to prevent duplicate purchase.
- In demo mode, mock payment confirmation moves the order from `payment_pending` to `escrow_funded`.
- In Stripe mode, the backend creates a Stripe Checkout Session and the verified webhook moves the order into escrow after payment succeeds.
- Admin can advance documents, transport, delivery, release, dispute, or cancellation. Cancellation releases the locked pet back to approved inventory.
- Transaction rows expose order details for contact, destination, address, import status, transport, and protection period.

## Seller Withdrawal Flow

Seller wallet now includes:

- Pending settlement from escrow-funded pet trades and confirmed/completed services.
- Available withdrawal balance from released pet trades and settled service bookings.
- Seller withdrawal requests with bank, PayPal, or Stripe Connect fields.
- Seller Stripe Connect onboarding for real payout destinations.
- Admin payout review actions for marking requests as paid or rejected. When Stripe is configured, Stripe Connect requests can create real Stripe transfers.

## Seller Listing Compliance Flow

Seller publishing now collects the materials needed for a real pet marketplace review:

- Pet image upload.
- Vaccine record, microchip certificate, health certificate, and optional export/import permit upload.
- Microchip number.
- Seller legal name, ID type, and masked ID reference.
- Export country, import country, and transport route.
- Admin compliance queue shows the identity summary, country route, microchip ID, and file links before approving or restricting a listing.

Uploads are stored under `UPLOAD_DIR`. On Render, use the persistent disk path:

```bash
UPLOAD_DIR=/opt/render/project/src/data/uploads
DATABASE_PATH=/opt/render/project/src/data/petglobal.sqlite
```

For long-term production, move uploads to object storage such as S3, Cloudflare R2, or another private file store with signed access URLs.

## Multilingual Settings

The frontend auto-detects browser language, supports manual Chinese/English switching, and persists the choice in `localStorage` as `petopia_lang`. API calls send `Accept-Language` so backend errors, service names, bookings, wallet rows, and platform messages can return the matching language.

Backend runtime switch:

- `I18N_ENABLED=true` shows the language selector and enables `Accept-Language`.
- `I18N_ENABLED=false` hides the selector and uses `I18N_DEFAULT_LANG`.
- `I18N_DEFAULT_LANG=en` is the safe default for global traffic.

## Static Demo Deployment

1. Open Vercel, Netlify, Cloudflare Pages, or GitHub Pages.
2. Create a new static site.
3. Upload this folder or connect it to a repository.
4. Set the publish/output directory to the project root.
5. After deployment, bind a custom domain in the hosting provider's domain settings.

The existing `pet-global-mocha.vercel.app` deployment is useful as a static demo. It shows the Petopia-inspired service and booking UI with fallback demo data, but it does not run this local Express server.

## Connect Public Frontend to Real Backend

To make the public Vercel site use real database-backed APIs, deploy the Node backend and then update `config.js`:

```js
window.PETGLOBAL_CONFIG = {
  apiBaseUrl: "https://YOUR-BACKEND-DOMAIN",
};
```

Then run:

```bash
vercel deploy --prod --yes
```

After that, `https://pet-global-mocha.vercel.app` will call the real backend for login, inventory lock, escrow orders, wallet, and payout review.

Current note: `https://pet-global-api.onrender.com/api/health` was checked and returned 404, so the Render backend URL is not confirmed yet. Copy the real `.onrender.com` service URL from Render after deployment, then put it into `config.js`.

## Render Backend Deployment

This repo includes `render.yaml`. On Render:

1. Create a new Blueprint from this project/repository.
2. Render will run `npm install` and `npm start`.
3. A 1 GB persistent disk is mounted at `./data` so SQLite survives restarts.
4. Set or confirm these environment variables:

- `JWT_SECRET`
- `DATABASE_PATH=./data/petglobal.sqlite`
- `COMMISSION_LOW_THRESHOLD_CENTS=100000`
- `COMMISSION_HIGH_THRESHOLD_CENTS=500000`
- `COMMISSION_TIER_LOW=0.10`
- `COMMISSION_TIER_MID=0.08`
- `COMMISSION_TIER_HIGH=0.06`
- `COMMISSION_CAP_CENTS=80000`
- `DEFAULT_SERVICE_FEE_CENTS=18000`
- `SERVICE_COMMISSION_RATE=0.15`
- `MOCK_PAYMENT_MODE=true`
- `PUBLIC_APP_URL=https://pet-global-mocha.vercel.app`
- `BACKEND_BASE_URL=https://YOUR-RENDER-BACKEND.onrender.com`
- `I18N_ENABLED=true`
- `I18N_DEFAULT_LANG=en`
- `ALLOWED_ORIGINS=https://pet-global-mocha.vercel.app`

Render will give you a backend URL like `https://pet-global-api.onrender.com`. Put that URL into `config.js` as `apiBaseUrl`.

## Stripe Production Payments

The backend now supports both safe demo payments and real Stripe payments.

Keep demo mode while testing:

```bash
MOCK_PAYMENT_MODE=true
```

To enable real Stripe Checkout and Connect payouts on Render:

1. In Stripe Dashboard, create or use a Stripe account.
2. Add the backend webhook endpoint:

```text
https://YOUR-RENDER-BACKEND.onrender.com/api/stripe/webhook
```

3. Subscribe to at least:

```text
checkout.session.completed
payment_intent.succeeded
```

4. In Render environment variables, set:

```bash
MOCK_PAYMENT_MODE=false
STRIPE_SECRET_KEY=sk_live_or_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PUBLIC_APP_URL=https://pet-global-mocha.vercel.app
BACKEND_BASE_URL=https://YOUR-RENDER-BACKEND.onrender.com
```

5. Sellers should open the wallet page and use "Connect Stripe payouts" to finish Stripe Connect onboarding.
6. After an order is released and a seller requests a Stripe Connect withdrawal, an admin can mark the payout as paid. The backend creates a Stripe transfer and stores the transfer id.

Do not commit Stripe keys to GitHub. Put them only in Render environment variables.

## Railway/Fly/VPS Backend Deployment

This repo also includes a `Dockerfile`. Any Node/Docker host can run:

```bash
npm install
npm start
```

or build the Docker image. Use a persistent volume mounted to `./data` if you keep SQLite.

## Production Backend Deployment

For a real marketplace, deploy the backend to a Node-capable host such as Render, Fly.io, Railway, a VPS, or a container platform. Use a managed database such as Postgres instead of local SQLite. Configure:

- `JWT_SECRET`
- database connection string
- payment provider API keys
- webhook signing secret
- allowed frontend origin

## Notes Before Real Launch

- Replace demo login with real authentication.
- Store transactions and users in a backend database.
- Process escrow and platform commissions through a licensed payment provider.
- Verify pet import/export, animal welfare, quarantine, transport, and marketplace rules per country.
- Add seller KYC, document verification, abuse reporting, and dispute handling.
