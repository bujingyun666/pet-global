const rates = {
  USD: 1,
  EUR: 0.92,
  CNY: 7.24,
  JPY: 156.8,
};

const i18nConfig = {
  enabled: true,
  defaultLang: "en",
};

const runtimeConfig = window.PETGLOBAL_CONFIG || {};
const apiBaseUrl = String(runtimeConfig.apiBaseUrl || "").replace(/\/$/, "");

function apiUrl(path) {
  return `${apiBaseUrl}${path}`;
}

const i18nLang = {
  zh: {
    email: "邮箱",
    password: "密码",
    account_type: "账户类型",
    buyer: "买家",
    seller: "卖家",
    admin: "平台运营",
    visitor: "访客",
    login_workspace: "登录交易台",
    escrow_trade: "托管交易",
    commission_profit: "手续费盈利",
    compliance_review: "合规审查",
    market: "市场",
    services: "投喂",
    bookings: "预约",
    transactions: "交易",
    messages: "消息",
    wallet: "钱包",
    compliance: "合规",
    revenue: "收益",
    live_marketplace: "LIVE MARKETPLACE",
    market_title: "全球认证宠物市场",
    services_title: "投喂洗护与宠物服务",
    bookings_title: "服务预约与验收",
    transactions_title: "交易流水与托管状态",
    messages_title: "平台消息中心",
    wallet_title: "商家钱包与结算",
    compliance_title: "跨境合规审查",
    revenue_title: "手续费收益模型",
    search_placeholder: "搜索品种、国家、卖家、服务",
    currency: "货币",
    publish_pet: "发布宠物",
    active_items: "在售宠物/服务",
    monthly_gmv: "本月成交额",
    platform_fees: "平台手续费",
    compliance_pass_rate: "合规通过率",
    all: "全部",
    dogs: "犬类",
    cats: "猫类",
    small_mammal: "小型哺乳",
    birds: "鸟类",
    equine: "马匹",
    view: "查看",
    create_trade: "创建交易",
    approved: "已认证",
    review: "审核中",
    blocked: "已限制",
    draft: "草稿",
    payment_pending: "待付款",
    escrow_funded: "已入托管",
    docs_cleared: "文件通过",
    transport_booked: "已订运输",
    delivered: "已交付",
    released: "已放款",
    disputed: "争议中",
    cancelled: "已取消",
    requested: "待确认",
    confirmed: "已确认",
    in_service: "服务中",
    completed: "已完成",
    settled: "已结算",
    no_listings: "没有匹配记录",
    adjust_filters: "调整筛选条件后再查看市场库存。",
    verified_seller: "认证卖家",
    pet_price: "宠物成交价",
    expected_platform_income: "预计平台收入",
    expected_seller_payout: "预计卖家入账",
    backend_calculates: "价格、手续费和托管状态由后台重新计算并保存。",
    confirm_payment: "确认付款",
    no_transactions: "暂无交易。",
    service_hero_title: "交易之外，也能预约投喂、洗护、寄养和接送",
    service_hero_body: "参考宠投喂 App 的服务入口：用户下单后进入平台记录，服务完成后再结算给服务者。",
    all_services: "全部服务",
    doorstep_feeding: "上门投喂",
    grooming: "洗护美容",
    boarding: "寄养看护",
    pickup: "接送交接",
    book: "预约",
    no_services: "没有匹配服务",
    try_other_service: "换一个关键词或分类再试。",
    booking_service: "预约服务",
    pet_name: "宠物名称",
    contact_phone: "联系电话",
    booking_time: "预约时间",
    note: "备注",
    submit_booking: "提交预约",
    service_bookings: "服务预约",
    service_acceptance: "服务验收标准",
    service_check_feed: "投喂后回传食盆、水碗、门窗和排便照片",
    service_check_groom: "洗护服务记录皮肤、耳道和异常情况",
    service_check_pickup: "接送交接必须拍摄运输箱和芯片核对视频",
    service_check_settle: "服务完成后进入平台结算队列",
    no_bookings: "暂无预约",
    submit_from_services: "从投喂服务页提交一个预约。",
    confirm: "确认",
    complete: "完成",
    trade_id: "交易号",
    pet: "宠物",
    country: "国家",
    amount: "成交额",
    fee: "手续费",
    status: "状态",
    id: "编号",
    type: "类型",
    item: "项目",
    expected_deposit: "预计入账",
    seller_wallet: "商家钱包",
    pending_settlement: "待结算金额",
    settled_amount: "已结算",
    settlement_rule: "结算规则",
    review_required: "需要人工复核",
    approve: "通过",
    restrict: "限制",
    no_risk: "无待审核记录",
    risk_empty: "当前队列为空。",
    trade_access: "交易准入",
    risk_queue: "风险队列",
    compliance_seller: "卖家身份、繁育许可、历史评价",
    compliance_docs: "微芯片编号、疫苗记录、健康证明",
    compliance_country: "买卖双方国家进口/出口规则",
    compliance_transport: "运输商资质、航线、福利检查点",
    fee_calculator: "手续费计算",
    sale_price: "成交价",
    platform_rate: "平台费率",
    compliance_service_fee: "跨境合规服务费",
    platform_commission: "平台佣金",
    total_income: "总收入",
    close: "关闭",
    submit_review: "提交审核",
    breed: "品种",
    price_usd: "价格 USD",
    demo_data: "演示数据",
    account: "账户",
    service_provider: "认证服务者",
    request_failed: "请求失败",
    booking_failed: "提交预约失败",
    t_plus_one_review: "T+1 复核",
    pet_trade: "宠物交易",
    care_services: "投喂服务",
    compliance_region: "合规服务",
    transport_region: "运输服务",
    sold: "已售出",
    checkout_order: "提交托管订单",
    contact_name: "联系人",
    destination_country: "目的国家",
    destination_city: "目的城市",
    delivery_address: "详细地址",
    import_permit: "进口文件",
    buyer_confirmed: "买家已确认进口文件",
    need_platform_help: "需要平台协助",
    transport_option: "运输方式",
    platform_partner: "平台合作运输",
    seller_arranged: "卖家安排运输",
    buyer_arranged: "买家自提/自安排",
    buyer_note: "订单备注",
    kyc_terms: "我确认买家身份、进口规则、收宠验收和托管付款条款",
    submit_escrow_order: "提交托管订单",
    checkout_summary_title: "订单金额由后台重新计算",
    pet_subtotal: "宠物价格",
    platform_escrow_fee: "平台托管/合规费",
    total_due: "应付总额",
    protection_period: "保障期",
    days_7: "7天",
    locked_after_submit: "提交后宠物会锁定，付款前不会放款给卖家。",
    order_detail: "订单详情",
    contact: "联系人",
    destination: "目的地",
    transport: "运输",
    payout_available: "可提现金额",
    request_payout: "申请提现",
    payout_method: "提现方式",
    payout_account_name: "账户姓名",
    payout_account_ref: "收款账号",
    payout_note: "提现备注",
    payout_requests: "提现申请",
    no_payouts: "暂无提现申请",
    bank: "银行账户",
    paypal: "PayPal",
    stripe_connect: "Stripe Connect",
    paid: "已打款",
    rejected: "已拒绝",
    network_error: "不好意思，网络有点差，再试一下？",
    trade_create_failed: "创建托管交易失败",
    order_update_failed: "更新订单失败",
    review_failed: "审核失败",
    publish_failed: "发布失败",
    welcome_title: "欢迎来到 PetGlobal",
    welcome_body: "交易、投喂预约、健康档案、售后和监管消息会集中显示在这里。",
    receive_check_title: "收宠验收提醒",
    receive_check_body: "收宠时请拍完整开箱视频，并核对芯片编号和健康档案。",
    feeding_title: "上门投喂与饮水巡检",
    feeding_summary: "按次上门，拍照回传食盆、水碗、排便和门窗状态。",
    grooming_title: "洗护美容到店预约",
    grooming_summary: "洗澡、修毛、耳道护理和基础皮肤检查。",
    boarding_title: "短期寄养与健康看护",
    boarding_summary: "寄养前确认疫苗、性格、饮食禁忌，日更照护记录。",
    pickup_title: "跨城接送与交接拍摄",
    pickup_summary: "运输箱编号、芯片核对、交接视频和到达提醒。",
    real_time_record: "实时记录",
    playback: "可回放",
    two_hour_response: "2小时响应",
    certified_store: "认证门店",
    insured: "保险覆盖",
    bookable: "可预约",
    health_file: "健康档案",
    daily_record: "日更记录",
    escrow_payment: "托管付款",
    handoff_video: "交接视频",
    chip_check: "芯片核对",
    route_tracking: "路线跟踪",
    demo_pet_name: "团团",
    today_1800: "今天 18:00",
    photo_note: "回传照片",
    feeding_note: "按平时食量投喂，回传照片",
  },
  en: {
    email: "Email",
    password: "Password",
    account_type: "Account type",
    buyer: "Buyer",
    seller: "Seller",
    admin: "Platform ops",
    visitor: "Visitor",
    login_workspace: "Log in to workspace",
    escrow_trade: "Escrow trade",
    commission_profit: "Commission revenue",
    compliance_review: "Compliance review",
    market: "Market",
    services: "Care",
    bookings: "Bookings",
    transactions: "Trades",
    messages: "Messages",
    wallet: "Wallet",
    compliance: "Compliance",
    revenue: "Revenue",
    live_marketplace: "LIVE MARKETPLACE",
    market_title: "Global Verified Pet Market",
    services_title: "Feeding, Grooming and Pet Care",
    bookings_title: "Service Bookings and Acceptance",
    transactions_title: "Escrow Trades and Order Flow",
    messages_title: "Platform Message Center",
    wallet_title: "Seller Wallet and Settlement",
    compliance_title: "Cross-Border Compliance Review",
    revenue_title: "Commission Revenue Model",
    search_placeholder: "Search breed, country, seller, service",
    currency: "Currency",
    publish_pet: "Publish pet",
    active_items: "Active pets/services",
    monthly_gmv: "Monthly GMV",
    platform_fees: "Platform fees",
    compliance_pass_rate: "Compliance pass rate",
    all: "All",
    dogs: "Dogs",
    cats: "Cats",
    small_mammal: "Small mammals",
    birds: "Birds",
    equine: "Equine",
    view: "View",
    create_trade: "Create trade",
    approved: "Verified",
    review: "In review",
    blocked: "Restricted",
    draft: "Draft",
    payment_pending: "Payment pending",
    escrow_funded: "Escrow funded",
    docs_cleared: "Docs cleared",
    transport_booked: "Transport booked",
    delivered: "Delivered",
    released: "Released",
    disputed: "Disputed",
    cancelled: "Cancelled",
    requested: "Requested",
    confirmed: "Confirmed",
    in_service: "In service",
    completed: "Completed",
    settled: "Settled",
    no_listings: "No matching records",
    adjust_filters: "Adjust filters to view marketplace inventory.",
    verified_seller: "Verified seller",
    pet_price: "Pet price",
    expected_platform_income: "Expected platform income",
    expected_seller_payout: "Expected seller payout",
    backend_calculates: "Prices, fees and escrow states are recalculated and stored by the backend.",
    confirm_payment: "Confirm payment",
    no_transactions: "No trades yet.",
    service_hero_title: "Book feeding, grooming, boarding and pickup beyond pet trades",
    service_hero_body: "Inspired by the local feeding app: bookings are recorded on-platform and providers settle after completion.",
    all_services: "All services",
    doorstep_feeding: "Doorstep feeding",
    grooming: "Grooming",
    boarding: "Boarding",
    pickup: "Pickup",
    book: "Book",
    no_services: "No matching services",
    try_other_service: "Try another keyword or category.",
    booking_service: "Book service",
    pet_name: "Pet name",
    contact_phone: "Contact phone",
    booking_time: "Booking time",
    note: "Note",
    submit_booking: "Submit booking",
    service_bookings: "Service bookings",
    service_acceptance: "Service acceptance standards",
    service_check_feed: "Return photos of food bowl, water bowl, doors/windows and waste after feeding",
    service_check_groom: "Record skin, ears and abnormal conditions during grooming",
    service_check_pickup: "Pickup handoff must include carrier and chip-check video",
    service_check_settle: "Completed services enter the platform settlement queue",
    no_bookings: "No bookings yet",
    submit_from_services: "Submit a booking from the care services page.",
    confirm: "Confirm",
    complete: "Complete",
    trade_id: "Trade ID",
    pet: "Pet",
    country: "Country",
    amount: "Amount",
    fee: "Fee",
    status: "Status",
    id: "ID",
    type: "Type",
    item: "Item",
    expected_deposit: "Expected payout",
    seller_wallet: "Seller wallet",
    pending_settlement: "Pending settlement",
    settled_amount: "Settled",
    settlement_rule: "Settlement rule",
    review_required: "Manual review required",
    approve: "Approve",
    restrict: "Restrict",
    no_risk: "No pending reviews",
    risk_empty: "The current queue is empty.",
    trade_access: "Trade access",
    risk_queue: "Risk queue",
    compliance_seller: "Seller identity, breeding permit and historical reviews",
    compliance_docs: "Microchip ID, vaccine records and health certificate",
    compliance_country: "Buyer/seller import and export rules by country",
    compliance_transport: "Transport provider, route and welfare checkpoints",
    fee_calculator: "Fee calculator",
    sale_price: "Sale price",
    platform_rate: "Platform rate",
    compliance_service_fee: "Cross-border compliance service fee",
    platform_commission: "Platform commission",
    total_income: "Total income",
    close: "Close",
    submit_review: "Submit for review",
    breed: "Breed",
    price_usd: "Price USD",
    demo_data: "Demo data",
    account: "account",
    service_provider: "Verified provider",
    request_failed: "Request failed",
    booking_failed: "Failed to submit booking",
    t_plus_one_review: "T+1 review",
    pet_trade: "Pet trade",
    care_services: "Care services",
    compliance_region: "Compliance",
    transport_region: "Transport",
    sold: "Sold",
    checkout_order: "Submit escrow order",
    contact_name: "Contact name",
    destination_country: "Destination country",
    destination_city: "Destination city",
    delivery_address: "Full address",
    import_permit: "Import documents",
    buyer_confirmed: "Buyer confirmed import documents",
    need_platform_help: "Need platform help",
    transport_option: "Transport option",
    platform_partner: "Platform logistics partner",
    seller_arranged: "Seller-arranged transport",
    buyer_arranged: "Buyer pickup / arranged",
    buyer_note: "Order note",
    kyc_terms: "I confirm buyer identity, import rules, acceptance checks and escrow terms",
    submit_escrow_order: "Submit escrow order",
    checkout_summary_title: "Order total is recalculated by backend",
    pet_subtotal: "Pet price",
    platform_escrow_fee: "Platform escrow/compliance fee",
    total_due: "Total due",
    protection_period: "Protection period",
    days_7: "7 days",
    locked_after_submit: "After submission, the pet is locked and funds are not released before acceptance.",
    order_detail: "Order detail",
    contact: "Contact",
    destination: "Destination",
    transport: "Transport",
    payout_available: "Available to withdraw",
    request_payout: "Request withdrawal",
    payout_method: "Withdrawal method",
    payout_account_name: "Account name",
    payout_account_ref: "Receiving account",
    payout_note: "Withdrawal note",
    payout_requests: "Withdrawal requests",
    no_payouts: "No withdrawal requests yet",
    bank: "Bank account",
    paypal: "PayPal",
    stripe_connect: "Stripe Connect",
    paid: "Paid",
    rejected: "Rejected",
    network_error: "Sorry, network error, please try again.",
    trade_create_failed: "Failed to create escrow trade",
    order_update_failed: "Failed to update order",
    review_failed: "Review failed",
    publish_failed: "Publish failed",
    welcome_title: "Welcome to PetGlobal",
    welcome_body: "Trades, feeding bookings, health records, after-sales and regulatory messages appear here.",
    receive_check_title: "Pet acceptance reminder",
    receive_check_body: "Record a complete unboxing video and verify the chip number and health file.",
    feeding_title: "Doorstep Feeding and Water Check",
    feeding_summary: "Per-visit feeding with photo records for food, water, waste and doors/windows.",
    grooming_title: "Grooming Appointment",
    grooming_summary: "Bathing, trimming, ear care and basic skin checks.",
    boarding_title: "Short-Term Boarding and Health Care",
    boarding_summary: "Confirm vaccines, temperament and diet restrictions before boarding, with daily care logs.",
    pickup_title: "Cross-City Pickup and Handoff Video",
    pickup_summary: "Carrier ID, chip check, handoff video and arrival reminders.",
    real_time_record: "Real-time record",
    playback: "Playback",
    two_hour_response: "2h response",
    certified_store: "Certified store",
    insured: "Insured",
    bookable: "Bookable",
    health_file: "Health file",
    daily_record: "Daily log",
    escrow_payment: "Escrow payment",
    handoff_video: "Handoff video",
    chip_check: "Chip check",
    route_tracking: "Route tracking",
    demo_pet_name: "Tuantuan",
    today_1800: "Today 18:00",
    photo_note: "Return photos",
    feeding_note: "Feed normal portion and return photos",
  },
};

