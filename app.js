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

const commissionPolicy = {
  lowThresholdCents: 100000,
  highThresholdCents: 500000,
  lowRate: 0.1,
  midRate: 0.08,
  highRate: 0.06,
  capCents: 80000,
  serviceFeeCents: 18000,
};
let serviceCommissionRate = 0.15;
let shopCommissionRate = 0.12;
let shopShippingFeeCents = 999;

const runtimeConfig = window.PETGLOBAL_CONFIG || {};
const apiBaseUrl = String(runtimeConfig.apiBaseUrl || "").replace(/\/$/, "");

function apiUrl(path) {
  return `${apiBaseUrl}${path}`;
}

function assetUrl(url) {
  if (!url || /^https?:\/\//i.test(url) || url.startsWith("/assets/")) return url;
  return apiUrl(url);
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
    shop: "商店",
    merchant: "发布",
    services: "服务",
    bookings: "预约",
    transactions: "交易",
    messages: "消息",
    wallet: "钱包",
    compliance: "合规",
    revenue: "收益",
    live_marketplace: "LIVE MARKETPLACE",
    market_title: "全球认证宠物市场",
    shop_title: "宠物食品玩具与用品商店",
    merchant_title: "商家发布与推广",
    services_title: "洗护寄养与宠物服务",
    bookings_title: "服务预约与验收",
    transactions_title: "交易流水与托管状态",
    messages_title: "平台消息中心",
    wallet_title: "商家钱包与结算",
    compliance_title: "跨境合规审查",
    revenue_title: "手续费收益模型",
    search_placeholder: "搜索品种、国家、卖家、服务",
    currency: "货币",
    publish_pet: "发布宠物",
    publish_product: "上架商品",
    active_items: "在售宠物/服务",
    monthly_gmv: "本月成交额",
    platform_fees: "平台手续费",
    compliance_pass_rate: "合规通过率",
    all: "全部",
    all_products: "全部商品",
    shop_food: "宠物食品",
    shop_toys: "宠物玩具",
    shop_clothing: "宠物衣服",
    shop_housing: "窝垫笼具",
    shop_health: "健康用品",
    shop_grooming: "洗护用品",
    shop_travel: "出行用品",
    shop_other: "其他用品",
    dogs: "犬类",
    cats: "猫类",
    small_mammal: "小型哺乳",
    birds: "鸟类",
    equine: "马匹",
    reptiles: "爬行动物",
    aquatic: "水族鱼类",
    amphibians: "两栖动物",
    invertebrates: "昆虫节肢",
    farm_animals: "农场动物",
    exotic_pets: "异宠",
    other_species: "其他",
    view: "查看",
    pet_detail: "宠物详情",
    open_pet_detail: "查看宠物详情",
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
    continue_payment: "继续付款",
    stripe_connect_setup: "连接 Stripe 收款",
    stripe_connect_country: "Stripe 国家代码",
    stripe_connect_hint: "完成 Stripe Connect 后，平台可把已释放订单款打给卖家。",
    stripe_connect_failed: "Stripe 收款账户连接失败",
    no_transactions: "暂无交易。",
    no_products: "暂无匹配商品",
    adjust_shop_filters: "换一个商品分类或关键词再试。",
    product_title: "商品名称",
    product_category: "商品分类",
    product_description: "商品描述",
    product_image: "商品图片",
    product_stock: "库存",
    stock_left: "库存",
    buy_now: "立即购买",
    shop_checkout: "购买商品",
    shop_order: "商品订单",
    submit_product: "提交商品",
    submit_shop_order: "提交商品订单",
    quantity: "数量",
    shipping_country: "收货国家",
    shipping_city: "收货城市",
    shipping_address: "收货地址",
    shop_summary_title: "商品金额由后台按库存和运费重新计算",
    product_subtotal: "商品小计",
    shipping_fee: "配送费",
    shop_platform_fee: "商品平台佣金",
    product_publish_failed: "商品上架失败",
    shop_order_failed: "商品订单创建失败",
    service_hero_title: "交易之外，也能预约洗护、寄养和接送服务",
    service_hero_body: "用户下单后进入平台记录，服务完成后再结算给服务者。",
    all_services: "全部服务",
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
    service_check_groom: "洗护服务记录皮肤、耳道和异常情况",
    service_check_pickup: "接送交接必须拍摄运输箱和芯片核对视频",
    service_check_settle: "服务完成后进入平台结算队列",
    no_bookings: "暂无预约",
    submit_from_services: "从服务页提交一个预约。",
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
    compliance_files: "证明文件",
    seller_identity: "卖家实名",
    microchip_id: "芯片编号",
    export_country: "出口国家",
    import_country: "进口国家",
    vaccine_record: "疫苗记录",
    chip_certificate: "芯片证明",
    health_certificate: "健康证明",
    export_permit: "出口/进口许可",
    compliance_country: "买卖双方国家进口/出口规则",
    compliance_transport: "运输商资质、航线、福利检查点",
    fee_calculator: "手续费计算",
    sale_price: "成交价",
    platform_rate: "平台费率",
    commission_policy_note: "低于 {low} 抽 {lowRate}，{low}-{high} 抽 {midRate}，高于 {high} 抽 {highRate}，佣金封顶 {cap}。",
    compliance_service_fee: "跨境合规服务费",
    platform_commission: "平台佣金",
    total_income: "总收入",
    close: "关闭",
    submit_review: "提交审核",
    pet_species: "宠物种类",
    breed: "品种",
    price_usd: "价格 USD",
    demo_data: "演示数据",
    account: "账户",
    service_provider: "认证服务者",
    request_failed: "请求失败",
    booking_failed: "提交预约失败",
    t_plus_one_review: "T+1 复核",
    pet_trade: "宠物交易",
    shop_sales: "商品销售",
    care_services: "宠物服务",
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
    packed: "已打包",
    shipped: "已发货",
    refunded: "已退款",
    rejected: "已拒绝",
    network_error: "不好意思，网络有点差，再试一下？",
    trade_create_failed: "创建托管交易失败",
    order_update_failed: "更新订单失败",
    review_failed: "审核失败",
    publish_failed: "发布失败",
    welcome_title: "欢迎来到 PetGlobal",
    welcome_body: "交易、服务预约、健康档案、售后和监管消息会集中显示在这里。",
    receive_check_title: "收宠验收提醒",
    receive_check_body: "收宠时请拍完整开箱视频，并核对芯片编号和健康档案。",
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
    service_note: "请提前说明宠物性格和注意事项",
    detail_overview: "基础信息",
    detail_trade_terms: "交易与结算",
    detail_compliance_docs: "合规资料",
    detail_route: "运输路线",
    detail_seller: "卖家信息",
    detail_age: "年龄",
    detail_status: "当前状态",
    detail_risk: "风险等级",
    detail_compliance_status: "合规状态",
    low: "低",
    medium: "中",
    high: "高",
    pending: "待处理",
    start_escrow_trade: "发起托管交易",
    merchant_cta_auth: "商家发布",
    merchant_back_login: "登录交易台",
    merchant_public_eyebrow: "SELL ON PETGLOBAL",
    merchant_hero_title: "发布到 PetGlobal，面向全球买家销售宠物与宠物用品",
    merchant_hero_body: "把犬舍猫舍、宠物食品、玩具衣服、洗护服务和跨境运输合规放到同一个可信交易平台，订单、托管付款、审核和提现都能集中管理。",
    merchant_primary_cta: "申请发布",
    merchant_secondary_cta: "查看费用",
    merchant_fee_title: "平台抽成清晰透明",
    merchant_pet_fee: "活体宠物：分档抽成 10% / 8% / 6%，每单佣金封顶 $800，跨境合规服务费 $180",
    merchant_shop_fee: "宠物食品、玩具、衣服、用品：每单抽成 12%，运费由订单另计",
    merchant_service_fee: "洗护、寄养、接送服务：每单抽成 15%",
    merchant_sales_channels: "可招商家类型",
    merchant_type_breeder: "犬舍、猫舍、繁育商",
    merchant_type_supplies: "宠物食品、玩具、衣服、用品品牌",
    merchant_type_service_provider: "洗护、寄养、训练和接送服务",
    merchant_type_logistics: "宠物运输与跨境合规服务",
    merchant_type_clinic: "宠物医院、疫苗和健康证明机构",
    merchant_type_other: "其他宠物相关商家",
    merchant_benefit_escrow_title: "托管交易降低纠纷",
    merchant_benefit_escrow_body: "买家付款先进入平台托管，验收完成后再进入结算。",
    merchant_benefit_verified_title: "认证资料展示",
    merchant_benefit_verified_body: "支持商家实名认证、疫苗、芯片、健康证、进出口文件上传。",
    merchant_benefit_i18n_title: "多语言全球展示",
    merchant_benefit_i18n_body: "中文、英文自动切换，后续可扩展更多国家语言。",
    merchant_benefit_ops_title: "库存与订单管理",
    merchant_benefit_ops_body: "宠物信息、用品库存、服务预约和提现记录集中管理。",
    merchant_process_title: "发布流程",
    merchant_process_apply: "提交资料",
    merchant_process_review: "平台审核",
    merchant_process_list: "上架商品",
    merchant_process_settle: "订单结算",
    merchant_metric_global: "全球买家入口",
    merchant_metric_settlement: "托管/提现流程",
    merchant_metric_categories: "宠物+用品+服务",
    merchant_lead_title: "提交商家发布申请",
    merchant_lead_body: "留下经营信息后，平台会根据国家地区、品类和合规资料安排人工审核。",
    merchant_business_name: "商家/品牌名称",
    merchant_contact_name: "联系人",
    merchant_email: "邮箱",
    merchant_phone: "WhatsApp/电话",
    merchant_country_region: "国家/地区",
    merchant_business_type: "经营类型",
    merchant_expected_category: "计划上架",
    merchant_monthly_capacity: "月可供应数量",
    merchant_message: "补充说明",
    merchant_business_placeholder: "例如 Kiwi Hills Kennel",
    merchant_contact_placeholder: "你的姓名",
    merchant_email_placeholder: "merchant@example.com",
    merchant_phone_placeholder: "+1 555 0199",
    merchant_country_placeholder: "United States",
    merchant_message_placeholder: "说明主营品类、资质文件、目标市场或合作需求",
    merchant_expected_pets: "活体宠物",
    merchant_expected_supplies: "宠物食品/玩具/衣服/用品",
    merchant_expected_services: "洗护/寄养/接送服务",
    merchant_expected_logistics: "运输/进出口合规",
    merchant_expected_multiple: "多品类经营",
    merchant_capacity_1: "1-10 单/月",
    merchant_capacity_2: "11-50 单/月",
    merchant_capacity_3: "51-200 单/月",
    merchant_capacity_4: "200+ 单/月",
    merchant_submit: "提交申请",
    merchant_success: "已提交，平台将在 1-2 个工作日联系你。",
    merchant_failed: "申请提交失败",
    merchant_lead_notice: "提交后管理员可在后台查看线索，用于实名认证和类目审核。",
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
    shop: "Shop",
    merchant: "Publish",
    services: "Care",
    bookings: "Bookings",
    transactions: "Trades",
    messages: "Messages",
    wallet: "Wallet",
    compliance: "Compliance",
    revenue: "Revenue",
    live_marketplace: "LIVE MARKETPLACE",
    market_title: "Global Verified Pet Market",
    shop_title: "Pet Food, Toys and Supplies Store",
    merchant_title: "Seller Publishing and Promotion",
    services_title: "Grooming, Boarding and Pet Care",
    bookings_title: "Service Bookings and Acceptance",
    transactions_title: "Escrow Trades and Order Flow",
    messages_title: "Platform Message Center",
    wallet_title: "Seller Wallet and Settlement",
    compliance_title: "Cross-Border Compliance Review",
    revenue_title: "Commission Revenue Model",
    search_placeholder: "Search breed, country, seller, service",
    currency: "Currency",
    publish_pet: "Publish pet",
    publish_product: "List product",
    active_items: "Active pets/services",
    monthly_gmv: "Monthly GMV",
    platform_fees: "Platform fees",
    compliance_pass_rate: "Compliance pass rate",
    all: "All",
    all_products: "All products",
    shop_food: "Pet food",
    shop_toys: "Pet toys",
    shop_clothing: "Pet clothing",
    shop_housing: "Beds and housing",
    shop_health: "Health supplies",
    shop_grooming: "Grooming supplies",
    shop_travel: "Travel gear",
    shop_other: "Other supplies",
    dogs: "Dogs",
    cats: "Cats",
    small_mammal: "Small mammals",
    birds: "Birds",
    equine: "Equine",
    reptiles: "Reptiles",
    aquatic: "Aquatic fish",
    amphibians: "Amphibians",
    invertebrates: "Insects and arthropods",
    farm_animals: "Farm animals",
    exotic_pets: "Exotic pets",
    other_species: "Other",
    view: "View",
    pet_detail: "Pet detail",
    open_pet_detail: "View pet detail",
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
    continue_payment: "Continue payment",
    stripe_connect_setup: "Connect Stripe payouts",
    stripe_connect_country: "Stripe country code",
    stripe_connect_hint: "After Stripe Connect onboarding, released order funds can be transferred to the seller.",
    stripe_connect_failed: "Stripe payout setup failed",
    no_transactions: "No trades yet.",
    no_products: "No matching products",
    adjust_shop_filters: "Try another product category or keyword.",
    product_title: "Product name",
    product_category: "Product category",
    product_description: "Product description",
    product_image: "Product image",
    product_stock: "Stock",
    stock_left: "Stock",
    buy_now: "Buy now",
    shop_checkout: "Buy product",
    shop_order: "Shop order",
    submit_product: "Submit product",
    submit_shop_order: "Submit shop order",
    quantity: "Quantity",
    shipping_country: "Shipping country",
    shipping_city: "Shipping city",
    shipping_address: "Shipping address",
    shop_summary_title: "Product total is recalculated by backend with stock and shipping",
    product_subtotal: "Product subtotal",
    shipping_fee: "Shipping fee",
    shop_platform_fee: "Product platform commission",
    product_publish_failed: "Failed to list product",
    shop_order_failed: "Failed to create shop order",
    service_hero_title: "Book grooming, boarding and pickup beyond pet trades",
    service_hero_body: "Bookings are recorded on-platform and providers settle after completion.",
    all_services: "All services",
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
    compliance_files: "Compliance files",
    seller_identity: "Seller identity",
    microchip_id: "Microchip ID",
    export_country: "Export country",
    import_country: "Import country",
    vaccine_record: "Vaccine record",
    chip_certificate: "Chip certificate",
    health_certificate: "Health certificate",
    export_permit: "Export/import permit",
    compliance_country: "Buyer/seller import and export rules by country",
    compliance_transport: "Transport provider, route and welfare checkpoints",
    fee_calculator: "Fee calculator",
    sale_price: "Sale price",
    platform_rate: "Platform rate",
    commission_policy_note: "Under {low}: {lowRate}; {low}-{high}: {midRate}; above {high}: {highRate}; commission capped at {cap}.",
    compliance_service_fee: "Cross-border compliance service fee",
    platform_commission: "Platform commission",
    total_income: "Total income",
    close: "Close",
    submit_review: "Submit for review",
    pet_species: "Pet species",
    breed: "Breed",
    price_usd: "Price USD",
    demo_data: "Demo data",
    account: "account",
    service_provider: "Verified provider",
    request_failed: "Request failed",
    booking_failed: "Failed to submit booking",
    t_plus_one_review: "T+1 review",
    pet_trade: "Pet trade",
    shop_sales: "Shop sales",
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
    packed: "Packed",
    shipped: "Shipped",
    refunded: "Refunded",
    rejected: "Rejected",
    network_error: "Sorry, network error, please try again.",
    trade_create_failed: "Failed to create escrow trade",
    order_update_failed: "Failed to update order",
    review_failed: "Review failed",
    publish_failed: "Publish failed",
    welcome_title: "Welcome to PetGlobal",
    welcome_body: "Trades, service bookings, health records, after-sales and regulatory messages appear here.",
    receive_check_title: "Pet acceptance reminder",
    receive_check_body: "Record a complete unboxing video and verify the chip number and health file.",
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
    service_note: "Please share pet temperament and special care notes in advance",
    detail_overview: "Overview",
    detail_trade_terms: "Trade and settlement",
    detail_compliance_docs: "Compliance documents",
    detail_route: "Transport route",
    detail_seller: "Seller information",
    detail_age: "Age",
    detail_status: "Current status",
    detail_risk: "Risk level",
    detail_compliance_status: "Compliance status",
    low: "Low",
    medium: "Medium",
    high: "High",
    pending: "Pending",
    start_escrow_trade: "Start escrow trade",
    merchant_cta_auth: "Seller publishing",
    merchant_back_login: "Log in to workspace",
    merchant_public_eyebrow: "SELL ON PETGLOBAL",
    merchant_hero_title: "Publish on PetGlobal and sell pets and pet supplies to global buyers",
    merchant_hero_body: "Put breeders, pet food, toys, clothing, care services, and cross-border logistics compliance into one trusted trading platform with orders, escrow payment, reviews, and payouts managed together.",
    merchant_primary_cta: "Apply to publish",
    merchant_secondary_cta: "View fees",
    merchant_fee_title: "Transparent platform commission",
    merchant_pet_fee: "Live pets: tiered commission at 10% / 8% / 6%, capped at $800 per order, plus $180 cross-border compliance service fee",
    merchant_shop_fee: "Pet food, toys, clothing, and supplies: 12% commission per order, shipping charged separately",
    merchant_service_fee: "Grooming, boarding, and pickup services: 15% commission per booking",
    merchant_sales_channels: "Merchant categories",
    merchant_type_breeder: "Dog and cat breeders",
    merchant_type_supplies: "Pet food, toy, clothing, and supplies brands",
    merchant_type_service_provider: "Grooming, boarding, training, and pickup services",
    merchant_type_logistics: "Pet transport and cross-border compliance providers",
    merchant_type_clinic: "Clinics, vaccine, and health certificate providers",
    merchant_type_other: "Other pet-related businesses",
    merchant_benefit_escrow_title: "Escrow reduces disputes",
    merchant_benefit_escrow_body: "Buyer funds are held by the platform and enter settlement after acceptance.",
    merchant_benefit_verified_title: "Verified business profile",
    merchant_benefit_verified_body: "Seller identity, vaccine records, chip certificates, health files, and import/export documents are supported.",
    merchant_benefit_i18n_title: "Global multilingual display",
    merchant_benefit_i18n_body: "Chinese and English switch automatically, with more languages extendable later.",
    merchant_benefit_ops_title: "Inventory and order operations",
    merchant_benefit_ops_body: "Manage pet listings, product stock, service bookings, and payout records in one place.",
    merchant_process_title: "Publishing flow",
    merchant_process_apply: "Submit profile",
    merchant_process_review: "Platform review",
    merchant_process_list: "List products",
    merchant_process_settle: "Settle orders",
    merchant_metric_global: "Global buyer entry",
    merchant_metric_settlement: "Escrow and payouts",
    merchant_metric_categories: "Pets + supplies + services",
    merchant_lead_title: "Submit seller application",
    merchant_lead_body: "Leave your business details and the platform will review country, category, and compliance requirements manually.",
    merchant_business_name: "Business / brand name",
    merchant_contact_name: "Contact name",
    merchant_email: "Email",
    merchant_phone: "WhatsApp / phone",
    merchant_country_region: "Country / region",
    merchant_business_type: "Business type",
    merchant_expected_category: "Planned listings",
    merchant_monthly_capacity: "Monthly capacity",
    merchant_message: "Additional notes",
    merchant_business_placeholder: "e.g. Kiwi Hills Kennel",
    merchant_contact_placeholder: "Your name",
    merchant_email_placeholder: "merchant@example.com",
    merchant_phone_placeholder: "+1 555 0199",
    merchant_country_placeholder: "United States",
    merchant_message_placeholder: "Describe categories, compliance files, target markets, or partnership needs",
    merchant_expected_pets: "Live pets",
    merchant_expected_supplies: "Pet food / toys / clothing / supplies",
    merchant_expected_services: "Grooming / boarding / pickup services",
    merchant_expected_logistics: "Transport / import-export compliance",
    merchant_expected_multiple: "Multiple categories",
    merchant_capacity_1: "1-10 orders/month",
    merchant_capacity_2: "11-50 orders/month",
    merchant_capacity_3: "51-200 orders/month",
    merchant_capacity_4: "200+ orders/month",
    merchant_submit: "Submit application",
    merchant_success: "Submitted. The platform will contact you within 1-2 business days.",
    merchant_failed: "Application submission failed",
    merchant_lead_notice: "After submission, admins can review the lead for identity and category checks.",
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

const listingSpeciesOptions = [
  ["Dog", "dogs"],
  ["Cat", "cats"],
  ["Small mammal", "small_mammal"],
  ["Bird", "birds"],
  ["Equine", "equine"],
  ["Reptile", "reptiles"],
  ["Aquatic", "aquatic"],
  ["Amphibian", "amphibians"],
  ["Invertebrate", "invertebrates"],
  ["Farm animal", "farm_animals"],
  ["Exotic pet", "exotic_pets"],
  ["Other", "other_species"],
];

const shopCategoryOptions = [
  ["food", "shop_food"],
  ["toys", "shop_toys"],
  ["clothing", "shop_clothing"],
  ["housing", "shop_housing"],
  ["health", "shop_health"],
  ["grooming", "shop_grooming"],
  ["travel", "shop_travel"],
  ["other", "shop_other"],
];

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
  {
    id: "PG-24121",
    name: "Echo",
    species: "Reptile",
    breed: "Leopard Gecko",
    age: "10 months",
    country: "United States",
    seller: "Desert Line Exotics",
    price: 420,
    priceCents: 42000,
    image: "./assets/hero.png",
    docs: ["Health cert", "Seller ID", "Import screen"],
    status: "review",
    route: "Phoenix -> Los Angeles",
    risk: "medium",
  },
  {
    id: "PG-24127",
    name: "Nami",
    species: "Aquatic",
    breed: "Koi Carp",
    age: "18 months",
    country: "Japan",
    seller: "Kyoto Pond Farm",
    price: 960,
    priceCents: 96000,
    image: "./assets/carecat.png",
    docs: ["Aquatic health cert", "Seller ID"],
    status: "approved",
    route: "Osaka -> Honolulu -> San Francisco",
    risk: "low",
  },
  {
    id: "PG-24132",
    name: "Clover",
    species: "Farm animal",
    breed: "Nigerian Dwarf Goat",
    age: "8 months",
    country: "Ireland",
    seller: "Green Pasture Farm",
    price: 1300,
    priceCents: 130000,
    image: "./assets/golden.png",
    docs: ["Vet exam", "Movement permit", "Seller ID"],
    status: "review",
    route: "Dublin -> London -> Boston",
    risk: "medium",
  },
];

const fallbackServices = [
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

const fallbackProducts = [
  {
    id: "PR-FOOD-001",
    seller: "Kiwi Hills Kennel",
    title: "Grain-free puppy food",
    category: "food",
    description: "High-protein dry food for puppies and active young dogs.",
    price: 34.99,
    priceCents: 3499,
    stock: 28,
    image: "./assets/golden.png",
    status: "active",
  },
  {
    id: "PR-TOY-001",
    seller: "Kiwi Hills Kennel",
    title: "Puzzle treat toy",
    category: "toys",
    description: "Interactive treat toy for daily enrichment and slower meals.",
    price: 18.99,
    priceCents: 1899,
    stock: 46,
    image: "./assets/hero.png",
    status: "active",
  },
  {
    id: "PR-CLOTH-001",
    seller: "Kiwi Hills Kennel",
    title: "Waterproof pet jacket",
    category: "clothing",
    description: "Lightweight rain jacket with reflective trim for outdoor walks.",
    price: 42.99,
    priceCents: 4299,
    stock: 18,
    image: "./assets/dog.jpg",
    status: "active",
  },
  {
    id: "PR-HOME-001",
    seller: "Tokyo Cattery Co.",
    title: "Washable pet bed",
    category: "housing",
    description: "Soft washable bed suitable for cats and small dogs.",
    price: 56.99,
    priceCents: 5699,
    stock: 12,
    image: "./assets/cat.jpg",
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

const fallbackShopOrders = [];

const fallbackBookings = [
  {
    id: "BK-DEMO-001",
    serviceId: "SV-CARE-001",
    serviceTitle: "Short-Term Boarding and Health Care",
    buyer: "Demo Buyer",
    provider: "Kiwi Hills Kennel",
    petName: "Tuantuan",
    contactPhone: "13800000000",
    serviceTime: "Today 18:00",
    note: "Please share pet temperament and special care notes in advance",
    amount: 46,
    commission: 6.9,
    providerPayout: 39.1,
    status: "requested",
  },
];

const fallbackMessages = [
  {
    id: "MSG-WELCOME",
    title: "欢迎来到 PetGlobal",
    body: "交易、服务预约、健康档案、售后和监管消息会集中显示在这里。",
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
  shopFilter: "all",
  serviceFilter: "all",
  query: "",
  currency: "USD",
  selectedId: fallbackListings[0].id,
  selectedProductId: fallbackProducts[0].id,
  selectedServiceId: fallbackServices[0].id,
  listings: [...fallbackListings],
  products: [...fallbackProducts],
  services: allowedServices([...fallbackServices]),
  orders: [...fallbackOrders],
  shopOrders: [...fallbackShopOrders],
  bookings: allowedBookings([...fallbackBookings], allowedServices([...fallbackServices])),
  messages: [...fallbackMessages],
  wallet: null,
  apiOnline: false,
};

const authShell = document.querySelector("#authShell");
const appShell = document.querySelector("#appShell");
const merchantPublicShell = document.querySelector("#merchantPublicShell");
const merchantPublicLanding = document.querySelector("#merchantPublicLanding");
const merchantLanding = document.querySelector("#merchantLanding");
const loginForm = document.querySelector("#loginForm");
const emailInput = loginForm.querySelector('input[type="email"]');
const passwordInput = loginForm.querySelector('input[type="password"]');
const roleSelect = document.querySelector("#roleSelect");
const openMerchantLandingBtn = document.querySelector("#openMerchantLandingBtn");
const merchantBackToLoginBtn = document.querySelector("#merchantBackToLoginBtn");
const accountRole = document.querySelector("#accountRole");
const logoutBtn = document.querySelector("#logoutBtn");
const listingGrid = document.querySelector("#listingGrid");
const dealPanel = document.querySelector("#dealPanel");
const filterButtons = [...document.querySelectorAll(".filter-pill[data-filter]")];
const shopFilterButtons = [...document.querySelectorAll(".filter-pill[data-shop-filter]")];
const serviceFilterButtons = [...document.querySelectorAll(".filter-pill[data-service-filter]")];
const searchInput = document.querySelector("#searchInput");
const currencySelect = document.querySelector("#currencySelect");
const navItems = [...document.querySelectorAll(".nav-item")];
const viewTitle = document.querySelector("#viewTitle");
const transactionBody = document.querySelector("#transactionBody");
const shopGrid = document.querySelector("#shopGrid");
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
const checkoutForm = document.querySelector("#checkoutPageForm");
const checkoutDialogTitle = document.querySelector("#checkoutDialogTitle");
const checkoutSummary = document.querySelector("#checkoutPageSummary");
const checkoutPageTitle = document.querySelector("#checkoutPageTitle");
const checkoutBackBtn = document.querySelector("#checkoutBackBtn");
const checkoutBackText = document.querySelector("#checkoutBackText");
const checkoutPageImage = document.querySelector("#checkoutPageImage");
const petDetailDialog = document.querySelector("#petDetailDialog");
const petDetailDialogTitle = document.querySelector("#petDetailDialogTitle");
const petDetailContent = document.querySelector("#petDetailContent");
const petDetailCloseBtn = document.querySelector("#petDetailCloseBtn");
const newListingBtn = document.querySelector("#newListingBtn");
const newProductBtn = document.querySelector("#newProductBtn");
const listingForm = document.querySelector("#listingForm");
const listingCloseBtn = document.querySelector("#listingCloseBtn");
const productDialog = document.querySelector("#productDialog");
const productForm = document.querySelector("#productForm");
const productCloseBtn = document.querySelector("#productCloseBtn");
const shopCheckoutDialog = document.querySelector("#shopCheckoutDialog");
const shopCheckoutForm = document.querySelector("#shopCheckoutForm");
const shopCheckoutDialogTitle = document.querySelector("#shopCheckoutDialogTitle");
const shopCheckoutSummary = document.querySelector("#shopCheckoutSummary");
const shopCheckoutCloseBtn = document.querySelector("#shopCheckoutCloseBtn");
const bookingCloseBtn = document.querySelector("#bookingCloseBtn");
const checkoutDialogCloseBtn = document.querySelector("#checkoutDialogCloseBtn");
const langSwitch = document.querySelector("#langSwitch");
const langSelect = document.querySelector("#langSelect");

const serviceI18nMap = {
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
  if (type === "shop-order") return t("shop_sales");
  return type;
}

function commissionRateForPrice(priceCents) {
  if (priceCents < commissionPolicy.lowThresholdCents) return commissionPolicy.lowRate;
  if (priceCents <= commissionPolicy.highThresholdCents) return commissionPolicy.midRate;
  return commissionPolicy.highRate;
}

function percentLabel(rate) {
  const percent = Number(rate || 0) * 100;
  return `${percent.toFixed(percent % 1 ? 1 : 0)}%`;
}

function commissionPolicyText() {
  return t("commission_policy_note")
    .replaceAll("{low}", money(commissionPolicy.lowThresholdCents / 100))
    .replaceAll("{high}", money(commissionPolicy.highThresholdCents / 100))
    .replace("{lowRate}", percentLabel(commissionPolicy.lowRate))
    .replace("{midRate}", percentLabel(commissionPolicy.midRate))
    .replace("{highRate}", percentLabel(commissionPolicy.highRate))
    .replace("{cap}", money(commissionPolicy.capCents / 100));
}

function orderAmounts(listing) {
  const price = Number(listing?.price || 0);
  const priceCents = Math.round(price * 100);
  const commissionRate = commissionRateForPrice(priceCents);
  const rawCommissionCents = Math.round(priceCents * commissionRate);
  const commissionCents = commissionPolicy.capCents > 0
    ? Math.min(rawCommissionCents, commissionPolicy.capCents)
    : rawCommissionCents;
  const serviceFee = Number((commissionPolicy.serviceFeeCents / 100).toFixed(2));
  const commission = Number((commissionCents / 100).toFixed(2));
  const fee = Number((commission + serviceFee).toFixed(2));
  const sellerPayout = Number((price - price * 0.015).toFixed(2));
  const totalDue = Number((price + fee).toFixed(2));
  return { price, commission, commissionRate, serviceFee, fee, sellerPayout, totalDue };
}

function shopOrderAmounts(product, quantity = 1) {
  const price = Number(product?.price || 0);
  const qty = Math.max(1, Number(quantity || 1));
  const subtotal = Number((price * qty).toFixed(2));
  const commission = Number((subtotal * shopCommissionRate).toFixed(2));
  const shipping = Number((shopShippingFeeCents / 100).toFixed(2));
  const sellerPayout = Number((subtotal - commission).toFixed(2));
  const totalDue = Number((subtotal + shipping).toFixed(2));
  return { price, quantity: qty, subtotal, commission, shipping, sellerPayout, totalDue };
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
  if (value === "Please share pet temperament and special care notes in advance") return t("service_note");
  return value;
}

function money(value, currency = state.currency) {
  const converted = Number(value || 0) * rates[currency];
  return `${symbols[currency]}${converted.toLocaleString(undefined, {
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  })}`;
}

async function apiFetch(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const headers = {
    "Accept-Language": currentLang,
    ...(options.headers || {}),
  };
  if (!isFormData) headers["Content-Type"] = "application/json";
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

function selectedProduct() {
  return state.products.find((product) => product.id === state.selectedProductId) || state.products[0];
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

function filteredProducts() {
  return state.products.filter((product) => {
    const matchesFilter = state.shopFilter === "all" || product.category === state.shopFilter;
    const haystack = `${product.title} ${product.description} ${product.category} ${product.seller}`.toLowerCase();
    return matchesFilter && haystack.includes(state.query.toLowerCase());
  });
}

function filteredServices() {
  return state.services.filter((service) => {
    if (service.category === "feeding") return false;
    const matchesFilter = state.serviceFilter === "all" || service.category === state.serviceFilter;
    const haystack = `${serviceTitle(service)} ${serviceSummary(service)} ${serviceTags(service).join(" ")} ${service.title} ${service.summary} ${service.city} ${service.provider}`.toLowerCase();
    return matchesFilter && haystack.includes(state.query.toLowerCase());
  });
}

function allowedServices(services = []) {
  return services.filter((service) => service.category !== "feeding" && service.id !== "SV-FEED-001");
}

function allowedBookings(bookings = [], services = []) {
  return bookings.filter((booking) => {
    if (booking.serviceId === "SV-FEED-001") return false;
    const service = services.find((item) => item.id === booking.serviceId);
    return !service || service.category !== "feeding";
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

function renderSpeciesSelect(select) {
  if (!select) return;
  const selected = select.value || "Dog";
  select.innerHTML = listingSpeciesOptions
    .map(([value, key]) => `<option value="${value}">${t(key)}</option>`)
    .join("");
  select.value = selected;
}

function renderShopCategorySelect(select) {
  if (!select) return;
  const selected = select.value || "food";
  select.innerHTML = shopCategoryOptions
    .map(([value, key]) => `<option value="${value}">${t(key)}</option>`)
    .join("");
  select.value = selected;
}

function merchantLandingMarkup(context = "app") {
  const prefix = context === "public" ? "public" : "app";
  const benefits = [
    ["shield-check", "merchant_benefit_escrow_title", "merchant_benefit_escrow_body"],
    ["badge-check", "merchant_benefit_verified_title", "merchant_benefit_verified_body"],
    ["languages", "merchant_benefit_i18n_title", "merchant_benefit_i18n_body"],
    ["boxes", "merchant_benefit_ops_title", "merchant_benefit_ops_body"],
  ];
  const businessTypes = [
    ["breeder", "merchant_type_breeder"],
    ["supplies", "merchant_type_supplies"],
    ["service_provider", "merchant_type_service_provider"],
    ["logistics", "merchant_type_logistics"],
    ["clinic", "merchant_type_clinic"],
    ["other", "merchant_type_other"],
  ];
  const categories = [
    ["pets", "merchant_expected_pets"],
    ["supplies", "merchant_expected_supplies"],
    ["services", "merchant_expected_services"],
    ["logistics", "merchant_expected_logistics"],
    ["multiple", "merchant_expected_multiple"],
  ];
  const capacities = [
    ["1-10", "merchant_capacity_1"],
    ["11-50", "merchant_capacity_2"],
    ["51-200", "merchant_capacity_3"],
    ["200+", "merchant_capacity_4"],
  ];
  const process = [
    "merchant_process_apply",
    "merchant_process_review",
    "merchant_process_list",
    "merchant_process_settle",
  ];

  return `
    <section class="merchant-landing" data-merchant-context="${context}">
      <div class="merchant-hero">
        <div class="merchant-hero-copy">
          <p class="eyebrow">${t("merchant_public_eyebrow")}</p>
          <h3>${t("merchant_hero_title")}</h3>
          <p>${t("merchant_hero_body")}</p>
          <div class="merchant-hero-actions">
            <a class="primary-action" href="#${prefix}-seller-lead">
              <i data-lucide="send" aria-hidden="true"></i>
              ${t("merchant_primary_cta")}
            </a>
            <a class="secondary-action" href="#${prefix}-merchant-fees">
              <i data-lucide="receipt-text" aria-hidden="true"></i>
              ${t("merchant_secondary_cta")}
            </a>
          </div>
        </div>
        <div class="merchant-hero-visual" aria-hidden="true">
          <img src="./assets/hero.png" alt="" />
          <div class="merchant-metrics">
            <span>${t("merchant_metric_global")}</span>
            <span>${t("merchant_metric_settlement")}</span>
            <span>${t("merchant_metric_categories")}</span>
          </div>
        </div>
      </div>

      <div class="merchant-section-grid">
        <article class="merchant-panel" id="${prefix}-merchant-fees">
          <h3>${t("merchant_fee_title")}</h3>
          <ul class="merchant-fee-list">
            <li><i data-lucide="paw-print" aria-hidden="true"></i><span>${t("merchant_pet_fee")}</span></li>
            <li><i data-lucide="shopping-bag" aria-hidden="true"></i><span>${t("merchant_shop_fee")}</span></li>
            <li><i data-lucide="hand-heart" aria-hidden="true"></i><span>${t("merchant_service_fee")}</span></li>
          </ul>
        </article>
        <article class="merchant-panel">
          <h3>${t("merchant_sales_channels")}</h3>
          <div class="merchant-chip-grid">
            ${businessTypes.map(([, key]) => `<span>${t(key)}</span>`).join("")}
          </div>
        </article>
      </div>

      <div class="merchant-benefits">
        ${benefits
          .map(
            ([icon, titleKey, bodyKey]) => `
              <article>
                <i data-lucide="${icon}" aria-hidden="true"></i>
                <h3>${t(titleKey)}</h3>
                <p>${t(bodyKey)}</p>
              </article>
            `,
          )
          .join("")}
      </div>

      <div class="merchant-process">
        <h3>${t("merchant_process_title")}</h3>
        <div>
          ${process
            .map(
              (key, index) => `
                <span>
                  <strong>${index + 1}</strong>
                  ${t(key)}
                </span>
              `,
            )
            .join("")}
        </div>
      </div>

      <div class="merchant-lead-layout" id="${prefix}-seller-lead">
        <div class="merchant-lead-copy">
          <p class="eyebrow">${t("merchant_primary_cta")}</p>
          <h3>${t("merchant_lead_title")}</h3>
          <p>${t("merchant_lead_body")}</p>
          <p class="merchant-notice">${t("merchant_lead_notice")}</p>
        </div>
        <form class="merchant-lead-form" data-merchant-lead-form="${context}">
          <label>
            ${t("merchant_business_name")}
            <input name="businessName" placeholder="${t("merchant_business_placeholder")}" required />
          </label>
          <div class="form-grid two-cols">
            <label>
              ${t("merchant_contact_name")}
              <input name="contactName" placeholder="${t("merchant_contact_placeholder")}" required />
            </label>
            <label>
              ${t("merchant_email")}
              <input name="email" type="email" placeholder="${t("merchant_email_placeholder")}" required />
            </label>
            <label>
              ${t("merchant_phone")}
              <input name="phone" placeholder="${t("merchant_phone_placeholder")}" required />
            </label>
            <label>
              ${t("merchant_country_region")}
              <input name="country" placeholder="${t("merchant_country_placeholder")}" required />
            </label>
            <label>
              ${t("merchant_business_type")}
              <select name="businessType">
                ${businessTypes.map(([value, key]) => `<option value="${value}">${t(key)}</option>`).join("")}
              </select>
            </label>
            <label>
              ${t("merchant_expected_category")}
              <select name="expectedCategory">
                ${categories.map(([value, key]) => `<option value="${value}">${t(key)}</option>`).join("")}
              </select>
            </label>
          </div>
          <label>
            ${t("merchant_monthly_capacity")}
            <select name="monthlyCapacity">
              ${capacities.map(([value, key]) => `<option value="${value}">${t(key)}</option>`).join("")}
            </select>
          </label>
          <label>
            ${t("merchant_message")}
            <textarea name="message" rows="4" placeholder="${t("merchant_message_placeholder")}"></textarea>
          </label>
          <button class="primary-action" type="submit">
            <i data-lucide="send" aria-hidden="true"></i>
            ${t("merchant_submit")}
          </button>
          <p class="form-status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;
}

function bindMerchantLeadForms(root = document) {
  root.querySelectorAll("[data-merchant-lead-form]").forEach((form) => {
    form.addEventListener("submit", submitMerchantLead);
  });
}

function renderMerchantLanding() {
  if (merchantLanding) {
    merchantLanding.innerHTML = merchantLandingMarkup("app");
    bindMerchantLeadForms(merchantLanding);
  }
  if (merchantPublicLanding) {
    merchantPublicLanding.innerHTML = merchantLandingMarkup("public");
    bindMerchantLeadForms(merchantPublicLanding);
  }
}

function showMerchantPublicPage() {
  state.authed = false;
  authShell.classList.add("is-hidden");
  appShell.classList.add("is-hidden");
  merchantPublicShell.classList.remove("is-hidden");
  render();
  window.history.replaceState({}, "", "#merchant");
}

function showLoginPage() {
  merchantPublicShell.classList.add("is-hidden");
  appShell.classList.add("is-hidden");
  authShell.classList.remove("is-hidden");
  window.history.replaceState({}, "", window.location.pathname);
  render();
}

function renderAllPageText() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.title = currentLang === "zh" ? "PetGlobal Trade - 全球宠物交易与宠物服务" : "PetGlobal Trade - Global Pet Trade and Care";
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
  if (openMerchantLandingBtn) openMerchantLandingBtn.lastChild.textContent = ` ${t("merchant_cta_auth")}`;
  if (merchantBackToLoginBtn) merchantBackToLoginBtn.lastChild.textContent = ` ${t("merchant_back_login")}`;
  const trustItems = document.querySelectorAll(".auth-panel .trust-strip span");
  [t("escrow_trade"), t("commission_profit"), t("compliance_review")].forEach((text, index) => {
    if (trustItems[index]) trustItems[index].textContent = text;
  });

  const navLabels = {
    market: "market",
    shop: "shop",
    merchant: "merchant",
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
  newProductBtn.setAttribute("aria-label", t("publish_product"));
  newProductBtn.setAttribute("title", t("publish_product"));

  const metricLabels = document.querySelectorAll(".metrics-grid article span");
  [t("active_items"), t("monthly_gmv"), t("platform_fees"), t("compliance_pass_rate")].forEach((text, index) => {
    if (metricLabels[index]) metricLabels[index].textContent = text;
  });
  const listingFilters = [["all", "all"], ...listingSpeciesOptions];
  listingFilters.forEach(([value, key]) => {
    const button = document.querySelector(`[data-filter="${value}"]`);
    if (button) button.textContent = t(key);
  });
  const shopFilters = [["all", "all_products"], ...shopCategoryOptions];
  shopFilters.forEach(([value, key]) => {
    const button = document.querySelector(`[data-shop-filter="${value}"]`);
    if (button) button.textContent = t(key);
  });

  setText(".service-hero h3", t("service_hero_title"));
  setText(".service-hero p:not(.eyebrow)", t("service_hero_body"));
  const serviceFilters = [
    ["all", "all_services"],
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
  ["service_check_groom", "service_check_pickup", "service_check_settle"].forEach((key, index) => {
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
  setText("#commissionPolicyText", commissionPolicyText());

  const listingLabels = listingForm.querySelectorAll("label");
  setText("#listingForm h3", t("publish_pet"));
  if (listingLabels[0]) listingLabels[0].childNodes[0].textContent = `${t("pet_name")} `;
  if (listingLabels[1]) listingLabels[1].childNodes[0].textContent = `${t("pet_species")} `;
  if (listingLabels[2]) listingLabels[2].childNodes[0].textContent = `${t("breed")} `;
  if (listingLabels[3]) listingLabels[3].childNodes[0].textContent = `${t("country")} `;
  renderSpeciesSelect(listingForm.elements.species);
  const priceLabel = listingForm.querySelector('input[name="price"]')?.closest("label");
  if (priceLabel) priceLabel.childNodes[0].textContent = `${t("price_usd")} `;
  listingForm.querySelector(".primary-action").lastChild.textContent = ` ${t("submit_review")}`;

  const productLabels = productForm.querySelectorAll("label");
  setText("#productForm h3", t("publish_product"));
  if (productLabels[0]) productLabels[0].childNodes[0].textContent = `${t("product_title")} `;
  if (productLabels[1]) productLabels[1].childNodes[0].textContent = `${t("product_category")} `;
  if (productLabels[2]) productLabels[2].childNodes[0].textContent = `${t("product_stock")} `;
  if (productLabels[3]) productLabels[3].childNodes[0].textContent = `${t("product_description")} `;
  if (productLabels[4]) productLabels[4].childNodes[0].textContent = `${t("product_image")} `;
  const productPriceLabel = productForm.querySelector('input[name="price"]')?.closest("label");
  if (productPriceLabel) productPriceLabel.childNodes[0].textContent = `${t("price_usd")} `;
  renderShopCategorySelect(productForm.elements.category);
  productForm.querySelector(".primary-action").lastChild.textContent = ` ${t("submit_product")}`;

  setText("#checkoutDialogTitle", t("checkout_order"));
  setText("#checkoutPageTitle", t("checkout_order"));
  setText("#checkoutBackText", currentLang === "zh" ? "\u8fd4\u56de\u5e02\u573a" : "Back to market");
  setText("#petDetailDialogTitle", t("pet_detail"));
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

  setText("#shopCheckoutDialogTitle", t("shop_checkout"));
  const shopCheckoutLabels = shopCheckoutForm.querySelectorAll("label");
  if (shopCheckoutLabels[0]) shopCheckoutLabels[0].childNodes[0].textContent = `${t("quantity")} `;
  if (shopCheckoutLabels[1]) shopCheckoutLabels[1].childNodes[0].textContent = `${t("contact_name")} `;
  if (shopCheckoutLabels[2]) shopCheckoutLabels[2].childNodes[0].textContent = `${t("contact_phone")} `;
  if (shopCheckoutLabels[3]) shopCheckoutLabels[3].childNodes[0].textContent = `${t("shipping_country")} `;
  if (shopCheckoutLabels[4]) shopCheckoutLabels[4].childNodes[0].textContent = `${t("shipping_city")} `;
  if (shopCheckoutLabels[5]) shopCheckoutLabels[5].childNodes[0].textContent = `${t("shipping_address")} `;
  if (shopCheckoutLabels[6]) shopCheckoutLabels[6].childNodes[0].textContent = `${t("buyer_note")} `;
  shopCheckoutForm.querySelector(".primary-action").lastChild.textContent = ` ${t("submit_shop_order")}`;

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
    [
      "按平时食量投喂，回传照片",
      "Feed normal portion and return photos",
      "Please share pet temperament and special care notes in advance",
    ].includes(bookingForm.elements.note.value)
  ) {
    bookingForm.elements.note.value = t("service_note");
  }
  bookingForm.querySelector(".primary-action").lastChild.textContent = ` ${t("submit_booking")}`;
}

function renderMetrics() {
  const gmv =
    state.orders.reduce((sum, item) => sum + Number(item.amount || 0), 0) +
    state.bookings.reduce((sum, item) => sum + Number(item.amount || 0), 0) +
    state.shopOrders.reduce((sum, item) => sum + Number(item.subtotal || 0), 0);
  const fees =
    state.orders.reduce((sum, item) => sum + Number(item.fee || 0), 0) +
    state.bookings.reduce((sum, item) => sum + Number(item.commission || 0), 0) +
    state.shopOrders.reduce((sum, item) => sum + Number(item.commission || 0), 0);
  document.querySelector("#metricListings").textContent = state.listings.length + state.services.length + state.products.length;
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
          <button class="listing-image-button" type="button" data-detail="${listing.id}" aria-label="${t("open_pet_detail")}">
            <img src="${assetUrl(listing.image)}" alt="${listing.breed} listing from ${listing.country}" />
          </button>
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

  listingGrid.querySelectorAll("[data-detail], [data-select], [data-buy]").forEach((button) => {
    button.addEventListener("click", async () => {
      state.selectedId = button.dataset.detail || button.dataset.select || button.dataset.buy;
      if (button.dataset.detail || button.dataset.select) {
        openPetDetail(state.selectedId);
        renderDealPanel();
        if (window.lucide) window.lucide.createIcons();
        return;
      }
      if (button.dataset.buy) await createEscrowIntent(selectedListing());
      render();
    });
  });
}

function renderShop() {
  const products = filteredProducts();
  shopGrid.innerHTML = products
    .map(
      (product) => {
        const canBuy = product.status === "active" && Number(product.stock || 0) > 0 && state.user?.role !== "seller";
        return `
          <article class="service-card">
            <img src="${assetUrl(product.image)}" alt="${product.title}" />
            <div class="service-card-body">
              <div class="listing-head">
                <div>
                  <h3>${product.title}</h3>
                  <p>${t(shopCategoryOptions.find(([value]) => value === product.category)?.[1] || "shop_other")} · ${product.seller || t("verified_seller")}</p>
                </div>
                <span class="price">${money(product.price)}</span>
              </div>
              <p>${product.description}</p>
              <div class="doc-row">
                <span class="doc-chip">${t("stock_left")} ${product.stock}</span>
                <span class="doc-chip">${statusLabel(product.status)}</span>
              </div>
              <div class="card-actions">
                <button class="primary-action" type="button" data-buy-product="${product.id}" ${canBuy ? "" : "disabled"}>
                  <i data-lucide="shopping-cart" aria-hidden="true"></i>
                  ${t("buy_now")}
                </button>
              </div>
            </div>
          </article>
        `;
      },
    )
    .join("");

  if (!products.length) {
    shopGrid.innerHTML = `<article class="service-card"><div class="service-card-body"><h3>${t("no_products")}</h3><p>${t("adjust_shop_filters")}</p></div></article>`;
  }

  shopGrid.querySelectorAll("[data-buy-product]").forEach((button) => {
    button.addEventListener("click", () => openShopCheckoutDialog(button.dataset.buyProduct));
  });
}

function renderPetDetail(listing) {
  if (!listing || !petDetailContent) return;
  const amounts = orderAmounts(listing);
  const canBuy = listing.status === "approved" && state.user?.role !== "seller";
  const docs = Array.isArray(listing.docs) && listing.docs.length ? listing.docs : ["Seller ID"];
  petDetailDialogTitle.textContent = `${t("pet_detail")} · ${listing.name}`;
  petDetailContent.innerHTML = `
    <article class="pet-detail-layout">
      <div class="pet-detail-media">
        <img src="${assetUrl(listing.image)}" alt="${listing.breed} listing from ${listing.country}" />
      </div>
      <div class="pet-detail-body">
        <div class="pet-detail-head">
          <div>
            <p class="eyebrow">${t("live_marketplace")}</p>
            <h3>${listing.name}</h3>
            <p>${listing.breed} · ${listing.age}</p>
          </div>
          <span class="price">${money(listing.price)}</span>
        </div>

        <div class="pet-detail-section">
          <h3>${t("detail_overview")}</h3>
          <div class="detail-grid">
            <div><span>${t("pet_species")}</span><strong>${t(listingSpeciesOptions.find(([value]) => value === listing.species)?.[1] || "other_species")}</strong></div>
            <div><span>${t("breed")}</span><strong>${listing.breed}</strong></div>
            <div><span>${t("detail_age")}</span><strong>${listing.age}</strong></div>
            <div><span>${t("country")}</span><strong>${listing.country}</strong></div>
            <div><span>${t("detail_seller")}</span><strong>${listing.seller || t("verified_seller")}</strong></div>
            <div><span>${t("detail_status")}</span><strong>${statusLabel(listing.status)}</strong></div>
          </div>
        </div>

        <div class="pet-detail-section">
          <h3>${t("detail_trade_terms")}</h3>
          <div class="detail-grid">
            <div><span>${t("pet_subtotal")}</span><strong>${money(amounts.price)}</strong></div>
            <div><span>${t("platform_escrow_fee")}</span><strong>${money(amounts.fee)}</strong></div>
            <div><span>${t("expected_seller_payout")}</span><strong>${money(amounts.sellerPayout)}</strong></div>
            <div><span>${t("protection_period")}</span><strong>${t("days_7")}</strong></div>
          </div>
          <p>${t("backend_calculates")}</p>
        </div>

        <div class="pet-detail-section">
          <h3>${t("detail_compliance_docs")}</h3>
          <div class="doc-row">
            ${docs.map((doc) => `<span class="doc-chip">${doc}</span>`).join("")}
          </div>
          <div class="detail-grid">
            <div><span>${t("microchip_id")}</span><strong>${listing.microchipId || "-"}</strong></div>
            <div><span>${t("export_country")}</span><strong>${listing.exportCountry || listing.country || "-"}</strong></div>
            <div><span>${t("import_country")}</span><strong>${listing.importCountry || "-"}</strong></div>
            <div><span>${t("detail_compliance_status")}</span><strong>${statusLabel(listing.complianceStatus || "pending")}</strong></div>
            <div><span>${t("detail_risk")}</span><strong>${t(listing.risk || "low")}</strong></div>
            <div><span>${t("seller_identity")}</span><strong>${listing.sellerLegalName || listing.seller || t("verified_seller")}</strong></div>
          </div>
        </div>

        <div class="pet-detail-section">
          <h3>${t("detail_route")}</h3>
          <p>${listing.route || "-"}</p>
        </div>

        <div class="pet-detail-actions">
          <button class="secondary-action" type="button" data-close-pet-detail>
            <i data-lucide="arrow-left" aria-hidden="true"></i>
            ${t("close")}
          </button>
          <button class="primary-action" type="button" data-detail-buy="${listing.id}" ${canBuy ? "" : "disabled"}>
            <i data-lucide="lock-keyhole" aria-hidden="true"></i>
            ${t("start_escrow_trade")}
          </button>
        </div>
      </div>
    </article>
  `;

  petDetailContent.querySelector("[data-close-pet-detail]")?.addEventListener("click", () => {
    petDetailDialog.close();
  });
  petDetailContent.querySelector("[data-detail-buy]")?.addEventListener("click", async () => {
    petDetailDialog.close();
    await createEscrowIntent(listing);
    render();
  });
}

function openPetDetail(listingId) {
  const listing = state.listings.find((item) => item.id === listingId);
  if (!listing) return;
  state.selectedId = listing.id;
  renderPetDetail(listing);
  if (typeof petDetailDialog.showModal === "function") {
    petDetailDialog.showModal();
  }
  if (window.lucide) window.lucide.createIcons();
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

function renderCheckoutPage() {
  const listing = selectedListing();
  if (!listing || !checkoutForm) return;
  checkoutPageTitle.textContent = `${t("checkout_order")} · ${listing.name}`;
  checkoutForm.elements.listingId.value = listing.id;
  if (checkoutPageImage) {
    checkoutPageImage.src = assetUrl(listing.image);
    checkoutPageImage.alt = `${listing.name} escrow checkout preview`;
  }
  renderCheckoutSummary(listing);
}

function renderShopCheckoutSummary(product) {
  const quantity = Number(shopCheckoutForm.elements.quantity.value || 1);
  const amounts = shopOrderAmounts(product, quantity);
  shopCheckoutSummary.innerHTML = `
    <strong>${t("shop_summary_title")}</strong>
    <div class="fee-lines">
      <div><span>${t("product_title")}</span><strong>${product.title}</strong></div>
      <div><span>${t("quantity")}</span><strong>${amounts.quantity}</strong></div>
      <div><span>${t("product_subtotal")}</span><strong>${money(amounts.subtotal)}</strong></div>
      <div><span>${t("shipping_fee")}</span><strong>${money(amounts.shipping)}</strong></div>
      <div><span>${t("total_due")}</span><strong>${money(amounts.totalDue)}</strong></div>
    </div>
  `;
}

function openCheckoutPage(listingId) {
  const listing = state.listings.find((item) => item.id === listingId);
  if (!listing) return;
  state.selectedId = listing.id;
  checkoutForm.elements.contactName.value = state.user?.displayName || "Demo Buyer";
  state.view = "checkout";
  renderCheckoutPage();
}

function openCheckoutDialog(listingId) {
  openCheckoutPage(listingId);
}

function openShopCheckoutDialog(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;
  state.selectedProductId = product.id;
  shopCheckoutDialogTitle.textContent = t("shop_checkout");
  shopCheckoutForm.elements.productId.value = product.id;
  shopCheckoutForm.elements.quantity.max = String(Math.max(1, Number(product.stock || 1)));
  shopCheckoutForm.elements.quantity.value = "1";
  shopCheckoutForm.elements.contactName.value = state.user?.displayName || "Demo Buyer";
  renderShopCheckoutSummary(product);
  if (typeof shopCheckoutDialog.showModal === "function") {
    shopCheckoutDialog.showModal();
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
      commission: Number(((service?.price || 0) * serviceCommissionRate).toFixed(2)),
      providerPayout: Number(((service?.price || 0) * (1 - serviceCommissionRate)).toFixed(2)),
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

async function uploadListingFiles(formData) {
  const files = new FormData();
  ["petImage", "vaccineFile", "chipFile", "healthCertFile", "exportPermitFile"].forEach((name) => {
    const file = formData.get(name);
    if (file && file.size) files.append(name, file);
  });
  if (![...files.keys()].length) return { files: {} };
  return apiFetch("/api/uploads/listing-files", {
    method: "POST",
    body: files,
  });
}

async function uploadProductImage(formData) {
  const file = formData.get("productImage");
  if (!file || !file.size) return { file: null };
  const files = new FormData();
  files.append("productImage", file);
  return apiFetch("/api/uploads/product-image", {
    method: "POST",
    body: files,
  });
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
    if (data.payment?.checkoutUrl) {
      window.location.assign(data.payment.checkoutUrl);
    }
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

async function submitProduct(event) {
  event.preventDefault();
  const data = new FormData(productForm);
  try {
    const uploadResult = await uploadProductImage(data);
    const response = await apiFetch("/api/shop/products", {
      method: "POST",
      body: JSON.stringify({
        title: data.get("title"),
        category: data.get("category") || "other",
        description: data.get("description"),
        price: Number(data.get("price")),
        stock: Number(data.get("stock")),
        image: uploadResult.file?.url || "/assets/golden.png",
      }),
    });
    state.products.unshift(response.product);
    state.selectedProductId = response.product.id;
    state.view = "shop";
    productDialog.close();
    render();
  } catch (error) {
    alert(`${t("product_publish_failed")}: ${error.message}`);
  }
}

async function submitShopOrder(payload) {
  const product = state.products.find((item) => item.id === payload.productId) || selectedProduct();
  try {
    const data = await apiFetch("/api/shop/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    state.shopOrders.unshift(data.order);
    state.products = state.products.map((item) =>
      item.id === payload.productId
        ? { ...item, stock: Math.max(0, Number(item.stock || 0) - payload.quantity) }
        : item,
    );
    state.view = "transactions";
    if (data.payment?.checkoutUrl) {
      window.location.assign(data.payment.checkoutUrl);
    }
  } catch (error) {
    if (state.apiOnline) {
      alert(`${t("shop_order_failed")}: ${error.message}`);
      return;
    }
    const amounts = shopOrderAmounts(product, payload.quantity);
    state.shopOrders.unshift({
      id: `SO-DEMO-${Math.floor(Math.random() * 9000 + 1000)}`,
      buyer: state.user?.displayName || "Demo Buyer",
      seller: product.seller || t("verified_seller"),
      items: [
        {
          productId: product.id,
          title: product.title,
          quantity: payload.quantity,
          unitPrice: product.price,
          lineTotal: amounts.subtotal,
        },
      ],
      itemTitle: `${product.title} x${payload.quantity}`,
      subtotal: amounts.subtotal,
      commission: amounts.commission,
      shipping: amounts.shipping,
      sellerPayout: amounts.sellerPayout,
      totalDue: amounts.totalDue,
      contactName: payload.contactName,
      contactPhone: payload.contactPhone,
      shippingCountry: payload.shippingCountry,
      shippingCity: payload.shippingCity,
      shippingAddress: payload.shippingAddress,
      buyerNote: payload.buyerNote,
      status: "paid",
    });
    state.products = state.products.map((item) =>
      item.id === payload.productId
        ? { ...item, stock: Math.max(0, Number(item.stock || 0) - payload.quantity) }
        : item,
    );
    state.view = "transactions";
  }
}

async function submitMerchantLead(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector(".form-status");
  const submitButton = form.querySelector('button[type="submit"]');
  const data = new FormData(form);
  const payload = {
    businessName: data.get("businessName"),
    contactName: data.get("contactName"),
    email: data.get("email"),
    phone: data.get("phone"),
    country: data.get("country"),
    businessType: data.get("businessType"),
    expectedCategory: data.get("expectedCategory"),
    monthlyCapacity: data.get("monthlyCapacity"),
    message: data.get("message") || "",
  };

  if (submitButton) submitButton.disabled = true;
  if (status) {
    status.textContent = "";
    status.className = "form-status";
  }

  try {
    await apiFetch("/api/seller-leads", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    form.reset();
    if (status) {
      status.textContent = t("merchant_success");
      status.classList.add("is-success");
    }
  } catch (error) {
    if (status) {
      status.textContent = `${t("merchant_failed")}: ${error.message}`;
      status.classList.add("is-error");
    } else {
      alert(`${t("merchant_failed")}: ${error.message}`);
    }
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

async function continueShopPayment(orderId) {
  try {
    const data = await apiFetch(`/api/shop/orders/${orderId}/pay`, {
      method: "POST",
    });
    if (data.payment?.checkoutUrl) {
      window.location.assign(data.payment.checkoutUrl);
      return;
    }
    if (data.order) {
      state.shopOrders = state.shopOrders.map((order) => (order.id === orderId ? data.order : order));
    }
    render();
  } catch (error) {
    alert(error.message);
  }
}

async function continuePayment(orderId) {
  try {
    const data = await apiFetch(`/api/orders/${orderId}/pay`, {
      method: "POST",
    });
    if (data.payment?.checkoutUrl) {
      window.location.assign(data.payment.checkoutUrl);
      return;
    }
    if (data.order) {
      state.orders = state.orders.map((order) => (order.id === orderId ? data.order : order));
    }
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

async function startStripeConnect(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  try {
    const data = await apiFetch("/api/seller/stripe-connect", {
      method: "POST",
      body: JSON.stringify({
        country: String(form.get("country") || "US").toUpperCase(),
      }),
    });
    if (data.onboardingUrl) {
      window.location.assign(data.onboardingUrl);
    }
  } catch (error) {
    alert(`${t("stripe_connect_failed")}: ${error.message}`);
  }
}

function renderDealPanel() {
  const listing = selectedListing();
  if (!listing) return;
  const amounts = orderAmounts(listing);
  const canBuy = listing.status === "approved" && state.user?.role !== "seller";
  dealPanel.innerHTML = `
    <button class="deal-image-button" type="button" id="dealDetailAction" aria-label="${t("open_pet_detail")}">
      <img src="${assetUrl(listing.image)}" alt="${listing.name} transaction preview" />
    </button>
    <div class="deal-body">
      <h3>${listing.name} · ${listing.breed}</h3>
      <p>${listing.route}</p>
      <div class="fee-lines">
        <div><span>${t("pet_price")}</span><strong>${money(listing.price)}</strong></div>
        <div><span>${t("expected_platform_income")}</span><strong>${money(amounts.fee)}</strong></div>
        <div><span>${t("expected_seller_payout")}</span><strong>${money(amounts.sellerPayout)}</strong></div>
      </div>
      <p>${t("backend_calculates")}</p>
      <button class="secondary-action" type="button" id="dealViewDetail">
        <i data-lucide="scan-eye" aria-hidden="true"></i>
        ${t("pet_detail")}
      </button>
      <button class="primary-action" type="button" id="dealAction" ${canBuy ? "" : "disabled"}>
        <i data-lucide="badge-dollar-sign" aria-hidden="true"></i>
        ${t("create_trade")}
      </button>
    </div>
  `;
  dealPanel.querySelector("#dealDetailAction").addEventListener("click", () => openPetDetail(listing.id));
  dealPanel.querySelector("#dealViewDetail").addEventListener("click", () => openPetDetail(listing.id));
  dealPanel.querySelector("#dealAction").addEventListener("click", async () => {
    await createEscrowIntent(listing);
    render();
  });
}

function renderTransactions() {
  const petRows = state.orders
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
            ${pending ? `<button class="secondary-action" type="button" data-confirm="${tx.id}">${t("continue_payment")}</button>` : ""}
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

  const shopRows = state.shopOrders
    .map((order) => {
      const pending = order.status === "payment_pending";
      return `
        <tr>
          <td>${order.id}</td>
          <td>${order.itemTitle || t("shop_order")}</td>
          <td>${order.shippingCountry || "-"}</td>
          <td>${order.buyer || "-"}</td>
          <td>${money(order.totalDue || order.subtotal || 0)}</td>
          <td>${money(order.commission || 0)}</td>
          <td>
            <span class="status ${pending ? "review" : "approved"}">${statusLabel(order.status)}</span>
            ${pending ? `<button class="secondary-action" type="button" data-confirm-shop="${order.id}">${t("continue_payment")}</button>` : ""}
            <button class="secondary-action" type="button" data-shop-order-detail="${order.id}">${t("order_detail")}</button>
          </td>
        </tr>
        <tr class="order-detail-row is-hidden" data-shop-order-detail-row="${order.id}">
          <td colspan="7">
            <div class="detail-grid">
              <div><span>${t("product_subtotal")}</span><strong>${money(order.subtotal || 0)}</strong></div>
              <div><span>${t("shipping_fee")}</span><strong>${money(order.shipping || 0)}</strong></div>
              <div><span>${t("shop_platform_fee")}</span><strong>${money(order.commission || 0)}</strong></div>
              <div><span>${t("contact")}</span><strong>${order.contactName || "-"} · ${order.contactPhone || "-"}</strong></div>
              <div><span>${t("destination")}</span><strong>${[order.shippingCity, order.shippingCountry].filter(Boolean).join(", ") || "-"}</strong></div>
              <div><span>${t("shipping_address")}</span><strong>${order.shippingAddress || "-"}</strong></div>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  transactionBody.innerHTML = `${petRows}${shopRows}`;

  if (!state.orders.length && !state.shopOrders.length) {
    transactionBody.innerHTML = `<tr><td colspan="7">${t("no_transactions")}</td></tr>`;
  }

  transactionBody.querySelectorAll("[data-confirm]").forEach((button) => {
    button.addEventListener("click", () => continuePayment(button.dataset.confirm));
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
  transactionBody.querySelectorAll("[data-confirm-shop]").forEach((button) => {
    button.addEventListener("click", () => continueShopPayment(button.dataset.confirmShop));
  });
  transactionBody.querySelectorAll("[data-shop-order-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      const row = transactionBody.querySelector(`[data-shop-order-detail-row="${button.dataset.shopOrderDetail}"]`);
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
      state.bookings.reduce((sum, booking) => sum + Number(booking.providerPayout || 0), 0) +
      state.shopOrders.reduce((sum, order) => sum + Number(order.sellerPayout || 0), 0),
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
      ...state.shopOrders.map((order) => ({
        id: order.id,
        type: "shop-order",
        title: order.itemTitle || t("shop_order"),
        amount: order.sellerPayout || 0,
        status: order.status,
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
    ${
      state.user?.role === "seller"
        ? `<form class="payout-form" id="stripeConnectForm">
            <strong>${t("stripe_connect_setup")}</strong>
            <p>${t("stripe_connect_hint")}</p>
            <label>${t("stripe_connect_country")}<input name="country" maxlength="2" value="US" required /></label>
            <button class="secondary-action" type="submit">
              <i data-lucide="link" aria-hidden="true"></i>
              ${t("stripe_connect_setup")}
            </button>
          </form>`
        : ""
    }
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
  walletSummary.querySelector("#stripeConnectForm")?.addEventListener("submit", startStripeConnect);
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
      (listing) => {
        const files = listing.files || {};
        const fileLinks = [
          ["vaccineFile", "vaccine_record"],
          ["chipFile", "chip_certificate"],
          ["healthCertFile", "health_certificate"],
          ["exportPermitFile", "export_permit"],
        ]
          .filter(([key]) => files[key])
          .map(([key, label]) => `<a href="${assetUrl(files[key])}" target="_blank" rel="noreferrer">${t(label)}</a>`)
          .join(" · ");
        return `
        <div class="risk-item">
          <strong>${listing.id} · ${listing.name}</strong>
          <span>${listing.country} · ${listing.docs.join(", ")}</span>
          <span>${t("seller_identity")}: ${listing.sellerLegalName || listing.seller || "-"} · ${listing.sellerIdType || "-"} ${listing.sellerIdLast4 ? `****${listing.sellerIdLast4}` : ""}</span>
          <span>${t("microchip_id")}: ${listing.microchipId || "-"} · ${t("export_country")}: ${listing.exportCountry || "-"} · ${t("import_country")}: ${listing.importCountry || "-"}</span>
          <span>${t("compliance_files")}: ${fileLinks || "-"}</span>
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
      `;
      },
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
  const service = Number(calcService.value || 0);
  const rate = commissionRateForPrice(Math.round(price * 100));
  const rawCommission = price * rate;
  const cap = commissionPolicy.capCents > 0 ? commissionPolicy.capCents / 100 : Infinity;
  const commission = Math.min(rawCommission, cap);
  const totalFee = commission + service;
  calcRate.value = String(rate * 100);
  rateValue.textContent = percentLabel(rate);
  setText("#commissionPolicyText", commissionPolicyText());
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
    checkout: "checkout_order",
    shop: "shop_title",
    merchant: "merchant_title",
    services: "services_title",
    bookings: "bookings_title",
    transactions: "transactions_title",
    messages: "messages_title",
    wallet: "wallet_title",
    compliance: "compliance_title",
    revenue: "revenue_title",
  };
  viewTitle.textContent = t(titles[view] || "market_title");
}

function render() {
  renderAllPageText();
  renderMerchantLanding();
  const role = state.user?.role || roleSelect.value;
  const accountText = currentLang === "zh" ? `${roleText(role)}${t("account")}` : `${roleText(role)} ${t("account")}`;
  accountRole.textContent = `${accountText}${state.apiOnline ? "" : ` · ${t("demo_data")}`}`;
  currencySelect.value = state.currency;
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === state.filter);
  });
  shopFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.shopFilter === state.shopFilter);
  });
  serviceFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.serviceFilter === state.serviceFilter);
  });
  if (state.authed) setView(state.view);
  if (state.view === "checkout") renderCheckoutPage();
  renderMetrics();
  renderListings();
  renderShop();
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
    const [listingData, productData, serviceData, orderData, shopOrderData, bookingData, messageData, walletData] = await Promise.all([
      apiFetch(listingPath),
      apiFetch("/api/shop/products"),
      apiFetch("/api/services"),
      apiFetch("/api/orders").catch(() => ({ orders: [] })),
      apiFetch("/api/shop/orders").catch(() => ({ orders: [] })),
      apiFetch("/api/service-bookings").catch(() => ({ bookings: [] })),
      apiFetch("/api/messages").catch(() => ({ messages: [] })),
      apiFetch("/api/wallet").catch(() => ({ wallet: null })),
    ]);
    state.listings = listingData.listings;
    state.products = productData.products;
    state.services = allowedServices(serviceData.services);
    state.orders = orderData.orders;
    state.shopOrders = shopOrderData.orders;
    state.bookings = allowedBookings(bookingData.bookings, state.services);
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

function applyReturnParams() {
  const params = new URLSearchParams(window.location.search);
  if (
    params.get("payment") === "stripe_success" ||
    params.get("payment") === "stripe_cancelled" ||
    params.get("payment") === "shop_success" ||
    params.get("payment") === "shop_cancelled"
  ) {
    state.view = "transactions";
  }
  if (params.has("payment") || params.has("stripe_connect")) {
    window.history.replaceState({}, "", window.location.pathname);
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
    if (data.commissionPolicy) {
      Object.assign(commissionPolicy, data.commissionPolicy);
      if (calcService) {
        calcService.value = String(Number(commissionPolicy.serviceFeeCents || 0) / 100);
      }
    }
    if (typeof data.serviceCommissionRate === "number") {
      serviceCommissionRate = data.serviceCommissionRate;
    }
    if (typeof data.shopCommissionRate === "number") {
      shopCommissionRate = data.shopCommissionRate;
    }
    if (typeof data.shopShippingFeeCents === "number") {
      shopShippingFeeCents = data.shopShippingFeeCents;
    }
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
  merchantPublicShell.classList.add("is-hidden");
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

openMerchantLandingBtn?.addEventListener("click", showMerchantPublicPage);
merchantBackToLoginBtn?.addEventListener("click", showLoginPage);
listingCloseBtn?.addEventListener("click", () => {
  listingDialog.close();
});
productCloseBtn?.addEventListener("click", () => {
  productDialog.close();
});
shopCheckoutCloseBtn?.addEventListener("click", () => {
  shopCheckoutDialog.close();
});
bookingCloseBtn?.addEventListener("click", () => {
  bookingDialog.close();
});
checkoutDialogCloseBtn?.addEventListener("click", () => {
  checkoutDialog.close();
});
petDetailCloseBtn?.addEventListener("click", () => {
  petDetailDialog.close();
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
  merchantPublicShell.classList.add("is-hidden");
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

shopFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.shopFilter = button.dataset.shopFilter;
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
  renderShop();
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

checkoutBackBtn?.addEventListener("click", () => {
  state.view = "market";
  render();
});

[calcPrice, calcRate, calcService].forEach((input) => {
  input.addEventListener("input", renderCalculator);
});

newListingBtn.addEventListener("click", () => {
  if (typeof listingDialog.showModal === "function") {
    listingDialog.showModal();
  }
});

newProductBtn.addEventListener("click", () => {
  if (typeof productDialog.showModal === "function") {
    productDialog.showModal();
  }
});

listingForm.addEventListener("submit", async (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const data = new FormData(listingForm);
  try {
    const uploadResult = await uploadListingFiles(data);
    const uploaded = uploadResult.files || {};
    const response = await apiFetch("/api/listings", {
      method: "POST",
      body: JSON.stringify({
        name: data.get("name"),
        species: data.get("species") || "Dog",
        breed: data.get("breed"),
        age: data.get("age") || "Pending",
        country: data.get("country"),
        exportCountry: data.get("exportCountry") || data.get("country"),
        importCountry: data.get("importCountry") || "",
        microchipId: data.get("microchipId") || "",
        sellerLegalName: data.get("sellerLegalName") || state.user?.displayName || "",
        sellerIdType: data.get("sellerIdType") || "passport",
        sellerIdLast4: data.get("sellerIdLast4") || "",
        price: Number(data.get("price")),
        image: uploaded.petImage?.url || "/assets/dog.jpg",
        vaccineFileUrl: uploaded.vaccineFile?.url || "",
        chipFileUrl: uploaded.chipFile?.url || "",
        healthCertFileUrl: uploaded.healthCertFile?.url || "",
        exportPermitFileUrl: uploaded.exportPermitFile?.url || "",
        docs: ["Seller ID"],
        route: data.get("route") || "Pending route",
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

productForm.addEventListener("submit", async (event) => {
  if (event.submitter?.value === "cancel") return;
  await submitProduct(event);
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
  render();
});

shopCheckoutForm.elements.quantity.addEventListener("input", () => {
  renderShopCheckoutSummary(selectedProduct());
});

shopCheckoutForm.addEventListener("submit", async (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const data = new FormData(shopCheckoutForm);
  await submitShopOrder({
    productId: data.get("productId"),
    quantity: Number(data.get("quantity")),
    contactName: data.get("contactName"),
    contactPhone: data.get("contactPhone"),
    shippingCountry: data.get("shippingCountry"),
    shippingCity: data.get("shippingCity"),
    shippingAddress: data.get("shippingAddress"),
    buyerNote: data.get("buyerNote"),
  });
  shopCheckoutDialog.close();
  render();
});

window.addEventListener("load", async () => {
  await loadRuntimeConfig();
  applyReturnParams();
  if (window.lucide) window.lucide.createIcons();
  if (window.location.hash === "#merchant") {
    showMerchantPublicPage();
    return;
  }
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
