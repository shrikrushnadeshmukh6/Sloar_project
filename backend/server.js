import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import enquiryRouter from "./routes/enquiry.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "50kb" }));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "suryavan-solar-api",
    time: new Date().toISOString(),
  });
});

app.use("/api/enquiry", enquiryRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ ok: false, message: "Not found" });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Suryavan Solar API listening on http://localhost:${PORT}`);
});