let currentLang = i18nConfig.enabled
  ? localStorage.getItem("petopia_lang") || (navigator.language.startsWith("zh") ? "zh" : "en")
  : i18nConfig.defaultLang;

function normalizeLang(lang) {
  return lang === "zh" ? "zh" : "en";
}

function t(key) {
  return i18nLang[currentLang]?.[key] || i18nLang.en[key] || key;
}

function translateStatusKey(status) {
  return t(status);
}

const symbols = {
  USD: "$",
  EUR: "EUR ",
  CNY: "¥",
  JPY: "¥",
};

const demoCredentials = {
  buyer: "buyer@petglobal.test",
  seller: "seller@petglobal.test",
  admin: "admin@petglobal.test",
};

const fallbackUser = {
  id: 0,
  email: "buyer@petglobal.test",
  role: "buyer",
  displayName: "Demo Buyer",
  country: "United States",
  kycStatus: "verified",
};

const fallbackListings = [
  {
    id: "PG-24071",
    name: "Luna",
    species: "Dog",
    breed: "Border Collie",
    age: "14 months",
    country: "New Zealand",
    seller: "Kiwi Hills Kennel",
    price: 2400,
    priceCents: 240000,
    image: "./assets/dog.jpg",
    docs: ["Microchip", "Rabies", "Health cert"],
    status: "approved",
    route: "Auckland -> Singapore -> Los Angeles",
    risk: "low",
  },
  {
    id: "PG-24082",
    name: "Mochi",
    species: "Cat",
    breed: "British Shorthair",
    age: "9 months",
    country: "Japan",
    seller: "Tokyo Cattery Co.",
    price: 1850,
    priceCents: 185000,
    image: "./assets/cat.jpg",
    docs: ["Microchip", "Vaccine", "Pedigree"],
    status: "approved",
    route: "Tokyo -> Frankfurt -> Paris",
    risk: "low",
  },
  {
    id: "PG-24096",
    name: "Pepper",
    species: "Small mammal",
    breed: "Mini Lop Rabbit",
    age: "7 months",
    country: "Netherlands",
    seller: "Lowlands Rabbitry",
    price: 620,
    priceCents: 62000,
    image: "./assets/rabbit.jpg",
    docs: ["Health cert", "Seller ID"],
    status: "review",
    route: "Amsterdam -> Madrid",
    risk: "medium",
  },
  {
    id: "PG-24103",
    name: "Sunny",
    species: "Bird",
    breed: "Cockatiel",
    age: "11 months",
    country: "Australia",
    seller: "Sydney Aviary",
    price: 780,
    priceCents: 78000,
    image: "./assets/cockatiel.jpg",
    docs: ["CITES screen", "Health cert", "Seller ID"],
    status: "review",
    route: "Sydney -> Hong Kong -> Seoul",
    risk: "medium",
  },
  {
    id: "PG-24114",
    name: "Atlas",
    species: "Equine",
    breed: "Andalusian Horse",
    age: "4 years",
    country: "Spain",
    seller: "Cordoba Equine",
    price: 15800,
    priceCents: 1580000,
    image: "./assets/horse.jpg",
    docs: ["Passport", "Vet exam", "Export permit"],
    status: "approved",
    route: "Madrid -> Doha -> Miami",
    risk: "low",
  },
];

