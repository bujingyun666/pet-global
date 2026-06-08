import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { nanoid } from "nanoid";
import { z } from "zod";
import {
  clearSessionCookie,
  createSession,
  hashPassword,
  publicUser,
  requireAuth,
  requireRole,
  setSessionCookie,
  verifyPassword,
} from "./auth.js";
import { db, initializeDatabase, toBooking, toListing, toMessage, toOrder, toService } from "./db.js";
import { confirmPaymentIntent, createPaymentIntent } from "./payments/mock-provider.js";
import {
  constructStripeWebhookEvent,
  createStripeAccountLink,
  createStripeCheckoutSession,
  createStripeConnectAccount,
  createStripeTransfer,
  isStripeConfigured,
  retrieveStripeCheckoutSession,
} from "./payments/stripe-provider.js";

initializeDatabase();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const app = express();
const port = Number(process.env.PORT || 4174);
const commissionRate = Number(process.env.COMMISSION_RATE || 0.08);
const defaultServiceFeeCents = 18000;
const publicAppUrl = String(process.env.PUBLIC_APP_URL || "http://127.0.0.1:4174").replace(/\/$/, "");
const backendBaseUrl = String(process.env.BACKEND_BASE_URL || publicAppUrl).replace(/\/$/, "");
const paymentProvider = !process.env.MOCK_PAYMENT_MODE || process.env.MOCK_PAYMENT_MODE === "true"
  ? "mock"
  : isStripeConfigured()
    ? "stripe"
    : "mock";
const i18nEnabled = process.env.I18N_ENABLED !== "false";
const i18nRuntimeConfig = {
  enabled: i18nEnabled,
  defaultLang: i18nEnabled && process.env.I18N_DEFAULT_LANG === "zh" ? "zh" : "en",
};
const allowedOrigins = new Set(
  [
    "http://127.0.0.1:4173",
    "http://127.0.0.1:4174",
    "http://localhost:4173",
    "http://localhost:4174",
    "https://pet-global-mocha.vercel.app",
    ...(process.env.ALLOWED_ORIGINS || "").split(",").map((item) => item.trim()).filter(Boolean),
  ],
);

const apiText = {
  zh: {
    validation_failed: "提交内容格式不正确",
    email_registered: "邮箱已被注册",
    invalid_login: "邮箱或密码不正确",
    service_not_found: "服务不存在",
    service_self_booking: "服务者不能预约自己的服务",
    booking_not_found: "预约不存在",
    permission_denied: "没有操作权限",
    listing_not_found: "宠物信息不存在",
    listing_not_approved: "该宠物尚未通过审核，不能下单",
    listing_self_buy: "卖家不能购买自己的宠物",
    listing_already_locked: "该宠物刚刚被锁定或售出，请选择其他宠物",
    order_not_found: "订单不存在",
    order_payment_not_pending: "订单不处于待付款状态",
    payout_amount_invalid: "提现金额超过当前可提现余额",
    payout_not_found: "提现申请不存在",
    internal_error: "服务器内部错误",
    order_submitted_title: "托管订单已创建",
    order_submitted_body: (petName, orderId) => `${petName} 的订单 ${orderId} 已锁定宠物，请尽快完成托管付款。`,
    payout_requested_title: "提现申请已提交",
    payout_requested_body: (amount) => `你的 ${amount} 提现申请已进入平台财务审核。`,
    booking_submitted_title: "服务预约已提交",
    booking_submitted_body: (petName, serviceTitle) => `${petName} 的 ${serviceTitle} 已进入商家确认队列。`,
    settlement_title: "结算规则",
    settlement_body: "低风险订单在保障期结束并通过复核后进入自动结算队列。",
    welcome_title: "欢迎来到 PetGlobal",
    welcome_body: "交易、投喂预约、健康档案、售后和监管消息会集中显示在这里。",
    receive_check_title: "收宠验收提醒",
    receive_check_body: "收宠时请拍完整开箱视频，并核对芯片编号和健康档案。",
  },
  en: {
    validation_failed: "Submitted data is invalid",
    email_registered: "Email already registered",
    invalid_login: "Invalid email or password",
    service_not_found: "Service not found",
    service_self_booking: "Providers cannot book their own service",
    booking_not_found: "Booking not found",
    permission_denied: "Permission denied",
    listing_not_found: "Listing not found",
    listing_not_approved: "This listing is not approved for checkout",
    listing_self_buy: "Sellers cannot buy their own listing",
    listing_already_locked: "This pet was just locked or sold. Please choose another pet.",
    order_not_found: "Order not found",
    order_payment_not_pending: "Order payment is not pending",
    payout_amount_invalid: "Withdrawal amount exceeds the currently available balance",
    payout_not_found: "Payout request not found",
    internal_error: "Internal server error",
    order_submitted_title: "Escrow order created",
    order_submitted_body: (petName, orderId) => `${petName}'s order ${orderId} has locked the pet. Please complete escrow payment soon.`,
    payout_requested_title: "Withdrawal request submitted",
    payout_requested_body: (amount) => `Your ${amount} withdrawal request is now in finance review.`,
    booking_submitted_title: "Service booking submitted",
    booking_submitted_body: (petName, serviceTitle) => `${petName}'s ${serviceTitle} booking is waiting for provider confirmation.`,
    settlement_title: "Settlement rules",
    settlement_body: "Low-risk orders enter automatic settlement after the protection period and review.",
    welcome_title: "Welcome to PetGlobal",
    welcome_body: "Trades, feeding bookings, health records, after-sales and regulatory messages appear here.",
    receive_check_title: "Pet acceptance reminder",
    receive_check_body: "Record a complete unboxing video and verify the chip number and health file.",
  },
};

