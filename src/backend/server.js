import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import MongoStore from "connect-mongo";
import authRoutes from "./routes/authRoutes.js";
import sellerRoutes from "./routes/sellerroutes.js";
import scrapgetRoutes from "./routes/scrapgetroute.js";
import buyerRoutes from "./routes/buyerroute.js";
import adminRoutes from "./routes/adminroutes.js";

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || "your_secret_key",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || "mongodb://localhost/pickmyscap",
  }),
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/scrapget", scrapgetRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/seller", sellerRoutes);
// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Default Route
app.get("/", (req, res) => {
  res.send("🟢 PickMyScrap API is live");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});