const fallbackServices = [
  {
    id: "SV-FEED-001",
    provider: "Kiwi Hills Kennel",
    title: "上门投喂与饮水巡检",
    category: "feeding",
    summary: "按次上门，拍照回传食盆、水碗、排便和门窗状态。",
    city: "Shanghai",
    price: 35,
    image: "./assets/carecat.png",
    tags: ["实时记录", "可回放", "2小时响应"],
    status: "active",
  },
  {
    id: "SV-WASH-001",
    provider: "Kiwi Hills Kennel",
    title: "洗护美容到店预约",
    category: "grooming",
    summary: "洗澡、修毛、耳道护理和基础皮肤检查。",
    city: "Singapore",
    price: 88,
    image: "./assets/wash.png",
    tags: ["认证门店", "保险覆盖", "可预约"],
    status: "active",
  },
  {
    id: "SV-CARE-001",
    provider: "Kiwi Hills Kennel",
    title: "短期寄养与健康看护",
    category: "boarding",
    summary: "寄养前确认疫苗、性格、饮食禁忌，日更照护记录。",
    city: "Los Angeles",
    price: 46,
    image: "./assets/hero.png",
    tags: ["健康档案", "日更记录", "托管付款"],
    status: "active",
  },
  {
    id: "SV-PICK-001",
    provider: "Kiwi Hills Kennel",
    title: "跨城接送与交接拍摄",
    category: "pickup",
    summary: "运输箱编号、芯片核对、交接视频和到达提醒。",
    city: "Tokyo",
    price: 120,
    image: "./assets/golden.png",
    tags: ["交接视频", "芯片核对", "路线跟踪"],
    status: "active",
  },
];

const fallbackOrders = [
  {
    id: "TX-89021",
    pet: "Luna",
    country: "New Zealand",
    buyer: "Demo Buyer",
    seller: "Kiwi Hills Kennel",
    amount: 2400,
    fee: 372,
    sellerPayout: 2364,
    status: "escrow_funded",
  },
];

const fallbackBookings = [
  {
    id: "BK-DEMO-001",
    serviceId: "SV-FEED-001",
    serviceTitle: "上门投喂与饮水巡检",
    buyer: "Demo Buyer",
    provider: "Kiwi Hills Kennel",
    petName: "团团",
    contactPhone: "13800000000",
    serviceTime: "今天 18:00",
    note: "回传照片",
    amount: 35,
    commission: 3.5,
    providerPayout: 31.5,
    status: "requested",
  },
];

const fallbackMessages = [
  {
    id: "MSG-WELCOME",
    title: "欢迎来到 PetGlobal",
    body: "交易、投喂预约、健康档案、售后和监管消息会集中显示在这里。",
    kind: "system",
    isRead: false,
    createdAt: "2026-06-08",
  },
  {
    id: "MSG-ORDER-GUARD",
    title: "收宠验收提醒",
    body: "收宠时请拍完整开箱视频，并核对芯片编号和健康档案。",
    kind: "order",
    isRead: false,
    createdAt: "2026-06-08",
  },
];

let state = {
  authed: false,
  token: localStorage.getItem("pg_token") || "",
  user: null,
  view: "market",
  filter: "all",
  serviceFilter: "all",
  query: "",
  currency: "USD",
  selectedId: fallbackListings[0].id,
  selectedServiceId: fallbackServices[0].id,
  listings: [...fallbackListings],
  services: [...fallbackServices],
  orders: [...fallbackOrders],
  bookings: [...fallbackBookings],
  messages: [...fallbackMessages],
  wallet: null,
  apiOnline: false,
};

const authShell = document.querySelector("#authShell");
const appShell = document.querySelector("#appShell");
const loginForm = document.querySelector("#loginForm");
const emailInput = loginForm.querySelector('input[type="email"]');
const passwordInput = loginForm.querySelector('input[type="password"]');
const roleSelect = document.querySelector("#roleSelect");
const accountRole = document.querySelector("#accountRole");
const logoutBtn = document.querySelector("#logoutBtn");
const listingGrid = document.querySelector("#listingGrid");
const dealPanel = document.querySelector("#dealPanel");
const filterButtons = [...document.querySelectorAll(".filter-pill[data-filter]")];
const serviceFilterButtons = [...document.querySelectorAll(".filter-pill[data-service-filter]")];
const searchInput = document.querySelector("#searchInput");
const currencySelect = document.querySelector("#currencySelect");
const navItems = [...document.querySelectorAll(".nav-item")];
const viewTitle = document.querySelector("#viewTitle");
const transactionBody = document.querySelector("#transactionBody");
const serviceGrid = document.querySelector("#serviceGrid");
const bookingList = document.querySelector("#bookingList");
const messageList = document.querySelector("#messageList");
const walletSummary = document.querySelector("#walletSummary");
const walletRows = document.querySelector("#walletRows");
const riskQueue = document.querySelector("#riskQueue");
const calcPrice = document.querySelector("#calcPrice");
const calcRate = document.querySelector("#calcRate");
const calcService = document.querySelector("#calcService");
const rateValue = document.querySelector("#rateValue");
const calcOutput = document.querySelector("#calcOutput");
const revenueBars = document.querySelector("#revenueBars");
const listingDialog = document.querySelector("#listingDialog");
const bookingDialog = document.querySelector("#bookingDialog");
const bookingForm = document.querySelector("#bookingForm");
const bookingDialogTitle = document.querySelector("#bookingDialogTitle");
const checkoutDialog = document.querySelector("#checkoutDialog");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutDialogTitle = document.querySelector("#checkoutDialogTitle");
const checkoutSummary = document.querySelector("#checkoutSummary");
const newListingBtn = document.querySelector("#newListingBtn");
const listingForm = document.querySelector("#listingForm");
const langSwitch = document.querySelector("#langSwitch");
const langSelect = document.querySelector("#langSelect");

const serviceI18nMap = {
  "SV-FEED-001": {
    title: "feeding_title",
    summary: "feeding_summary",
    tags: ["real_time_record", "playback", "two_hour_response"],
  },
  "SV-WASH-001": {
    title: "grooming_title",
    summary: "grooming_summary",
    tags: ["certified_store", "insured", "bookable"],
  },
  "SV-CARE-001": {
    title: "boarding_title",
    summary: "boarding_summary",
    tags: ["health_file", "daily_record", "escrow_payment"],
  },
  "SV-PICK-001": {
    title: "pickup_title",
    summary: "pickup_summary",
    tags: ["handoff_video", "chip_check", "route_tracking"],
  },
};

