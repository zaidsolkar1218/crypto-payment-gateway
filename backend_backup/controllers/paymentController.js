const Payment = require("../models/Payment");

// Save new payment
const savePayment = async (req, res) => {
  try {
    const { sender, amount, transactionHash, message } = req.body;

    const payment = new Payment({
      sender,
      amount,
      transactionHash,
      message,
    });

    await payment.save();

    res.status(201).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  savePayment,
  getAllPayments,
};