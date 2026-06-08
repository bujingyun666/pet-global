import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const dbPath = path.resolve(projectRoot, process.env.DATABASE_PATH || "./data/petglobal.sqlite");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('buyer', 'seller', 'admin')),
      display_name TEXT NOT NULL,
      country TEXT NOT NULL,
      kyc_status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      seller_id INTEGER NOT NULL REFERENCES users(id),
      name TEXT NOT NULL,
      species TEXT NOT NULL,
      breed TEXT NOT NULL,
      age TEXT NOT NULL,
      country TEXT NOT NULL,
      price_cents INTEGER NOT NULL CHECK (price_cents > 0),
      currency TEXT NOT NULL DEFAULT 'USD',
      image TEXT NOT NULL,
      docs_json TEXT NOT NULL,
      route TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('draft', 'review', 'approved', 'blocked', 'sold')),
      risk TEXT NOT NULL CHECK (risk IN ('low', 'medium', 'high')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL REFERENCES listings(id),
      buyer_id INTEGER NOT NULL REFERENCES users(id),
      seller_id INTEGER NOT NULL REFERENCES users(id),
      amount_cents INTEGER NOT NULL,
      commission_cents INTEGER NOT NULL,
      service_fee_cents INTEGER NOT NULL,
      seller_payout_cents INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'USD',
      status TEXT NOT NULL CHECK (
        status IN (
          'draft',
          'payment_pending',
          'escrow_funded',
          'docs_cleared',
          'transport_booked',
          'delivered',
          'released',
          'disputed',
          'cancelled'
        )
      ),
      payment_provider TEXT,
      payment_intent_id TEXT UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS payment_events (
      id TEXT PRIMARY KEY,
      provider TEXT NOT NULL,
      payment_intent_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      processed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL REFERENCES orders(id),
      actor_id INTEGER REFERENCES users(id),
      event_type TEXT NOT NULL,
      note TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      provider_id INTEGER NOT NULL REFERENCES users(id),
      title TEXT NOT NULL,
      category TEXT NOT NULL CHECK (category IN ('boarding', 'grooming', 'feeding', 'pickup', 'training', 'nursing')),
      summary TEXT NOT NULL,
      city TEXT NOT NULL,
      price_cents INTEGER NOT NULL CHECK (price_cents > 0),
      currency TEXT NOT NULL DEFAULT 'USD',
      image TEXT NOT NULL,
      tags_json TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('active', 'review', 'paused')) DEFAULT 'active',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS service_bookings (
      id TEXT PRIMARY KEY,
      service_id TEXT NOT NULL REFERENCES services(id),
      buyer_id INTEGER NOT NULL REFERENCES users(id),
      provider_id INTEGER NOT NULL REFERENCES users(id),
      pet_name TEXT NOT NULL,
      contact_phone TEXT NOT NULL,
      service_time TEXT NOT NULL,
      note TEXT,
      amount_cents INTEGER NOT NULL,
      commission_cents INTEGER NOT NULL,
      provider_payout_cents INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'USD',
      status TEXT NOT NULL CHECK (
        status IN ('requested', 'confirmed', 'in_service', 'completed', 'settled', 'cancelled')
      ),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      role_scope TEXT NOT NULL CHECK (role_scope IN ('buyer', 'seller', 'admin', 'all')),
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      kind TEXT NOT NULL CHECK (kind IN ('system', 'order', 'service', 'support', 'settlement')),
      is_read INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS payout_requests (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
      currency TEXT NOT NULL DEFAULT 'USD',
      method TEXT NOT NULL CHECK (method IN ('bank', 'paypal', 'stripe_connect')),
      account_name TEXT NOT NULL,
      account_ref TEXT NOT NULL,
      note TEXT,
      status TEXT NOT NULL CHECK (status IN ('requested', 'approved', 'paid', 'rejected')) DEFAULT 'requested',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS seller_payment_accounts (
      user_id INTEGER PRIMARY KEY REFERENCES users(id),
      provider TEXT NOT NULL,
      provider_account_id TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'onboarding',
      country TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  runMigrations();
  seedDefaults();
}

function hasColumn(table, column) {
  return db.prepare(`PRAGMA table_info(${table})`).all().some((item) => item.name === column);
}

function ensureColumn(table, column, definition) {
  if (!hasColumn(table, column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

function runMigrations() {
  ensureColumn("orders", "contact_name", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("orders", "contact_phone", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("orders", "destination_country", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("orders", "destination_city", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("orders", "delivery_address", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("orders", "import_permit", "TEXT NOT NULL DEFAULT 'buyer_confirmed'");
  ensureColumn("orders", "transport_option", "TEXT NOT NULL DEFAULT 'platform_partner'");
  ensureColumn("orders", "buyer_note", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("orders", "kyc_confirmed", "INTEGER NOT NULL DEFAULT 0");
  ensureColumn("orders", "total_due_cents", "INTEGER NOT NULL DEFAULT 0");
  ensureColumn("orders", "protection_days", "INTEGER NOT NULL DEFAULT 7");
  ensureColumn("orders", "checkout_session_id", "TEXT");
  ensureColumn("payout_requests", "provider_transfer_id", "TEXT");
  ensureColumn("listings", "export_country", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("listings", "import_country", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("listings", "microchip_id", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("listings", "seller_legal_name", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("listings", "seller_id_type", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("listings", "seller_id_last4", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("listings", "files_json", "TEXT NOT NULL DEFAULT '{}'");
  ensureColumn("listings", "review_note", "TEXT NOT NULL DEFAULT ''");
  ensureColumn("listings", "compliance_status", "TEXT NOT NULL DEFAULT 'pending'");

  db.prepare(`
    UPDATE orders
    SET total_due_cents = amount_cents + commission_cents + service_fee_cents
    WHERE total_due_cents = 0
  `).run();
}

function seedDefaults() {
  const userCount = db.prepare("SELECT COUNT(*) AS count FROM users").get().count;
  if (!userCount) {
    const insertUser = db.prepare(`
      INSERT INTO users (email, password_hash, role, display_name, country, kyc_status)
      VALUES (@email, @passwordHash, @role, @displayName, @country, @kycStatus)
    `);
    const passwordHash = bcrypt.hashSync("petglobal2026", 10);
    [
      ["buyer@petglobal.test", "buyer", "Demo Buyer", "United States", "verified"],
      ["seller@petglobal.test", "seller", "Kiwi Hills Kennel", "New Zealand", "verified"],
      ["admin@petglobal.test", "admin", "Platform Admin", "Singapore", "verified"],
    ].forEach(([email, role, displayName, country, kycStatus]) => {
      insertUser.run({ email, passwordHash, role, displayName, country, kycStatus });
    });
  }

  const seller = db.prepare("SELECT id FROM users WHERE role = 'seller' LIMIT 1").get();
  const listingCount = db.prepare("SELECT COUNT(*) AS count FROM listings").get().count;
  if (!listingCount) {
    const insertListing = db.prepare(`
      INSERT INTO listings (
        id, seller_id, name, species, breed, age, country, price_cents, currency,
        image, docs_json, route, status, risk
      )
      VALUES (
        @id, @sellerId, @name, @species, @breed, @age, @country, @priceCents,
        @currency, @image, @docsJson, @route, @status, @risk
      )
    `);

    [
      {
        id: "PG-24071",
        name: "Luna",
        species: "Dog",
        breed: "Border Collie",
        age: "14 months",
        country: "New Zealand",
        priceCents: 240000,
        image: "/assets/dog.jpg",
        docs: ["Microchip", "Rabies", "Health cert"],
        route: "Auckland -> Singapore -> Los Angeles",
        status: "approved",
        risk: "low",
      },
      {
        id: "PG-24082",
        name: "Mochi",
        species: "Cat",
        breed: "British Shorthair",
        age: "9 months",
        country: "Japan",
        priceCents: 185000,
        image: "/assets/cat.jpg",
        docs: ["Microchip", "Vaccine", "Pedigree"],
        route: "Tokyo -> Frankfurt -> Paris",
        status: "approved",
        risk: "low",
      },
      {
        id: "PG-24096",
        name: "Pepper",
        species: "Small mammal",
        breed: "Mini Lop Rabbit",
        age: "7 months",
        country: "Netherlands",
        priceCents: 62000,
        image: "/assets/rabbit.jpg",
        docs: ["Health cert", "Seller ID"],
        route: "Amsterdam -> Madrid",
        status: "review",
        risk: "medium",
      },
      {
        id: "PG-24103",
        name: "Sunny",
        species: "Bird",
        breed: "Cockatiel",
        age: "11 months",
        country: "Australia",
        priceCents: 78000,
        image: "/assets/cockatiel.jpg",
        docs: ["CITES screen", "Health cert", "Seller ID"],
        route: "Sydney -> Hong Kong -> Seoul",
        status: "review",
        risk: "medium",
      },
      {
        id: "PG-24114",
        name: "Atlas",
        species: "Equine",
        breed: "Andalusian Horse",
        age: "4 years",
        country: "Spain",
        priceCents: 1580000,
        image: "/assets/horse.jpg",
        docs: ["Passport", "Vet exam", "Export permit"],
        route: "Madrid -> Doha -> Miami",
        status: "approved",
        risk: "low",
      },
      {
        id: "PG-24121",
        name: "Echo",
        species: "Reptile",
        breed: "Leopard Gecko",
        age: "10 months",
        country: "United States",
        priceCents: 42000,
        image: "/assets/hero.png",
        docs: ["Health cert", "Seller ID", "Import screen"],
        route: "Phoenix -> Los Angeles",
        status: "review",
        risk: "medium",
      },
      {
        id: "PG-24127",
        name: "Nami",
        species: "Aquatic",
        breed: "Koi Carp",
        age: "18 months",
        country: "Japan",
        priceCents: 96000,
        image: "/assets/carecat.png",
        docs: ["Aquatic health cert", "Seller ID"],
        route: "Osaka -> Honolulu -> San Francisco",
        status: "approved",
        risk: "low",
      },
      {
        id: "PG-24132",
        name: "Clover",
        species: "Farm animal",
        breed: "Nigerian Dwarf Goat",
        age: "8 months",
        country: "Ireland",
        priceCents: 130000,
        image: "/assets/golden.png",
        docs: ["Vet exam", "Movement permit", "Seller ID"],
        route: "Dublin -> London -> Boston",
        status: "review",
        risk: "medium",
      },
    ].forEach((listing) => {
      insertListing.run({
        ...listing,
        sellerId: seller.id,
        currency: "USD",
        docsJson: JSON.stringify(listing.docs),
      });
    });
  }

  const serviceCount = db.prepare("SELECT COUNT(*) AS count FROM services").get().count;
  if (!serviceCount) {
    const insertService = db.prepare(`
      INSERT INTO services (
        id, provider_id, title, category, summary, city, price_cents, currency,
        image, tags_json, status
      )
      VALUES (
        @id, @providerId, @title, @category, @summary, @city, @priceCents,
        'USD', @image, @tagsJson, 'active'
      )
    `);
    [
      {
        id: "SV-FEED-001",
        title: "上门投喂与饮水巡检",
        category: "feeding",
        summary: "按次上门，拍照回传食盆、水碗、排便和门窗状态。",
        city: "Shanghai",
        priceCents: 3500,
        image: "/assets/carecat.png",
        tags: ["实时记录", "可回放", "2小时响应"],
      },
      {
        id: "SV-WASH-001",
        title: "洗护美容到店预约",
        category: "grooming",
        summary: "洗澡、修毛、耳道护理和基础皮肤检查。",
        city: "Singapore",
        priceCents: 8800,
        image: "/assets/wash.png",
        tags: ["认证门店", "保险覆盖", "可预约"],
      },
      {
        id: "SV-CARE-001",
        title: "短期寄养与健康看护",
        category: "boarding",
        summary: "寄养前确认疫苗、性格、饮食禁忌，日更照护记录。",
        city: "Los Angeles",
        priceCents: 4600,
        image: "/assets/hero.png",
        tags: ["健康档案", "日更记录", "托管付款"],
      },
      {
        id: "SV-PICK-001",
        title: "跨城接送与交接拍摄",
        category: "pickup",
        summary: "运输箱编号、芯片核对、交接视频和到达提醒。",
        city: "Tokyo",
        priceCents: 12000,
        image: "/assets/golden.png",
        tags: ["交接视频", "芯片核对", "路线跟踪"],
      },
    ].forEach((service) => {
      insertService.run({
        ...service,
        providerId: seller.id,
        tagsJson: JSON.stringify(service.tags),
      });
    });
  }

  const messageCount = db.prepare("SELECT COUNT(*) AS count FROM messages").get().count;
  if (!messageCount) {
    const insertMessage = db.prepare(`
      INSERT INTO messages (id, user_id, role_scope, title, body, kind)
      VALUES (@id, @userId, @roleScope, @title, @body, @kind)
    `);
    [
      {
        id: "MSG-WELCOME",
        userId: null,
        roleScope: "all",
        title: "欢迎来到 PetGlobal",
        body: "交易、投喂预约、健康档案、售后和监管消息会集中显示在这里。",
        kind: "system",
      },
      {
        id: "MSG-ORDER-GUARD",
        userId: null,
        roleScope: "buyer",
        title: "收宠验收提醒",
        body: "收宠时请拍完整开箱视频，并核对芯片编号和健康档案。",
        kind: "order",
      },
      {
        id: "MSG-SETTLEMENT",
        userId: null,
        roleScope: "seller",
        title: "结算规则",
        body: "低风险订单在保障期结束并通过复核后进入自动结算队列。",
        kind: "settlement",
      },
    ].forEach((message) => insertMessage.run(message));
  }
}

export function toListing(row) {
  return {
    id: row.id,
    sellerId: row.seller_id,
    seller: row.seller_name,
    name: row.name,
    species: row.species,
    breed: row.breed,
    age: row.age,
    country: row.country,
    price: row.price_cents / 100,
    priceCents: row.price_cents,
    currency: row.currency,
    image: row.image,
    docs: JSON.parse(row.docs_json),
    route: row.route,
    exportCountry: row.export_country || row.country,
    importCountry: row.import_country || "",
    microchipId: row.microchip_id || "",
    sellerLegalName: row.seller_legal_name || "",
    sellerIdType: row.seller_id_type || "",
    sellerIdLast4: row.seller_id_last4 || "",
    files: JSON.parse(row.files_json || "{}"),
    reviewNote: row.review_note || "",
    complianceStatus: row.compliance_status || "pending",
    status: row.status,
    risk: row.risk,
  };
}

export function toOrder(row) {
  return {
    id: row.id,
    listingId: row.listing_id,
    pet: row.pet_name,
    buyer: row.buyer_name,
    seller: row.seller_name,
    country: row.country,
    amount: row.amount_cents / 100,
    amountCents: row.amount_cents,
    fee: (row.commission_cents + row.service_fee_cents) / 100,
    commission: row.commission_cents / 100,
    serviceFee: row.service_fee_cents / 100,
    totalDue: (row.total_due_cents || row.amount_cents + row.commission_cents + row.service_fee_cents) / 100,
    totalDueCents: row.total_due_cents || row.amount_cents + row.commission_cents + row.service_fee_cents,
    sellerPayout: row.seller_payout_cents / 100,
    currency: row.currency,
    contactName: row.contact_name || "",
    contactPhone: row.contact_phone || "",
    destinationCountry: row.destination_country || "",
    destinationCity: row.destination_city || "",
    deliveryAddress: row.delivery_address || "",
    importPermit: row.import_permit || "",
    transportOption: row.transport_option || "",
    buyerNote: row.buyer_note || "",
    kycConfirmed: Boolean(row.kyc_confirmed),
    protectionDays: row.protection_days || 7,
    status: row.status,
    paymentProvider: row.payment_provider,
    paymentIntentId: row.payment_intent_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toService(row) {
  return {
    id: row.id,
    providerId: row.provider_id,
    provider: row.provider_name,
    title: row.title,
    category: row.category,
    summary: row.summary,
    city: row.city,
    price: row.price_cents / 100,
    priceCents: row.price_cents,
    currency: row.currency,
    image: row.image,
    tags: JSON.parse(row.tags_json),
    status: row.status,
  };
}

export function toBooking(row) {
  return {
    id: row.id,
    serviceId: row.service_id,
    serviceTitle: row.service_title,
    buyer: row.buyer_name,
    provider: row.provider_name,
    petName: row.pet_name,
    contactPhone: row.contact_phone,
    serviceTime: row.service_time,
    note: row.note,
    amount: row.amount_cents / 100,
    commission: row.commission_cents / 100,
    providerPayout: row.provider_payout_cents / 100,
    currency: row.currency,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toMessage(row) {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    kind: row.kind,
    isRead: Boolean(row.is_read),
    createdAt: row.created_at,
  };
}