const messageI18nMap = {
  "MSG-WELCOME": ["welcome_title", "welcome_body"],
  "MSG-ORDER-GUARD": ["receive_check_title", "receive_check_body"],
};

function serviceTitle(service) {
  return serviceI18nMap[service.id]?.title ? t(serviceI18nMap[service.id].title) : service.title;
}

function serviceSummary(service) {
  return serviceI18nMap[service.id]?.summary ? t(serviceI18nMap[service.id].summary) : service.summary;
}

function serviceTags(service) {
  const tagKeys = serviceI18nMap[service.id]?.tags;
  return tagKeys ? tagKeys.map((key) => t(key)) : service.tags;
}

function messageTitle(message) {
  return messageI18nMap[message.id]?.[0] ? t(messageI18nMap[message.id][0]) : message.title;
}

function messageBody(message) {
  return messageI18nMap[message.id]?.[1] ? t(messageI18nMap[message.id][1]) : message.body;
}

function bookingServiceTitle(booking) {
  const service = state.services.find((item) => item.id === booking.serviceId);
  return service ? serviceTitle(service) : booking.serviceTitle;
}

function walletItemTitle(item) {
  const booking = state.bookings.find((entry) => entry.id === item.id);
  return booking ? bookingServiceTitle(booking) : item.title;
}

function walletItemType(type) {
  if (type === "pet-trade") return t("pet_trade");
  if (type === "service") return t("care_services");
  return type;
}

function orderAmounts(listing) {
  const price = Number(listing?.price || 0);
  const fee = Number((price * 0.08 + 180).toFixed(2));
  const sellerPayout = Number((price - price * 0.015).toFixed(2));
  const totalDue = Number((price + fee).toFixed(2));
  return { price, fee, sellerPayout, totalDue };
}

function optionLabel(value) {
  return t(value) || value || "-";
}

function payoutMethodLabel(value) {
  return t(value) || value;
}

function localizedPetName(name) {
  return name === "团团" && currentLang === "en" ? t("demo_pet_name") : name;
}

function localizedTime(value) {
  return value === "今天 18:00" && currentLang === "en" ? t("today_1800") : value;
}

function localizedNote(value) {
  if (value === "回传照片" && currentLang === "en") return t("photo_note");
  if (value === "按平时食量投喂，回传照片" && currentLang === "en") return t("feeding_note");
  return value;
}

function money(value, currency = state.currency) {
  const converted = Number(value || 0) * rates[currency];
  return `${symbols[currency]}${converted.toLocaleString(undefined, {
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  })}`;
}

async function apiFetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": currentLang,
    ...(options.headers || {}),
  };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  const response = await fetch(apiUrl(path), {
    ...options,
    headers,
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(data.error || t("request_failed"));
  }
  return data;
}

function selectedListing() {
  return state.listings.find((listing) => listing.id === state.selectedId) || state.listings[0];
}

function selectedService() {
  return state.services.find((service) => service.id === state.selectedServiceId) || state.services[0];
}

function filteredListings() {
  return state.listings.filter((listing) => {
    const matchesFilter = state.filter === "all" || listing.species === state.filter;
    const haystack = `${listing.name} ${listing.breed} ${listing.country} ${listing.seller}`.toLowerCase();
    return matchesFilter && haystack.includes(state.query.toLowerCase());
  });
}

function filteredServices() {
  return state.services.filter((service) => {
    const matchesFilter = state.serviceFilter === "all" || service.category === state.serviceFilter;
    const haystack = `${serviceTitle(service)} ${serviceSummary(service)} ${serviceTags(service).join(" ")} ${service.title} ${service.summary} ${service.city} ${service.provider}`.toLowerCase();
    return matchesFilter && haystack.includes(state.query.toLowerCase());
  });
}

function statusLabel(status) {
  return translateStatusKey(status);
}

function roleText(role) {
  return t(role) || t("visitor");
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setAttr(selector, attr, value) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attr, value);
}

function setSelectOptionText(select, value, text) {
  const option = select?.querySelector(`option[value="${value}"]`);
  if (option) option.textContent = text;
}

