const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Connect database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Crypto Payment Gateway Backend Running...");
});

// Payment routes
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});