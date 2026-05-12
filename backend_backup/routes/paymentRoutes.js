const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// GET all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("GET Payments Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// POST new payment
router.post("/", async (req, res) => {
  try {
    console.log("Incoming Payment Data:", req.body);

    const { sender, amount, transactionHash, message } = req.body;

    // Validation
    if (!sender || !amount || !transactionHash) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newPayment = new Payment({
      sender,
      amount,
      transactionHash,
      message: message || "",
    });

    await newPayment.save();

    res.status(201).json({
      success: true,
      payment: newPayment,
    });
  } catch (error) {
    console.error("POST Payment Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;