function renderAllPageText() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.title = currentLang === "zh" ? "PetGlobal Trade - 全球宠物交易与投喂服务" : "PetGlobal Trade - Global Pet Trade and Care";
  if (langSwitch) langSwitch.hidden = !i18nConfig.enabled;
  if (langSelect) langSelect.value = currentLang;

  const loginLabels = loginForm.querySelectorAll("label");
  if (loginLabels[0]) loginLabels[0].childNodes[0].textContent = `${t("email")} `;
  if (loginLabels[1]) loginLabels[1].childNodes[0].textContent = `${t("password")} `;
  if (loginLabels[2]) loginLabels[2].childNodes[0].textContent = `${t("account_type")} `;
  setSelectOptionText(roleSelect, "buyer", t("buyer"));
  setSelectOptionText(roleSelect, "seller", t("seller"));
  setSelectOptionText(roleSelect, "admin", t("admin"));
  loginForm.querySelector("button").lastChild.textContent = ` ${t("login_workspace")}`;
  const trustItems = document.querySelectorAll(".auth-panel .trust-strip span");
  [t("escrow_trade"), t("commission_profit"), t("compliance_review")].forEach((text, index) => {
    if (trustItems[index]) trustItems[index].textContent = text;
  });

  const navLabels = {
    market: "market",
    services: "services",
    bookings: "bookings",
    transactions: "transactions",
    messages: "messages",
    wallet: "wallet",
    compliance: "compliance",
    revenue: "revenue",
  };
  navItems.forEach((item) => {
    item.lastChild.textContent = ` ${t(navLabels[item.dataset.view])}`;
  });
  setAttr("#logoutBtn", "aria-label", t("close"));
  setAttr("#logoutBtn", "title", t("close"));
  setText(".topbar .eyebrow", t("live_marketplace"));
  searchInput.placeholder = t("search_placeholder");
  currencySelect.setAttribute("aria-label", t("currency"));
  newListingBtn.setAttribute("aria-label", t("publish_pet"));
  newListingBtn.setAttribute("title", t("publish_pet"));

  const metricLabels = document.querySelectorAll(".metrics-grid article span");
  [t("active_items"), t("monthly_gmv"), t("platform_fees"), t("compliance_pass_rate")].forEach((text, index) => {
    if (metricLabels[index]) metricLabels[index].textContent = text;
  });
  const listingFilters = [
    ["all", "all"],
    ["Dog", "dogs"],
    ["Cat", "cats"],
    ["Small mammal", "small_mammal"],
    ["Bird", "birds"],
    ["Equine", "equine"],
  ];
  listingFilters.forEach(([value, key]) => {
    const button = document.querySelector(`[data-filter="${value}"]`);
    if (button) button.textContent = t(key);
  });

  setText(".service-hero h3", t("service_hero_title"));
  setText(".service-hero p:not(.eyebrow)", t("service_hero_body"));
  const serviceFilters = [
    ["all", "all_services"],
    ["feeding", "doorstep_feeding"],
    ["grooming", "grooming"],
    ["boarding", "boarding"],
    ["pickup", "pickup"],
  ];
  serviceFilters.forEach(([value, key]) => {
    const button = document.querySelector(`[data-service-filter="${value}"]`);
    if (button) button.textContent = t(key);
  });

  const bookingPanels = document.querySelectorAll("#bookingsView .ops-panel h3");
  if (bookingPanels[0]) bookingPanels[0].textContent = t("service_bookings");
  if (bookingPanels[1]) bookingPanels[1].textContent = t("service_acceptance");
  const bookingChecks = document.querySelectorAll("#bookingsView .check-list li");
  ["service_check_feed", "service_check_groom", "service_check_pickup", "service_check_settle"].forEach((key, index) => {
    const item = bookingChecks[index];
    const icon = item?.querySelector("i");
    if (item) {
      item.textContent = ` ${t(key)}`;
      if (icon) item.prepend(icon);
    }
  });

  const transactionHeaders = document.querySelectorAll("#transactionsView th");
  ["trade_id", "pet", "country", "buyer", "amount", "fee", "status"].forEach((key, index) => {
    if (transactionHeaders[index]) transactionHeaders[index].textContent = t(key);
  });
  const walletHeaders = document.querySelectorAll("#walletView th");
  ["id", "type", "item", "expected_deposit", "status"].forEach((key, index) => {
    if (walletHeaders[index]) walletHeaders[index].textContent = t(key);
  });

  const complianceHeads = document.querySelectorAll("#complianceView h3");
  if (complianceHeads[0]) complianceHeads[0].textContent = t("trade_access");
  if (complianceHeads[1]) complianceHeads[1].textContent = t("risk_queue");
  const complianceChecks = document.querySelectorAll("#complianceView .check-list li");
  ["compliance_seller", "compliance_docs", "compliance_country", "compliance_transport"].forEach((key, index) => {
    const item = complianceChecks[index];
    const icon = item?.querySelector("i");
    if (item) {
      item.textContent = ` ${t(key)}`;
      if (icon) item.prepend(icon);
    }
  });

  setText(".fee-calculator h3", t("fee_calculator"));
  const calcLabels = document.querySelectorAll(".fee-calculator label");
  if (calcLabels[0]) calcLabels[0].childNodes[0].textContent = `${t("sale_price")} `;
  if (calcLabels[1]) calcLabels[1].childNodes[0].textContent = `${t("platform_rate")} `;
  if (calcLabels[2]) calcLabels[2].childNodes[0].textContent = `${t("compliance_service_fee")} `;

  const listingLabels = listingForm.querySelectorAll("label");
  setText("#listingForm h3", t("publish_pet"));
  if (listingLabels[0]) listingLabels[0].childNodes[0].textContent = `${t("pet_name")} `;
  if (listingLabels[1]) listingLabels[1].childNodes[0].textContent = `${t("breed")} `;
  if (listingLabels[2]) listingLabels[2].childNodes[0].textContent = `${t("country")} `;
  if (listingLabels[3]) listingLabels[3].childNodes[0].textContent = `${t("price_usd")} `;
  listingForm.querySelector(".primary-action").lastChild.textContent = ` ${t("submit_review")}`;

  setText("#checkoutDialogTitle", t("checkout_order"));
  const checkoutLabels = checkoutForm.querySelectorAll("label");
  if (checkoutLabels[0]) checkoutLabels[0].childNodes[0].textContent = `${t("contact_name")} `;
  if (checkoutLabels[1]) checkoutLabels[1].childNodes[0].textContent = `${t("contact_phone")} `;
  if (checkoutLabels[2]) checkoutLabels[2].childNodes[0].textContent = `${t("destination_country")} `;
  if (checkoutLabels[3]) checkoutLabels[3].childNodes[0].textContent = `${t("destination_city")} `;
  if (checkoutLabels[4]) checkoutLabels[4].childNodes[0].textContent = `${t("delivery_address")} `;
  if (checkoutLabels[5]) checkoutLabels[5].childNodes[0].textContent = `${t("import_permit")} `;
  if (checkoutLabels[6]) checkoutLabels[6].childNodes[0].textContent = `${t("transport_option")} `;
  if (checkoutLabels[7]) checkoutLabels[7].childNodes[0].textContent = `${t("buyer_note")} `;
  const terms = checkoutForm.querySelector(".check-field span");
  if (terms) terms.textContent = t("kyc_terms");
  setSelectOptionText(checkoutForm.elements.importPermit, "buyer_confirmed", t("buyer_confirmed"));
  setSelectOptionText(checkoutForm.elements.importPermit, "need_platform_help", t("need_platform_help"));
  setSelectOptionText(checkoutForm.elements.transportOption, "platform_partner", t("platform_partner"));
  setSelectOptionText(checkoutForm.elements.transportOption, "seller_arranged", t("seller_arranged"));
  setSelectOptionText(checkoutForm.elements.transportOption, "buyer_arranged", t("buyer_arranged"));
  checkoutForm.querySelector(".primary-action").lastChild.textContent = ` ${t("submit_escrow_order")}`;

  const bookingLabels = bookingForm.querySelectorAll("label");
  if (bookingLabels[0]) bookingLabels[0].childNodes[0].textContent = `${t("pet_name")} `;
  if (bookingLabels[1]) bookingLabels[1].childNodes[0].textContent = `${t("contact_phone")} `;
  if (bookingLabels[2]) bookingLabels[2].childNodes[0].textContent = `${t("booking_time")} `;
  if (bookingLabels[3]) bookingLabels[3].childNodes[0].textContent = `${t("note")} `;
  if (!bookingForm.elements.petName.value || ["团团", "Tuantuan"].includes(bookingForm.elements.petName.value)) {
    bookingForm.elements.petName.value = t("demo_pet_name");
  }
  if (!bookingForm.elements.serviceTime.value || ["今天 18:00", "Today 18:00"].includes(bookingForm.elements.serviceTime.value)) {
    bookingForm.elements.serviceTime.value = t("today_1800");
  }
  if (
    !bookingForm.elements.note.value ||
    ["按平时食量投喂，回传照片", "Feed normal portion and return photos"].includes(bookingForm.elements.note.value)
  ) {
    bookingForm.elements.note.value = t("feeding_note");
  }
  bookingForm.querySelector(".primary-action").lastChild.textContent = ` ${t("submit_booking")}`;
}

function renderMetrics() {
  const gmv =
    state.orders.reduce((sum, item) => sum + Number(item.amount || 0), 0) +
    state.bookings.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const fees =
    state.orders.reduce((sum, item) => sum + Number(item.fee || 0), 0) +
    state.bookings.reduce((sum, item) => sum + Number(item.commission || 0), 0);
  document.querySelector("#metricListings").textContent = state.listings.length + state.services.length;
  document.querySelector("#metricGmv").textContent = money(gmv);
  document.querySelector("#metricFees").textContent = money(fees);
}

