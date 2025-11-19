import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

/* ---------- CORS FIX FOR RENDER + VERCEL ---------- */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL, // Vercel frontend
  process.env.ADMIN_URL      // Vercel admin
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS Blocked by Server"));
    },
    credentials: true,
  })
);

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());

/* ---------- DATABASE ---------- */
connectDB();

/* ---------- ROUTES ---------- */
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

/* ---------- STATIC (Remove later) ---------- */
// Render does NOT persist files — prefer Cloudinary
app.use("/images", express.static("uploads"));

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("API Working - Render Deployment Success");
});

/* ---------- START SERVER ---------- */
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
