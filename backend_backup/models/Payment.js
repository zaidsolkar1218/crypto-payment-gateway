const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);