const serviceText = {
  "SV-FEED-001": {
    zh: {
      title: "上门投喂与饮水巡检",
      summary: "按次上门，拍照回传食盆、水碗、排便和门窗状态。",
      tags: ["实时记录", "可回放", "2小时响应"],
    },
    en: {
      title: "Doorstep Feeding and Water Check",
      summary: "Per-visit feeding with photo records for food, water, waste and doors/windows.",
      tags: ["Real-time record", "Playback", "2h response"],
    },
  },
  "SV-WASH-001": {
    zh: {
      title: "洗护美容到店预约",
      summary: "洗澡、修毛、耳道护理和基础皮肤检查。",
      tags: ["认证门店", "保险覆盖", "可预约"],
    },
    en: {
      title: "Grooming Appointment",
      summary: "Bathing, trimming, ear care and basic skin checks.",
      tags: ["Certified store", "Insured", "Bookable"],
    },
  },
  "SV-CARE-001": {
    zh: {
      title: "短期寄养与健康看护",
      summary: "寄养前确认疫苗、性格、饮食禁忌，日更照护记录。",
      tags: ["健康档案", "日更记录", "托管付款"],
    },
    en: {
      title: "Short-Term Boarding and Health Care",
      summary: "Confirm vaccines, temperament and diet restrictions before boarding, with daily care logs.",
      tags: ["Health file", "Daily log", "Escrow payment"],
    },
  },
  "SV-PICK-001": {
    zh: {
      title: "跨城接送与交接拍摄",
      summary: "运输箱编号、芯片核对、交接视频和到达提醒。",
      tags: ["交接视频", "芯片核对", "路线跟踪"],
    },
    en: {
      title: "Cross-City Pickup and Handoff Video",
      summary: "Carrier ID, chip check, handoff video and arrival reminders.",
      tags: ["Handoff video", "Chip check", "Route tracking"],
    },
  },
};

const messageText = {
  "MSG-WELCOME": ["welcome_title", "welcome_body"],
  "MSG-ORDER-GUARD": ["receive_check_title", "receive_check_body"],
  "MSG-SETTLEMENT": ["settlement_title", "settlement_body"],
};

function requestLang(req) {
  if (!i18nRuntimeConfig.enabled) return i18nRuntimeConfig.defaultLang;
  return String(req.headers["accept-language"] || "").toLowerCase().startsWith("zh") ? "zh" : "en";
}

function tt(req, key, ...args) {
  const value = apiText[requestLang(req)]?.[key] ?? apiText.en[key] ?? key;
  return typeof value === "function" ? value(...args) : value;
}

function validationError(req, error) {
  return { error: tt(req, "validation_failed"), details: error.flatten() };
}

function localizeService(service, req) {
  const text = serviceText[service.id]?.[requestLang(req)];
  return text ? { ...service, ...text } : service;
}

function localizeBooking(booking, req) {
  const text = serviceText[booking.serviceId]?.[requestLang(req)];
  return text ? { ...booking, serviceTitle: text.title } : booking;
}

function localizeMessage(message, req) {
  const keys = messageText[message.id];
  return keys ? { ...message, title: tt(req, keys[0]), body: tt(req, keys[1]) } : message;
}

app.use(morgan("dev"));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && (allowedOrigins.has(origin) || origin.endsWith(".vercel.app"))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept-Language");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  }
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), (req, res) => {
  let event;
  try {
    event = constructStripeWebhookEvent(req.body, req.headers["stripe-signature"]);
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.payment_status === "paid") {
      markOrderEscrowFunded({
        eventId: event.id,
        provider: "stripe",
        orderId: session.metadata?.order_id || session.client_reference_id,
        paymentIntentId: session.payment_intent || session.id,
        payload: event,
        note: "Stripe Checkout payment completed",
      });
    }
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    markOrderEscrowFunded({
      eventId: event.id,
      provider: "stripe",
      orderId: intent.metadata?.order_id,
      paymentIntentId: intent.id,
      payload: event,
      note: "Stripe payment intent succeeded",
    });
  }

  res.json({ received: true });
});
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(express.static(projectRoot, { extensions: ["html"] }));

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["buyer", "seller"]).default("buyer"),
  displayName: z.string().min(2).max(80),
  country: z.string().min(2).max(80),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const listingSchema = z.object({
  name: z.string().min(2).max(80),
  species: z.string().min(2).max(60),
  breed: z.string().min(2).max(80),
  age: z.string().min(2).max(40),
  country: z.string().min(2).max(80),
  price: z.number().positive().max(1000000),
  image: z.string().default("/assets/dog.jpg"),
  docs: z.array(z.string().min(2).max(80)).default(["Seller ID"]),
  route: z.string().min(2).max(160).default("Pending route"),
});