function renderListings() {
  const items = filteredListings();
  listingGrid.innerHTML = items
    .map((listing) => {
      const canBuy = listing.status === "approved" && state.user?.role !== "seller";
      return `
        <article class="listing-card ${listing.id === state.selectedId ? "is-selected" : ""}">
          <img src="${listing.image}" alt="${listing.breed} listing from ${listing.country}" />
          <div class="listing-body">
            <div class="listing-head">
              <div>
                <h3>${listing.name}</h3>
                <p>${listing.breed} · ${listing.age}</p>
              </div>
              <span class="price">${money(listing.price)}</span>
            </div>
            <div class="meta-row">
              <span>${listing.country}</span>
              <span>${listing.seller || t("verified_seller")}</span>
              <span class="status ${listing.status}">${statusLabel(listing.status)}</span>
            </div>
            <div class="doc-row">
              ${listing.docs.map((doc) => `<span class="doc-chip">${doc}</span>`).join("")}
            </div>
            <div class="card-actions">
              <button class="secondary-action" type="button" data-select="${listing.id}">
                <i data-lucide="scan-eye" aria-hidden="true"></i>
                ${t("view")}
              </button>
              <button class="primary-action" type="button" data-buy="${listing.id}" ${canBuy ? "" : "disabled"}>
                <i data-lucide="lock-keyhole" aria-hidden="true"></i>
                ${t("escrow_trade")}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  if (!items.length) {
    listingGrid.innerHTML = `<article class="listing-card"><div class="listing-body"><h3>${t("no_listings")}</h3><p>${t("adjust_filters")}</p></div></article>`;
  }

  listingGrid.querySelectorAll("[data-select], [data-buy]").forEach((button) => {
    button.addEventListener("click", async () => {
      state.selectedId = button.dataset.select || button.dataset.buy;
      if (button.dataset.buy) await createEscrowIntent(selectedListing());
      render();
    });
  });
}

function renderServices() {
  const services = filteredServices();
  serviceGrid.innerHTML = services
    .map(
      (service) => `
        <article class="service-card">
          <img src="${service.image}" alt="${serviceTitle(service)}" />
          <div class="service-card-body">
            <div class="listing-head">
              <div>
                <h3>${serviceTitle(service)}</h3>
                <p>${service.city} · ${service.provider || t("service_provider")}</p>
              </div>
              <span class="price">${money(service.price)}</span>
            </div>
            <p>${serviceSummary(service)}</p>
            <div class="doc-row">
              ${serviceTags(service).map((tag) => `<span class="doc-chip">${tag}</span>`).join("")}
            </div>
            <div class="card-actions">
              <button class="primary-action" type="button" data-book-service="${service.id}">
                <i data-lucide="calendar-plus" aria-hidden="true"></i>
                ${t("book")}
              </button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  if (!services.length) {
    serviceGrid.innerHTML = `<article class="service-card"><div class="service-card-body"><h3>${t("no_services")}</h3><p>${t("try_other_service")}</p></div></article>`;
  }

  serviceGrid.querySelectorAll("[data-book-service]").forEach((button) => {
    button.addEventListener("click", () => openBookingDialog(button.dataset.bookService));
  });
}

function openBookingDialog(serviceId) {
  const service = state.services.find((item) => item.id === serviceId);
  if (!service) return;
  state.selectedServiceId = service.id;
  bookingDialogTitle.textContent = serviceTitle(service);
  bookingForm.elements.serviceId.value = service.id;
  if (typeof bookingDialog.showModal === "function") {
    bookingDialog.showModal();
  }
}

function renderCheckoutSummary(listing) {
  const amounts = orderAmounts(listing);
  checkoutSummary.innerHTML = `
    <strong>${t("checkout_summary_title")}</strong>
    <div class="fee-lines">
      <div><span>${t("pet_subtotal")}</span><strong>${money(amounts.price)}</strong></div>
      <div><span>${t("platform_escrow_fee")}</span><strong>${money(amounts.fee)}</strong></div>
      <div><span>${t("total_due")}</span><strong>${money(amounts.totalDue)}</strong></div>
      <div><span>${t("protection_period")}</span><strong>${t("days_7")}</strong></div>
    </div>
    <p>${t("locked_after_submit")}</p>
  `;
}

function openCheckoutDialog(listingId) {
  const listing = state.listings.find((item) => item.id === listingId);
  if (!listing) return;
  state.selectedId = listing.id;
  checkoutDialogTitle.textContent = t("checkout_order");
  checkoutForm.elements.listingId.value = listing.id;
  checkoutForm.elements.contactName.value = state.user?.displayName || "Demo Buyer";
  renderCheckoutSummary(listing);
  if (typeof checkoutDialog.showModal === "function") {
    checkoutDialog.showModal();
  }
}

async function submitBooking(payload) {
  try {
    const data = await apiFetch("/api/service-bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    state.bookings.unshift(data.booking);
    state.view = "bookings";
  } catch (error) {
    const service = state.services.find((item) => item.id === payload.serviceId);
    state.bookings.unshift({
      id: `BK-DEMO-${Math.floor(Math.random() * 9000 + 1000)}`,
      serviceId: payload.serviceId,
      serviceTitle: service ? serviceTitle(service) : t("booking_service"),
      buyer: state.user?.displayName || "Demo Buyer",
      provider: service?.provider || t("service_provider"),
      petName: payload.petName,
      contactPhone: payload.contactPhone,
      serviceTime: payload.serviceTime,
      note: payload.note,
      amount: service?.price || 0,
      commission: Number(((service?.price || 0) * 0.1).toFixed(2)),
      providerPayout: Number(((service?.price || 0) * 0.9).toFixed(2)),
      status: "requested",
    });
    state.view = "bookings";
  }
}

async function updateBookingStatus(bookingId, status) {
  try {
    const data = await apiFetch(`/api/service-bookings/${bookingId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    state.bookings = state.bookings.map((booking) => (booking.id === bookingId ? data.booking : booking));
  } catch {
    state.bookings = state.bookings.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking));
  }
  render();
}

async function createEscrowIntent(listing) {
  openCheckoutDialog(listing.id);
}

async function submitCheckout(payload) {
  const listing = state.listings.find((item) => item.id === payload.listingId) || selectedListing();
  try {
    const data = await apiFetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    state.orders.unshift(data.order);
    state.listings = state.listings.map((item) =>
      item.id === payload.listingId ? { ...item, status: "sold" } : item,
    );
    state.view = "transactions";
  } catch (error) {
    if (state.apiOnline) {
      alert(`${t("trade_create_failed")}: ${error.message}`);
      return;
    }
    const amounts = orderAmounts(listing);
    state.orders.unshift({
      id: `TX-DEMO-${Math.floor(Math.random() * 9000 + 1000)}`,
      pet: listing.name,
      country: listing.country,
      buyer: state.user?.displayName || "Demo Buyer",
      seller: listing.seller,
      amount: listing.price,
      fee: amounts.fee,
      totalDue: amounts.totalDue,
      sellerPayout: amounts.sellerPayout,
      contactName: payload.contactName,
      contactPhone: payload.contactPhone,
      destinationCountry: payload.destinationCountry,
      destinationCity: payload.destinationCity,
      deliveryAddress: payload.deliveryAddress,
      importPermit: payload.importPermit,
      transportOption: payload.transportOption,
      buyerNote: payload.buyerNote,
      kycConfirmed: payload.kycConfirmed,
      protectionDays: 7,
      status: "payment_pending",
    });
    state.listings = state.listings.map((item) =>
      item.id === payload.listingId ? { ...item, status: "sold" } : item,
    );
    state.view = "transactions";
  }
}

async function confirmMockPayment(orderId) {
  try {
    const data = await apiFetch(`/api/orders/${orderId}/mock-confirm-payment`, {
      method: "POST",
    });
    state.orders = state.orders.map((order) => (order.id === orderId ? data.order : order));
    render();
  } catch (error) {
    state.orders = state.orders.map((order) =>
      order.id === orderId ? { ...order, status: "escrow_funded" } : order,
    );
    render();
  }
}

async function advanceOrder(orderId, status) {
  try {
    const data = await apiFetch(`/api/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    state.orders = state.orders.map((order) => (order.id === orderId ? data.order : order));
    render();
  } catch (error) {
    alert(`${t("order_update_failed")}: ${error.message}`);
  }
}

async function reviewListing(listingId, status) {
  try {
    const data = await apiFetch(`/api/admin/listings/${listingId}/review`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    state.listings = state.listings.map((listing) => (listing.id === listingId ? data.listing : listing));
    render();
  } catch (error) {
    alert(`${t("review_failed")}: ${error.message}`);
  }
}

async function submitPayout(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const payload = {
    amount: Number(data.get("amount")),
    method: data.get("method"),
    accountName: data.get("accountName"),
    accountRef: data.get("accountRef"),
    note: data.get("note"),
  };
  try {
    const response = await apiFetch("/api/payouts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    state.wallet = {
      ...(state.wallet || {}),
      available: response.available,
      payouts: [response.payout, ...((state.wallet && state.wallet.payouts) || [])],
    };
  } catch (error) {
    if (state.apiOnline) {
      alert(error.message);
      return;
    }
    const currentWallet = state.wallet || { available: payload.amount, payouts: [] };
    state.wallet = {
      ...currentWallet,
      available: Math.max(0, Number(currentWallet.available || 0) - payload.amount),
      payouts: [
        {
          id: `PO-DEMO-${Math.floor(Math.random() * 9000 + 1000)}`,
          amount: payload.amount,
          method: payload.method,
          accountName: payload.accountName,
          accountRef: payload.accountRef,
          note: payload.note,
          status: "requested",
        },
        ...(currentWallet.payouts || []),
      ],
    };
  }
  renderWallet();
  if (window.lucide) window.lucide.createIcons();
}

async function updatePayoutStatus(payoutId, status) {
  try {
    const data = await apiFetch(`/api/admin/payouts/${payoutId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    state.wallet = {
      ...(state.wallet || {}),
      payouts: ((state.wallet && state.wallet.payouts) || []).map((payout) =>
        payout.id === payoutId ? data.payout : payout,
      ),
    };
  } catch {
    state.wallet = {
      ...(state.wallet || {}),
      payouts: ((state.wallet && state.wallet.payouts) || []).map((payout) =>
        payout.id === payoutId ? { ...payout, status } : payout,
      ),
    };
  }
  renderWallet();
}

function renderDealPanel() {
  const listing = selectedListing();
  if (!listing) return;
  const fee = Number((listing.price * 0.08 + 180).toFixed(2));
  const sellerPayout = Number((listing.price - listing.price * 0.015).toFixed(2));
  const canBuy = listing.status === "approved" && state.user?.role !== "seller";
  dealPanel.innerHTML = `
    <img src="${listing.image}" alt="${listing.name} transaction preview" />
    <div class="deal-body">
      <h3>${listing.name} · ${listing.breed}</h3>
      <p>${listing.route}</p>
      <div class="fee-lines">
        <div><span>${t("pet_price")}</span><strong>${money(listing.price)}</strong></div>
        <div><span>${t("expected_platform_income")}</span><strong>${money(fee)}</strong></div>
        <div><span>${t("expected_seller_payout")}</span><strong>${money(sellerPayout)}</strong></div>
      </div>
      <p>${t("backend_calculates")}</p>
      <button class="primary-action" type="button" id="dealAction" ${canBuy ? "" : "disabled"}>
        <i data-lucide="badge-dollar-sign" aria-hidden="true"></i>
        ${t("create_trade")}
      </button>
    </div>
  `;
  dealPanel.querySelector("#dealAction").addEventListener("click", async () => {
    await createEscrowIntent(listing);
    render();
  });
}

function renderTransactions() {
  transactionBody.innerHTML = state.orders
    .map((tx) => {
      const pending = tx.status === "payment_pending";
      const admin = state.user?.role === "admin";
      const nextButton =
        admin && tx.status === "escrow_funded"
          ? `<button class="secondary-action" type="button" data-advance="${tx.id}" data-status="docs_cleared">${t("docs_cleared")}</button>`
          : "";
      return `
        <tr>
          <td>${tx.id}</td>
          <td>${tx.pet || tx.listingId}</td>
          <td>${tx.country || "-"}</td>
          <td>${tx.buyer || "-"}</td>
          <td>${money(tx.totalDue || tx.amount || 0)}</td>
          <td>${money(tx.fee || 0)}</td>
          <td>
            <span class="status ${String(tx.status).includes("pending") ? "review" : "approved"}">${statusLabel(tx.status)}</span>
            ${pending ? `<button class="secondary-action" type="button" data-confirm="${tx.id}">${t("confirm_payment")}</button>` : ""}
            <button class="secondary-action" type="button" data-order-detail="${tx.id}">${t("order_detail")}</button>
            ${nextButton}
          </td>
        </tr>
        <tr class="order-detail-row is-hidden" data-order-detail-row="${tx.id}">
          <td colspan="7">
            <div class="detail-grid">
              <div><span>${t("pet_subtotal")}</span><strong>${money(tx.amount || 0)}</strong></div>
              <div><span>${t("platform_escrow_fee")}</span><strong>${money(tx.fee || 0)}</strong></div>
              <div><span>${t("contact")}</span><strong>${tx.contactName || "-"} · ${tx.contactPhone || "-"}</strong></div>
              <div><span>${t("destination")}</span><strong>${[tx.destinationCity, tx.destinationCountry].filter(Boolean).join(", ") || tx.country || "-"}</strong></div>
              <div><span>${t("delivery_address")}</span><strong>${tx.deliveryAddress || "-"}</strong></div>
              <div><span>${t("transport")}</span><strong>${optionLabel(tx.transportOption)}</strong></div>
              <div><span>${t("import_permit")}</span><strong>${optionLabel(tx.importPermit)}</strong></div>
              <div><span>${t("protection_period")}</span><strong>${tx.protectionDays || 7} ${currentLang === "zh" ? "天" : "days"}</strong></div>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  if (!state.orders.length) {
    transactionBody.innerHTML = `<tr><td colspan="7">${t("no_transactions")}</td></tr>`;
  }

  transactionBody.querySelectorAll("[data-confirm]").forEach((button) => {
    button.addEventListener("click", () => confirmMockPayment(button.dataset.confirm));
  });
  transactionBody.querySelectorAll("[data-advance]").forEach((button) => {
    button.addEventListener("click", () => advanceOrder(button.dataset.advance, button.dataset.status));
  });
  transactionBody.querySelectorAll("[data-order-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      const row = transactionBody.querySelector(`[data-order-detail-row="${button.dataset.orderDetail}"]`);
      row?.classList.toggle("is-hidden");
    });
  });
}

function renderBookings() {
  bookingList.innerHTML = state.bookings
    .map((booking) => {
      const canAdvance = ["seller", "admin"].includes(state.user?.role);
      return `
        <div class="booking-item">
          <div>
            <strong>${bookingServiceTitle(booking)}</strong>
            <span>${localizedPetName(booking.petName)} · ${localizedTime(booking.serviceTime)}</span>
            <span>${booking.provider || t("service_provider")} · ${money(booking.amount || 0)}</span>
            ${booking.note ? `<span>${localizedNote(booking.note)}</span>` : ""}
          </div>
          <div class="card-actions">
            <span class="status ${booking.status === "requested" ? "review" : "approved"}">${statusLabel(booking.status)}</span>
            ${
              canAdvance && booking.status === "requested"
                ? `<button class="secondary-action" type="button" data-booking-status="${booking.id}" data-status="confirmed">${t("confirm")}</button>`
                : ""
            }
            ${
              canAdvance && booking.status === "confirmed"
                ? `<button class="secondary-action" type="button" data-booking-status="${booking.id}" data-status="completed">${t("complete")}</button>`
                : ""
            }
          </div>
        </div>
      `;
    })
    .join("");

  if (!state.bookings.length) {
    bookingList.innerHTML = `<div class="booking-item"><strong>${t("no_bookings")}</strong><span>${t("submit_from_services")}</span></div>`;
  }

  bookingList.querySelectorAll("[data-booking-status]").forEach((button) => {
    button.addEventListener("click", () => updateBookingStatus(button.dataset.bookingStatus, button.dataset.status));
  });
}

function renderMessages() {
  messageList.innerHTML = state.messages
    .map(
      (message) => `
        <article class="message-card">
          <div class="message-icon">${message.kind.slice(0, 1).toUpperCase()}</div>
          <div>
            <h3>${messageTitle(message)}</h3>
            <p>${messageBody(message)}</p>
            <span>${message.createdAt || ""}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderWallet() {
  const payoutDefaults = {
    amount: state.wallet?.available || 0,
    method: "bank",
    accountName: state.user?.displayName || "Kiwi Hills Kennel",
    accountRef: "**** 8899",
    note: "",
  };
  const fallbackWallet = {
    pending:
      state.orders.reduce((sum, order) => sum + Number(order.sellerPayout || 0), 0) +
      state.bookings.reduce((sum, booking) => sum + Number(booking.providerPayout || 0), 0),
    settled: 0,
    available: 0,
    payouts: [],
    items: [
      ...state.orders.map((order) => ({
        id: order.id,
        type: "pet-trade",
        title: order.pet,
        amount: order.sellerPayout || 0,
        status: order.status,
      })),
      ...state.bookings.map((booking) => ({
        id: booking.id,
        type: "service",
        title: bookingServiceTitle(booking),
        amount: booking.providerPayout || 0,
        status: booking.status,
      })),
    ],
  };
  const wallet = state.wallet || fallbackWallet;
  walletSummary.innerHTML = `
    <h3>${t("seller_wallet")}</h3>
    <div class="wallet-total">${money(wallet.pending || 0)}</div>
    <p>${t("pending_settlement")}</p>
    <div class="fee-lines">
      <div><span>${t("payout_available")}</span><strong>${money(wallet.available || 0)}</strong></div>
      <div><span>${t("settled_amount")}</span><strong>${money(wallet.settled || 0)}</strong></div>
      <div><span>${t("settlement_rule")}</span><strong>${t("t_plus_one_review")}</strong></div>
    </div>
    <form class="payout-form" id="payoutForm">
      <strong>${t("request_payout")}</strong>
      <div class="form-grid two-cols">
        <label>${t("amount")}<input name="amount" type="number" min="1" step="1" value="${Math.max(0, Math.floor(payoutDefaults.amount))}" required /></label>
        <label>${t("payout_method")}
          <select name="method">
            <option value="bank">${t("bank")}</option>
            <option value="paypal">${t("paypal")}</option>
            <option value="stripe_connect">${t("stripe_connect")}</option>
          </select>
        </label>
      </div>
      <label>${t("payout_account_name")}<input name="accountName" value="${payoutDefaults.accountName}" required /></label>
      <label>${t("payout_account_ref")}<input name="accountRef" value="${payoutDefaults.accountRef}" required /></label>
      <label>${t("payout_note")}<input name="note" value="${payoutDefaults.note}" /></label>
      <button class="primary-action" type="submit" ${Number(wallet.available || 0) > 0 ? "" : "disabled"}>
        <i data-lucide="send" aria-hidden="true"></i>
        ${t("request_payout")}
      </button>
    </form>
    <div class="payout-list">
      <strong>${t("payout_requests")}</strong>
      ${(wallet.payouts || []).length
        ? wallet.payouts
            .map(
              (payout) => `
                <div class="payout-item">
                  <span>${payout.id} · ${money(payout.amount)} · ${payoutMethodLabel(payout.method)}</span>
                  <span class="status ${payout.status === "requested" ? "review" : "approved"}">${statusLabel(payout.status)}</span>
                  ${
                    state.user?.role === "admin" && payout.status === "requested"
                      ? `<button class="secondary-action" type="button" data-payout-status="${payout.id}" data-status="paid">${t("paid")}</button>
                         <button class="secondary-action" type="button" data-payout-status="${payout.id}" data-status="rejected">${t("rejected")}</button>`
                      : ""
                  }
                </div>
              `,
            )
            .join("")
        : `<span>${t("no_payouts")}</span>`}
    </div>
  `;
  walletRows.innerHTML = (wallet.items || [])
    .map(
      (item) => `
        <tr>
          <td>${item.id}</td>
          <td>${walletItemType(item.type)}</td>
          <td>${walletItemTitle(item) || "-"}</td>
          <td>${money(item.amount || 0)}</td>
          <td><span class="status ${String(item.status).includes("pending") ? "review" : "approved"}">${statusLabel(item.status)}</span></td>
        </tr>
      `,
    )
    .join("");
  walletSummary.querySelector("#payoutForm")?.addEventListener("submit", submitPayout);
  walletSummary.querySelectorAll("[data-payout-status]").forEach((button) => {
    button.addEventListener("click", () => updatePayoutStatus(button.dataset.payoutStatus, button.dataset.status));
  });
}

function renderCompliance() {
  const risks = state.listings.filter((listing) => listing.risk !== "low" || listing.status === "review");
  riskQueue.innerHTML = risks
    .map(
      (listing) => `
        <div class="risk-item">
          <strong>${listing.id} · ${listing.name}</strong>
          <span>${listing.country} · ${listing.docs.join(", ")}</span>
          <span class="status review">${t("review_required")}</span>
          ${
            state.user?.role === "admin"
              ? `<div class="card-actions">
                  <button class="secondary-action" type="button" data-review="${listing.id}" data-status="approved">${t("approve")}</button>
                  <button class="secondary-action" type="button" data-review="${listing.id}" data-status="blocked">${t("restrict")}</button>
                </div>`
              : ""
          }
        </div>
      `,
    )
    .join("");

  if (!risks.length) {
    riskQueue.innerHTML = `<div class="risk-item"><strong>${t("no_risk")}</strong><span>${t("risk_empty")}</span></div>`;
  }

  riskQueue.querySelectorAll("[data-review]").forEach((button) => {
    button.addEventListener("click", () => reviewListing(button.dataset.review, button.dataset.status));
  });
}

function renderCalculator() {
  const price = Number(calcPrice.value || 0);
  const rate = Number(calcRate.value || 0);
  const service = Number(calcService.value || 0);
  const commission = price * (rate / 100);
  const totalFee = commission + service;
  rateValue.textContent = `${rate}%`;
  calcOutput.innerHTML = `
    <span>${t("platform_commission")} ${money(commission)}</span>
    <span>${t("compliance_service_fee")} ${money(service)}</span>
    <strong>${t("total_income")} ${money(totalFee)}</strong>
  `;
}

function renderRevenueBars() {
  const regions = [
    [t("pet_trade"), state.orders.reduce((sum, item) => sum + Number(item.fee || 0), 0) || 3860],
    [t("care_services"), state.bookings.reduce((sum, item) => sum + Number(item.commission || 0), 0) || 940],
    [t("compliance_region"), 1780],
    [t("transport_region"), 2140],
  ];
  const max = Math.max(...regions.map(([, value]) => value));
  revenueBars.innerHTML = regions
    .map(
      ([region, value]) => `
        <div class="bar-row">
          <header><span>${region}</span><strong>${money(value)}</strong></header>
          <div class="bar-track"><span style="width:${(value / max) * 100}%"></span></div>
        </div>
      `,
    )
    .join("");
}

function setView(view) {
  state.view = view;
  document.querySelectorAll(".view-panel").forEach((panel) => panel.classList.add("is-hidden"));
  document.querySelector(`#${view}View`).classList.remove("is-hidden");
  navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.view === view));
  const titles = {
    market: "market_title",
    services: "services_title",
    bookings: "bookings_title",
    transactions: "transactions_title",
    messages: "messages_title",
    wallet: "wallet_title",
    compliance: "compliance_title",
    revenue: "revenue_title",
  };
  viewTitle.textContent = t(titles[view]);
}

function render() {
  renderAllPageText();
  const role = state.user?.role || roleSelect.value;
  const accountText = currentLang === "zh" ? `${roleText(role)}${t("account")}` : `${roleText(role)} ${t("account")}`;
  accountRole.textContent = `${accountText}${state.apiOnline ? "" : ` · ${t("demo_data")}`}`;
  currencySelect.value = state.currency;
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === state.filter);
  });
  serviceFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.serviceFilter === state.serviceFilter);
  });
  setView(state.view);
  renderMetrics();
  renderListings();
  renderServices();
  renderDealPanel();
  renderTransactions();
  renderBookings();
  renderMessages();
  renderWallet();
  renderCompliance();
  renderCalculator();
  renderRevenueBars();
  if (window.lucide) window.lucide.createIcons();
}

