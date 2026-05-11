const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  transactionHash: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);