const createOrderSchema = z.object({
  listingId: z.string().min(3),
  contactName: z.string().min(2).max(80),
  contactPhone: z.string().min(5).max(40),
  destinationCountry: z.string().min(2).max(80),
  destinationCity: z.string().min(2).max(80),
  deliveryAddress: z.string().min(8).max(240),
  importPermit: z.enum(["buyer_confirmed", "need_platform_help"]).default("buyer_confirmed"),
  transportOption: z.enum(["platform_partner", "seller_arranged", "buyer_arranged"]).default("platform_partner"),
  buyerNote: z.string().max(240).optional().default(""),
  kycConfirmed: z.boolean(),
});

const advanceOrderSchema = z.object({
  status: z.enum([
    "docs_cleared",
    "transport_booked",
    "delivered",
    "released",
    "disputed",
    "cancelled",
  ]),
  note: z.string().max(240).optional(),
});

const reviewListingSchema = z.object({
  status: z.enum(["approved", "blocked", "review"]),
  note: z.string().max(240).optional(),
});

const bookingSchema = z.object({
  serviceId: z.string().min(3),
  petName: z.string().min(1).max(80),
  contactPhone: z.string().min(5).max(40),
  serviceTime: z.string().min(2).max(80),
  note: z.string().max(240).optional().default(""),
});

const bookingStatusSchema = z.object({
  status: z.enum(["confirmed", "in_service", "completed", "settled", "cancelled"]),
});

const payoutSchema = z.object({
  amount: z.number().positive().max(1000000),
  method: z.enum(["bank", "paypal", "stripe_connect"]),
  accountName: z.string().min(2).max(100),
  accountRef: z.string().min(4).max(120),
  note: z.string().max(240).optional().default(""),
});

const payoutStatusSchema = z.object({
  status: z.enum(["approved", "paid", "rejected"]),
});

const stripeConnectSchema = z.object({
  country: z.string().length(2).transform((value) => value.toUpperCase()),
});

function centsFromPrice(price) {
  return Math.round(price * 100);
}

function calculateOrderAmounts(priceCents) {
  const commissionCents = Math.round(priceCents * commissionRate);
  const serviceFeeCents = defaultServiceFeeCents;
  const sellerPayoutCents = priceCents - Math.round(priceCents * 0.015);
  const totalDueCents = priceCents + commissionCents + serviceFeeCents;
  return { commissionCents, serviceFeeCents, sellerPayoutCents, totalDueCents };
}