async function loadData() {
  try {
    const listingPath = state.user?.role === "admin" ? "/api/listings?all=true" : "/api/listings";
    const [listingData, serviceData, orderData, bookingData, messageData, walletData] = await Promise.all([
      apiFetch(listingPath),
      apiFetch("/api/services"),
      apiFetch("/api/orders").catch(() => ({ orders: [] })),
      apiFetch("/api/service-bookings").catch(() => ({ bookings: [] })),
      apiFetch("/api/messages").catch(() => ({ messages: [] })),
      apiFetch("/api/wallet").catch(() => ({ wallet: null })),
    ]);
    state.listings = listingData.listings;
    state.services = serviceData.services;
    state.orders = orderData.orders;
    state.bookings = bookingData.bookings;
    state.messages = messageData.messages.length ? messageData.messages : state.messages;
    state.wallet = walletData.wallet;
    state.apiOnline = true;
    if (!state.listings.find((item) => item.id === state.selectedId)) {
      state.selectedId = state.listings[0]?.id;
    }
  } catch (error) {
    console.warn("Using fallback data:", error.message);
    state.apiOnline = false;
  }
}

async function loadRuntimeConfig() {
  try {
    const response = await fetch(apiUrl("/api/config"), {
      headers: {
        "Accept-Language": currentLang,
      },
    });
    if (!response.ok) return;
    const data = await response.json();
    if (!data.i18n) return;
    i18nConfig.enabled = data.i18n.enabled !== false;
    i18nConfig.defaultLang = normalizeLang(data.i18n.defaultLang);
    if (!i18nConfig.enabled) {
      currentLang = i18nConfig.defaultLang;
      localStorage.removeItem("petopia_lang");
    }
  } catch {
    // Static deployments keep the built-in frontend i18n settings.
  }
}

