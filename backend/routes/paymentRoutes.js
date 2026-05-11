const express = require("express");
const router = express.Router();

const {
  savePayment,
  getAllPayments,
} = require("../controllers/paymentController");

// POST payment
router.post("/", savePayment);

// GET all payments
router.get("/", getAllPayments);

module.exports = router;