function formatCents(value, currency = "USD") {
  return `${currency} ${(Number(value || 0) / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function payoutAvailableCents(user) {
  const orderRows = getOrderRows({ user });
  const bookingRows = getBookingRows({ user });
  const orderAvailable = orderRows
    .filter((order) => order.status === "released")
    .reduce((sum, order) => sum + order.seller_payout_cents, 0);
  const serviceAvailable = bookingRows
    .filter((booking) => booking.status === "settled")
    .reduce((sum, booking) => sum + booking.provider_payout_cents, 0);
  const requested = db
    .prepare(`
      SELECT COALESCE(SUM(amount_cents), 0) AS total
      FROM payout_requests
      WHERE user_id = ? AND status IN ('requested', 'approved', 'paid')
    `)
    .get(user.id).total;
  return Math.max(0, orderAvailable + serviceAvailable - requested);
}

function payoutRows(user) {
  const params = {};
  const where = user.role === "admin" ? "" : "WHERE user_id = @userId";
  if (user.role !== "admin") params.userId = user.id;
  return db
    .prepare(`
      SELECT p.*, u.display_name AS user_name
      FROM payout_requests p
      JOIN users u ON u.id = p.user_id
      ${where}
      ORDER BY p.created_at DESC
      LIMIT 30
    `)
    .all(params);
}

function toPayout(row) {
  return {
    id: row.id,
    userId: row.user_id,
    userName: row.user_name,
    amount: row.amount_cents / 100,
    amountCents: row.amount_cents,
    currency: row.currency,
    method: row.method,
    accountName: row.account_name,
    accountRef: row.account_ref,
    note: row.note || "",
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function getListingRows({ status, search } = {}) {
  const clauses = [];
  const params = {};
  if (status) {
    clauses.push("l.status = @status");
    params.status = status;
  }
  if (search) {
    clauses.push(`(
      lower(l.name) LIKE @search OR
      lower(l.breed) LIKE @search OR
      lower(l.country) LIKE @search OR
      lower(u.display_name) LIKE @search
    )`);
    params.search = `%${search.toLowerCase()}%`;
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  return db
    .prepare(`
      SELECT l.*, u.display_name AS seller_name
      FROM listings l
      JOIN users u ON u.id = l.seller_id
      ${where}
      ORDER BY l.created_at DESC, l.id DESC
    `)
    .all(params);
}

function getOrderRows({ user } = {}) {
  const params = {};
  const clauses = [];
  if (user?.role === "buyer") {
    clauses.push("o.buyer_id = @userId");
    params.userId = user.id;
  }
  if (user?.role === "seller") {
    clauses.push("o.seller_id = @userId");
    params.userId = user.id;
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  return db
    .prepare(`
      SELECT
        o.*,
        l.name AS pet_name,
        l.country AS country,
        buyer.display_name AS buyer_name,
        seller.display_name AS seller_name
      FROM orders o
      JOIN listings l ON l.id = o.listing_id
      JOIN users buyer ON buyer.id = o.buyer_id
      JOIN users seller ON seller.id = o.seller_id
      ${where}
      ORDER BY o.created_at DESC
    `)
    .all(params);
}

function orderById(orderId) {
  const row = db
    .prepare(`
      SELECT
        o.*,
        l.name AS pet_name,
        l.country AS country,
        buyer.display_name AS buyer_name,
        seller.display_name AS seller_name
      FROM orders o
      JOIN listings l ON l.id = o.listing_id
      JOIN users buyer ON buyer.id = o.buyer_id
      JOIN users seller ON seller.id = o.seller_id
      WHERE o.id = ?
    `)
    .get(orderId);
  return row ? toOrder(row) : null;
}

function insertOrderEvent(orderId, actorId, eventType, note = null) {
  db.prepare(`
    INSERT INTO order_events (order_id, actor_id, event_type, note)
    VALUES (?, ?, ?, ?)
  `).run(orderId, actorId, eventType, note);
}

function markOrderEscrowFunded({ eventId, provider, orderId, paymentIntentId, payload, actorId = null, note }) {
  if (!orderId || !paymentIntentId) return false;
  const processPayment = db.transaction(() => {
    const existing = db.prepare("SELECT id FROM payment_events WHERE id = ?").get(eventId);
    if (existing) return false;
    db.prepare(`
      INSERT INTO payment_events (id, provider, payment_intent_id, event_type, payload_json)
      VALUES (?, ?, ?, 'payment_intent.succeeded', ?)
    `).run(eventId, provider, paymentIntentId, JSON.stringify(payload));
    const update = db.prepare(`
      UPDATE orders
      SET status = 'escrow_funded', payment_intent_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND status = 'payment_pending'
    `).run(paymentIntentId, orderId);
    if (update.changes === 1) {
      insertOrderEvent(orderId, actorId, "escrow_funded", note);
    }
    return update.changes === 1;
  });
  return processPayment();
}

function getServiceRows({ category, search } = {}) {
  const clauses = ["s.status = 'active'"];
  const params = {};
  if (category && category !== "all") {
    clauses.push("s.category = @category");
    params.category = category;
  }
  if (search) {
    clauses.push(`(
      lower(s.title) LIKE @search OR
      lower(s.summary) LIKE @search OR
      lower(s.city) LIKE @search OR
      lower(u.display_name) LIKE @search
    )`);
    params.search = `%${search.toLowerCase()}%`;
  }
  return db
    .prepare(`
      SELECT s.*, u.display_name AS provider_name
      FROM services s
      JOIN users u ON u.id = s.provider_id
      WHERE ${clauses.join(" AND ")}
      ORDER BY s.created_at DESC, s.id DESC
    `)
    .all(params);
}

function getBookingRows({ user } = {}) {
  const clauses = [];
  const params = {};
  if (user?.role === "buyer") {
    clauses.push("b.buyer_id = @userId");
    params.userId = user.id;
  }
  if (user?.role === "seller") {
    clauses.push("b.provider_id = @userId");
    params.userId = user.id;
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  return db
    .prepare(`
      SELECT
        b.*,
        s.title AS service_title,
        buyer.display_name AS buyer_name,
        provider.display_name AS provider_name
      FROM service_bookings b
      JOIN services s ON s.id = b.service_id
      JOIN users buyer ON buyer.id = b.buyer_id
      JOIN users provider ON provider.id = b.provider_id
      ${where}
      ORDER BY b.created_at DESC
    `)
    .all(params);
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "pet-global",
    paymentProvider,
    stripeConfigured: isStripeConfigured(),
    mockPaymentMode: paymentProvider === "mock",
  });
});

app.get("/api/config", (_req, res) => {
  res.json({
    i18n: i18nRuntimeConfig,
    payments: {
      provider: paymentProvider,
      stripeConfigured: isStripeConfigured(),
    },
  });
});

app.post("/api/auth/register", (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(validationError(req, parsed.error));

  try {
    const result = db
      .prepare(`
        INSERT INTO users (email, password_hash, role, display_name, country, kyc_status)
        VALUES (?, ?, ?, ?, ?, 'pending')
      `)
      .run(
        parsed.data.email.toLowerCase(),
        hashPassword(parsed.data.password),
        parsed.data.role,
        parsed.data.displayName,
        parsed.data.country,
      );
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid);
    const token = createSession(user);
    setSessionCookie(res, token);
    res.status(201).json({ user: publicUser(user), token });
  } catch (error) {
    if (String(error.message).includes("UNIQUE")) {
      return res.status(409).json({ error: tt(req, "email_registered") });
    }
    throw error;
  }
});

app.post("/api/auth/login", (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(validationError(req, parsed.error));

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(parsed.data.email.toLowerCase());
  if (!user || !verifyPassword(parsed.data.password, user.password_hash)) {
    return res.status(401).json({ error: tt(req, "invalid_login") });
  }
  const token = createSession(user);
  setSessionCookie(res, token);
  res.json({ user: publicUser(user), token });
});

app.post("/api/auth/logout", (_req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

app.get("/api/listings", (req, res) => {
  const rows = getListingRows({
    status: req.query.all === "true" ? undefined : "approved",
    search: req.query.search,
  });
  res.json({ listings: rows.map(toListing) });
});

app.get("/api/services", (req, res) => {
  const rows = getServiceRows({
    category: req.query.category,
    search: req.query.search,
  });
  res.json({ services: rows.map(toService).map((service) => localizeService(service, req)) });
});

app.post("/api/service-bookings", requireAuth, requireRole("buyer", "admin"), (req, res) => {
  const parsed = bookingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(validationError(req, parsed.error));

  const service = db.prepare("SELECT * FROM services WHERE id = ? AND status = 'active'").get(parsed.data.serviceId);
  if (!service) return res.status(404).json({ error: tt(req, "service_not_found") });
  if (service.provider_id === req.user.id) {
    return res.status(409).json({ error: tt(req, "service_self_booking") });
  }

  const bookingId = `BK-${nanoid(9).toUpperCase()}`;
  const commissionCents = Math.round(service.price_cents * 0.1);
  const providerPayoutCents = service.price_cents - commissionCents;
  db.prepare(`
    INSERT INTO service_bookings (
      id, service_id, buyer_id, provider_id, pet_name, contact_phone, service_time,
      note, amount_cents, commission_cents, provider_payout_cents, currency, status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'requested')
  `).run(
    bookingId,
    service.id,
    req.user.id,
    service.provider_id,
    parsed.data.petName,
    parsed.data.contactPhone,
    parsed.data.serviceTime,
    parsed.data.note,
    service.price_cents,
    commissionCents,
    providerPayoutCents,
    service.currency,
  );

  db.prepare(`
    INSERT INTO messages (id, user_id, role_scope, title, body, kind)
    VALUES (?, ?, 'buyer', ?, ?, 'service')
  `).run(
    `MSG-${nanoid(9).toUpperCase()}`,
    req.user.id,
    tt(req, "booking_submitted_title"),
    tt(req, "booking_submitted_body", parsed.data.petName, serviceText[service.id]?.[requestLang(req)]?.title || service.title),
  );

  res.status(201).json({ booking: localizeBooking(toBooking(getBookingRows({ user: req.user })[0]), req) });
});

app.get("/api/service-bookings", requireAuth, (req, res) => {
  res.json({ bookings: getBookingRows({ user: req.user }).map(toBooking).map((booking) => localizeBooking(booking, req)) });
});

app.patch("/api/service-bookings/:id/status", requireAuth, requireRole("seller", "admin"), (req, res) => {
  const parsed = bookingStatusSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(validationError(req, parsed.error));

  const booking = db.prepare("SELECT * FROM service_bookings WHERE id = ?").get(req.params.id);
  if (!booking) return res.status(404).json({ error: tt(req, "booking_not_found") });
  if (req.user.role !== "admin" && booking.provider_id !== req.user.id) {
    return res.status(403).json({ error: tt(req, "permission_denied") });
  }
  db.prepare("UPDATE service_bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .run(parsed.data.status, booking.id);
  const row = getBookingRows({ user: req.user }).find((item) => item.id === booking.id);
  res.json({ booking: localizeBooking(toBooking(row), req) });
});

app.post("/api/listings", requireAuth, requireRole("seller", "admin"), (req, res) => {
  const parsed = listingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(validationError(req, parsed.error));

  const id = `PG-${nanoid(8).toUpperCase()}`;
  db.prepare(`
    INSERT INTO listings (
      id, seller_id, name, species, breed, age, country, price_cents, currency,
      image, docs_json, route, status, risk
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'USD', ?, ?, ?, 'review', 'medium')
  `).run(
    id,
    req.user.id,
    parsed.data.name,
    parsed.data.species,
    parsed.data.breed,
    parsed.data.age,
    parsed.data.country,
    centsFromPrice(parsed.data.price),
    parsed.data.image,
    JSON.stringify(parsed.data.docs),
    parsed.data.route,
  );

  const row = getListingRows({ search: id })[0];
  res.status(201).json({ listing: toListing(row) });
});

app.post("/api/orders", requireAuth, requireRole("buyer", "admin"), async (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(validationError(req, parsed.error));

  const listing = db.prepare("SELECT * FROM listings WHERE id = ?").get(parsed.data.listingId);
  if (!listing) return res.status(404).json({ error: tt(req, "listing_not_found") });
  if (listing.status !== "approved") {
    return res.status(409).json({ error: tt(req, "listing_not_approved") });
  }
  if (listing.seller_id === req.user.id) {
    return res.status(409).json({ error: tt(req, "listing_self_buy") });
  }
  if (!parsed.data.kycConfirmed) {
    return res.status(400).json(validationError(req, { flatten: () => ({ fieldErrors: { kycConfirmed: ["Required"] } }) }));
  }

  const orderId = `TX-${nanoid(9).toUpperCase()}`;
  const amounts = calculateOrderAmounts(listing.price_cents);
  const payment = paymentProvider === "mock"
    ? createPaymentIntent({
        orderId,
        amountCents: amounts.totalDueCents,
        currency: listing.currency,
      })
    : {
        provider: "stripe",
        paymentIntentId: null,
        checkoutSessionId: null,
      };

  const createPendingOrder = db.transaction(() => {
    const lock = db
      .prepare("UPDATE listings SET status = 'sold' WHERE id = ? AND status = 'approved'")
      .run(listing.id);
    if (lock.changes !== 1) {
      throw new Error("LISTING_LOCKED");
    }
    db.prepare(`
      INSERT INTO orders (
        id, listing_id, buyer_id, seller_id, amount_cents, commission_cents,
        service_fee_cents, seller_payout_cents, currency, status,
        payment_provider, payment_intent_id, contact_name, contact_phone,
        destination_country, destination_city, delivery_address, import_permit,
        transport_option, buyer_note, kyc_confirmed, total_due_cents, protection_days,
        checkout_session_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'payment_pending', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 7, ?)
    `).run(
      orderId,
      listing.id,
      req.user.id,
      listing.seller_id,
      listing.price_cents,
      amounts.commissionCents,
      amounts.serviceFeeCents,
      amounts.sellerPayoutCents,
      listing.currency,
      payment.provider,
      payment.paymentIntentId,
      parsed.data.contactName,
      parsed.data.contactPhone,
      parsed.data.destinationCountry,
      parsed.data.destinationCity,
      parsed.data.deliveryAddress,
      parsed.data.importPermit,
      parsed.data.transportOption,
      parsed.data.buyerNote,
      parsed.data.kycConfirmed ? 1 : 0,
      amounts.totalDueCents,
      payment.checkoutSessionId || null,
    );
    insertOrderEvent(orderId, req.user.id, "order_created", "Checkout submitted and pet inventory locked");
    db.prepare(`
      INSERT INTO messages (id, user_id, role_scope, title, body, kind)
      VALUES (?, ?, 'buyer', ?, ?, 'order')
    `).run(
      `MSG-${nanoid(9).toUpperCase()}`,
      req.user.id,
      tt(req, "order_submitted_title"),
      tt(req, "order_submitted_body", listing.name, orderId),
    );
  });
  try {
    createPendingOrder();
  } catch (error) {
    if (error.message === "LISTING_LOCKED") {
      return res.status(409).json({ error: tt(req, "listing_already_locked") });
    }
    throw error;
  }

  if (paymentProvider === "stripe") {
    try {
      const stripePayment = await createStripeCheckoutSession({
        orderId,
        listing,
        buyer: req.user,
        amounts,
        successUrl: publicAppUrl,
        cancelUrl: publicAppUrl,
      });
      db.prepare(`
        UPDATE orders
        SET payment_intent_id = ?, checkout_session_id = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(stripePayment.paymentIntentId, stripePayment.checkoutSessionId, orderId);
      return res.status(201).json({ order: orderById(orderId), payment: stripePayment });
    } catch (error) {
      const rollbackOrder = db.transaction(() => {
        db.prepare("UPDATE orders SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = ?")
          .run(orderId);
        db.prepare("UPDATE listings SET status = 'approved' WHERE id = ? AND status = 'sold'")
          .run(listing.id);
        insertOrderEvent(orderId, req.user.id, "payment_session_failed", error.message.slice(0, 240));
      });
      rollbackOrder();
      throw error;
    }
  }

  res.status(201).json({ order: orderById(orderId), payment });
});