async function showApp(user, token) {
  state.user = user;
  state.token = token || state.token;
  state.authed = true;
  if (state.token) localStorage.setItem("pg_token", state.token);
  authShell.classList.add("is-hidden");
  appShell.classList.remove("is-hidden");
  await loadData();
  render();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });
    await showApp(data.user, data.token);
  } catch {
    const role = roleSelect.value;
    await showApp({ ...fallbackUser, email: demoCredentials[role], role, displayName: roleText(role) }, "");
  }
});

roleSelect.addEventListener("change", () => {
  emailInput.value = demoCredentials[roleSelect.value] || demoCredentials.buyer;
});

if (langSelect) {
  langSelect.value = currentLang;
  langSelect.addEventListener("change", (event) => {
    currentLang = normalizeLang(event.target.value);
    localStorage.setItem("petopia_lang", currentLang);
    render();
  });
}

logoutBtn.addEventListener("click", async () => {
  try {
    await apiFetch("/api/auth/logout", { method: "POST" });
  } catch {
    // Local fallback logout should still clear UI state.
  }
  state.authed = false;
  state.user = null;
  state.token = "";
  localStorage.removeItem("pg_token");
  appShell.classList.add("is-hidden");
  authShell.classList.remove("is-hidden");
  if (window.lucide) window.lucide.createIcons();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    render();
  });
});

serviceFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.serviceFilter = button.dataset.serviceFilter;
    render();
  });
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderListings();
  renderServices();
});

currencySelect.addEventListener("change", (event) => {
  state.currency = event.target.value;
  render();
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    state.view = item.dataset.view;
    render();
  });
});

[calcPrice, calcRate, calcService].forEach((input) => {
  input.addEventListener("input", renderCalculator);
});

newListingBtn.addEventListener("click", () => {
  if (typeof listingDialog.showModal === "function") {
    listingDialog.showModal();
  }
});

listingForm.addEventListener("submit", async (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const data = new FormData(listingForm);
  try {
    const response = await apiFetch("/api/listings", {
      method: "POST",
      body: JSON.stringify({
        name: data.get("name"),
        species: "Dog",
        breed: data.get("breed"),
        age: "Pending",
        country: data.get("country"),
        price: Number(data.get("price")),
        image: "/assets/dog.jpg",
        docs: ["Seller ID"],
        route: "Pending route",
      }),
    });
    state.listings.unshift(response.listing);
    state.selectedId = response.listing.id;
    state.view = "market";
    listingDialog.close();
    render();
  } catch (error) {
    alert(`${t("publish_failed")}: ${error.message}`);
  }
});

bookingForm.addEventListener("submit", async (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const data = new FormData(bookingForm);
  await submitBooking({
    serviceId: data.get("serviceId"),
    petName: data.get("petName"),
    contactPhone: data.get("contactPhone"),
    serviceTime: data.get("serviceTime"),
    note: data.get("note"),
  });
  bookingDialog.close();
  render();
});

checkoutForm.addEventListener("submit", async (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const data = new FormData(checkoutForm);
  await submitCheckout({
    listingId: data.get("listingId"),
    contactName: data.get("contactName"),
    contactPhone: data.get("contactPhone"),
    destinationCountry: data.get("destinationCountry"),
    destinationCity: data.get("destinationCity"),
    deliveryAddress: data.get("deliveryAddress"),
    importPermit: data.get("importPermit"),
    transportOption: data.get("transportOption"),
    buyerNote: data.get("buyerNote"),
    kycConfirmed: data.get("kycConfirmed") === "on",
  });
  checkoutDialog.close();
  render();
});

window.addEventListener("load", async () => {
  await loadRuntimeConfig();
  if (window.lucide) window.lucide.createIcons();
  render();
  if (!state.token) return;
  try {
    const data = await apiFetch("/api/auth/me");
    await showApp(data.user, state.token);
  } catch {
    localStorage.removeItem("pg_token");
    state.token = "";
  }
});
