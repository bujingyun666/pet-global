import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./db.js";

const cookieName = "pg_session";
const jwtSecret = process.env.JWT_SECRET || "dev-only-change-me";

const authText = {
  zh: {
    authentication_required: "需要先登录",
    invalid_session: "登录状态已失效",
    permission_denied: "没有操作权限",
  },
  en: {
    authentication_required: "Authentication required",
    invalid_session: "Invalid session",
    permission_denied: "Permission denied",
  },
};

function requestLang(req) {
  return String(req.headers["accept-language"] || "").toLowerCase().startsWith("zh") ? "zh" : "en";
}

function authMessage(req, key) {
  return authText[requestLang(req)]?.[key] || authText.en[key] || key;
}

export function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    displayName: user.display_name,
    country: user.country,
    kycStatus: user.kyc_status,
  };
}

export function createSession(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: "7d" },
  );
}

export function setSessionCookie(res, token) {
  res.cookie(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(cookieName);
}

export function requireAuth(req, res, next) {
  const bearer = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  const token = bearer || req.cookies[cookieName];
  if (!token) return res.status(401).json({ error: authMessage(req, "authentication_required") });

  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(payload.sub);
    if (!user) return res.status(401).json({ error: authMessage(req, "invalid_session") });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: authMessage(req, "invalid_session") });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ error: authMessage(req, "permission_denied") });
    }
    next();
  };
}

export function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

export function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}
