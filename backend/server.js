const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Crash debugging
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

// Connect DB
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "https://crypto-payment-gateway-indol.vercel.app",
      "https://crypto-payment-gateway-gtbro9pgi-zaidsolkar1218s-projects.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Crypto Payment Gateway Backend Running...");
});

// Payment routes
app.use("/api/payments", paymentRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});