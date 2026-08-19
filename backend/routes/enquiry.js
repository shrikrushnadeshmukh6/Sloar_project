import { Router } from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { notifyNewEnquiry } from "../utils/mailer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "data", "enquiries.json");

const router = Router();

// Very small in-memory rate limiter: max 5 submissions per IP per 10 minutes.
const submissionLog = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter(
    (t) => now - t < WINDOW_MS,
  );
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

function validateEnquiry(body) {
  const errors = {};
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  const city = String(body.city || "").trim();

  if (!name) errors.name = "Name is required";
  if (!/^[0-9]{10}$/.test(phone))
    errors.phone = "Phone must be a 10-digit number";
  if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.email = "Email is invalid";
  if (!city) errors.city = "City is required";

  return { errors, isValid: Object.keys(errors).length === 0 };
}

async function readEnquiries() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeEnquiries(list) {
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
}

// POST /api/enquiry — submit the enquiry form
router.post("/", async (req, res) => {
  const ip = req.ip;
  if (isRateLimited(ip)) {
    return res.status(429).json({
      ok: false,
      message:
        "Too many enquiries submitted. Please try again later or call us directly.",
    });
  }

  const { errors, isValid } = validateEnquiry(req.body);
  if (!isValid) {
    return res.status(400).json({ ok: false, errors });
  }

  const enquiry = {
    id: `enq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: String(req.body.name).trim(),
    phone: String(req.body.phone).trim(),
    email: String(req.body.email || "").trim(),
    city: String(req.body.city).trim(),
    propertyType: String(req.body.propertyType || "Residential").trim(),
    monthlyBill: String(req.body.monthlyBill || "").trim(),
    message: String(req.body.message || "").trim(),
    receivedAt: new Date().toISOString(),
  };

  try {
    const list = await readEnquiries();
    list.unshift(enquiry);
    await writeEnquiries(list);
  } catch (err) {
    console.error("Failed to save enquiry:", err.message);
    return res.status(500).json({
      ok: false,
      message:
        "Could not save your enquiry right now. Please try again shortly.",
    });
  }

  try {
    await notifyNewEnquiry(enquiry);
  } catch (err) {
    console.error("Email notification failed:", err.message);
    return res.status(503).json({
      ok: false,
      message:
        "Your enquiry was saved, but the email notification failed. Please try again shortly.",
    });
  }

  return res.status(201).json({
    ok: true,
    message:
      "Enquiry received. Our team will contact you within one business day.",
  });
});

// GET /api/enquiry — list enquiries (simple admin key check)
router.get("/", async (req, res) => {
  const key = req.query.key || req.headers["x-admin-key"];
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }
  const list = await readEnquiries();
  return res.json({ ok: true, count: list.length, enquiries: list });
});

export default router;