app.get("/api/orders", requireAuth, (req, res) => {
  res.json({ orders: getOrderRows({ user: req.user }).map(toOrder) });
});

app.post("/api/orders/:id/pay", requireAuth, async (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!order) return res.status(404).json({ error: tt(req, "order_not_found") });
  if (req.user.role !== "admin" && req.user.id !== order.buyer_id) {
    return res.status(403).json({ error: tt(req, "permission_denied") });
  }
  if (order.status !== "payment_pending") {
    return res.status(409).json({ error: tt(req, "order_payment_not_pending") });
  }
  if (order.payment_provider === "stripe" && order.checkout_session_id) {
    const session = await retrieveStripeCheckoutSession(order.checkout_session_id);
    return res.json({
      payment: {
        provider: "stripe",
        orderId: order.id,
        checkoutSessionId: session.id,
        paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : order.payment_intent_id,
        checkoutUrl: session.url,
        status: session.payment_status || session.status,
      },
    });
  }
  const event = confirmPaymentIntent(order.payment_intent_id);
  markOrderEscrowFunded({
    eventId: event.eventId,
    provider: event.provider,
    orderId: order.id,
    paymentIntentId: event.paymentIntentId,
    payload: event,
    actorId: req.user.id,
    note: "Mock payment confirmed",
  });
  res.json({ order: orderById(order.id), payment: event });
});

app.get("/api/messages", requireAuth, (req, res) => {
  const rows = db
    .prepare(`
      SELECT *
      FROM messages
      WHERE user_id = @userId OR role_scope = @role OR role_scope = 'all'
      ORDER BY created_at DESC
      LIMIT 30
    `)
    .all({ userId: req.user.id, role: req.user.role });
  res.json({ messages: rows.map(toMessage).map((message) => localizeMessage(message, req)) });
});

app.get("/api/wallet", requireAuth, requireRole("seller", "admin"), (req, res) => {
  const orderRows = getOrderRows({ user: req.user });
  const bookingRows = getBookingRows({ user: req.user });
  const available = req.user.role === "admin" ? 0 : payoutAvailableCents(req.user);
  const orderPending = orderRows
    .filter((order) => ["escrow_funded", "docs_cleared", "transport_booked", "delivered"].includes(order.status))
    .reduce((sum, order) => sum + order.seller_payout_cents, 0);
  const servicePending = bookingRows
    .filter((booking) => ["confirmed", "in_service", "completed"].includes(booking.status))
    .reduce((sum, booking) => sum + booking.provider_payout_cents, 0);
  const settled = bookingRows
    .filter((booking) => booking.status === "settled")
    .reduce((sum, booking) => sum + booking.provider_payout_cents, 0);
  res.json({
    wallet: {
      pending: (orderPending + servicePending) / 100,
      available: available / 100,
      settled: settled / 100,
      currency: "USD",
      items: [
        ...orderRows.map(toOrder).map((order) => ({
          id: order.id,
          type: "pet-trade",
          title: order.pet,
          amount: order.sellerPayout,
          status: order.status,
        })),
        ...bookingRows.map(toBooking).map((booking) => ({
          id: booking.id,
          type: "service",
          title: localizeBooking(booking, req).serviceTitle,
          amount: booking.providerPayout,
          status: booking.status,
        })),
      ],
      payouts: payoutRows(req.user).map(toPayout),
    },
  });
});

app.get("/api/payouts", requireAuth, requireRole("seller", "admin"), (req, res) => {
  res.json({ payouts: payoutRows(req.user).map(toPayout), available: payoutAvailableCents(req.user) / 100 });
});

app.post("/api/payouts", requireAuth, requireRole("seller"), (req, res) => {
  const parsed = payoutSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(validationError(req, parsed.error));

  const amountCents = centsFromPrice(parsed.data.amount);
  const available = payoutAvailableCents(req.user);
  if (amountCents > available) {
    return res.status(409).json({ error: tt(req, "payout_amount_invalid") });
  }

  const payoutId = `PO-${nanoid(9).toUpperCase()}`;
  db.prepare(`
    INSERT INTO payout_requests (
      id, user_id, amount_cents, currency, method, account_name, account_ref, note, status
    )
    VALUES (?, ?, ?, 'USD', ?, ?, ?, ?, 'requested')
  `).run(
    payoutId,
    req.user.id,
    amountCents,
    parsed.data.method,
    parsed.data.accountName,
    parsed.data.accountRef,
    parsed.data.note,
  );
  db.prepare(`
    INSERT INTO messages (id, user_id, role_scope, title, body, kind)
    VALUES (?, ?, 'seller', ?, ?, 'settlement')
  `).run(
    `MSG-${nanoid(9).toUpperCase()}`,
    req.user.id,
    tt(req, "payout_requested_title"),
    tt(req, "payout_requested_body", formatCents(amountCents)),
  );
  res.status(201).json({ payout: toPayout(payoutRows(req.user)[0]), available: payoutAvailableCents(req.user) / 100 });
});

app.post("/api/seller/stripe-connect", requireAuth, requireRole("seller"), async (req, res) => {
  if (!isStripeConfigured()) {
    return res.status(409).json({ error: "Stripe is not configured on this backend" });
  }
  const parsed = stripeConnectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(validationError(req, parsed.error));

  let account = db
    .prepare("SELECT * FROM seller_payment_accounts WHERE user_id = ? AND provider = 'stripe'")
    .get(req.user.id);
  if (!account) {
    const stripeAccount = await createStripeConnectAccount({
      user: req.user,
      country: parsed.data.country,
    });
    db.prepare(`
      INSERT INTO seller_payment_accounts (user_id, provider, provider_account_id, status, country)
      VALUES (?, 'stripe', ?, 'onboarding', ?)
    `).run(req.user.id, stripeAccount.id, parsed.data.country);
    account = db
      .prepare("SELECT * FROM seller_payment_accounts WHERE user_id = ? AND provider = 'stripe'")
      .get(req.user.id);
  }

  const link = await createStripeAccountLink({
    accountId: account.provider_account_id,
    refreshUrl: `${publicAppUrl}?stripe_connect=refresh`,
    returnUrl: `${publicAppUrl}?stripe_connect=return`,
  });
  res.json({
    account: {
      provider: "stripe",
      accountId: account.provider_account_id,
      status: account.status,
      country: account.country,
    },
    onboardingUrl: link.url,
  });
});

app.patch("/api/admin/payouts/:id/status", requireAuth, requireRole("admin"), async (req, res) => {
  const parsed = payoutStatusSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(validationError(req, parsed.error));

  const row = db.prepare("SELECT * FROM payout_requests WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: tt(req, "payout_not_found") });
  let transfer = null;
  if (parsed.data.status === "paid" && row.method === "stripe_connect" && isStripeConfigured()) {
    const account = db
      .prepare("SELECT * FROM seller_payment_accounts WHERE user_id = ? AND provider = 'stripe'")
      .get(row.user_id);
    const destination = account?.provider_account_id || row.account_ref;
    transfer = await createStripeTransfer({
      payoutId: row.id,
      amountCents: row.amount_cents,
      currency: row.currency,
      destination,
      transferGroup: row.id,
    });
    db.prepare(`
      UPDATE payout_requests
      SET provider_transfer_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(transfer.id, row.id);
  }
  db.prepare("UPDATE payout_requests SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .run(parsed.data.status, req.params.id);
  const payout = payoutRows(req.user).find((item) => item.id === req.params.id);
  res.json({ payout: toPayout(payout), transfer });
});

app.post("/api/orders/:id/mock-confirm-payment", requireAuth, (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!order) return res.status(404).json({ error: tt(req, "order_not_found") });
  if (req.user.role !== "admin" && req.user.id !== order.buyer_id) {
    return res.status(403).json({ error: tt(req, "permission_denied") });
  }
  if (order.status !== "payment_pending") {
    return res.status(409).json({ error: tt(req, "order_payment_not_pending") });
  }

  const event = confirmPaymentIntent(order.payment_intent_id);
  markOrderEscrowFunded({
    eventId: event.eventId,
    provider: event.provider,
    orderId: order.id,
    paymentIntentId: event.paymentIntentId,
    payload: event,
    actorId: req.user.id,
    note: "Mock payment confirmed",
  });

  res.json({ order: orderById(order.id), payment: event });
});

app.patch("/api/orders/:id/status", requireAuth, requireRole("admin"), (req, res) => {
  const parsed = advanceOrderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(validationError(req, parsed.error));

  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!order) return res.status(404).json({ error: tt(req, "order_not_found") });

  const updateOrder = db.transaction(() => {
    db.prepare(`
      UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).run(parsed.data.status, order.id);
    if (parsed.data.status === "cancelled") {
      db.prepare("UPDATE listings SET status = 'approved' WHERE id = ? AND status = 'sold'")
        .run(order.listing_id);
    }
    insertOrderEvent(order.id, req.user.id, `status_${parsed.data.status}`, parsed.data.note || null);
  });
  updateOrder();
  res.json({ order: orderById(order.id) });
});

app.get("/api/admin/overview", requireAuth, requireRole("admin"), (_req, res) => {
  const listings = getListingRows({}).map(toListing);
  const orders = getOrderRows({}).map(toOrder);
  const bookings = getBookingRows({}).map(toBooking);
  const totalFees = orders.reduce((sum, order) => sum + Math.round(order.fee * 100), 0);
  const serviceFees = bookings.reduce((sum, booking) => sum + Math.round(booking.commission * 100), 0);
  const gmv = orders.reduce((sum, order) => sum + order.amountCents, 0);
  res.json({
    metrics: {
      listings: listings.length,
      orders: orders.length,
      bookings: bookings.length,
      gmv: (gmv + bookings.reduce((sum, booking) => sum + Math.round(booking.amount * 100), 0)) / 100,
      fees: (totalFees + serviceFees) / 100,
      compliancePassRate: 96.4,
    },
    listings,
    orders,
    bookings,
    riskQueue: listings.filter((listing) => listing.risk !== "low" || listing.status === "review"),
  });
});

app.patch("/api/admin/listings/:id/review", requireAuth, requireRole("admin"), (req, res) => {
  const parsed = reviewListingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(validationError(req, parsed.error));

  const listing = db.prepare("SELECT * FROM listings WHERE id = ?").get(req.params.id);
  if (!listing) return res.status(404).json({ error: tt(req, "listing_not_found") });
  db.prepare("UPDATE listings SET status = ?, risk = CASE WHEN ? = 'approved' THEN 'low' ELSE risk END WHERE id = ?")
    .run(parsed.data.status, parsed.data.status, req.params.id);
  res.json({ listing: toListing(getListingRows({ search: req.params.id })[0]) });
});

app.use((error, req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: tt(req, "internal_error") });
});

app.listen(port, () => {
  console.log(`PetGlobal backend running at http://127.0.0.1:${port}`);
});
