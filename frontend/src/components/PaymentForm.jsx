import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { getContract } from "../utils/contract";

function PaymentForm({ setTransaction, refreshTransactions }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [merchantAddress, setMerchantAddress] = useState("");

  const handlePayment = async () => {
    try {
      // Basic validation
      if (!amount || parseFloat(amount) <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      // Get smart contract
      const contract = await getContract();

      if (!contract) return;

      // Fetch and display merchant / contract address
      setMerchantAddress(contract.target);

      // Send blockchain payment
      const tx = await contract.pay(message, {
        value: ethers.parseEther(amount),
      });

      await tx.wait();

      // Save payment to backend
      await axios.post(
        "https://crypto-payment-gateway-2xl2.onrender.com/api/payments",
        {
          sender: await contract.runner.getAddress(),
          amount,
          transactionHash: tx.hash,
          message,
          status: "Success",
        }
      );

      // Update global SuccessCard
      setTransaction({
        success: true,
        hash: tx.hash,
      });

      // Refresh live transaction history
      if (refreshTransactions) {
        refreshTransactions();
      }

      // Reset form fields
      setAmount("");
      setMessage("");
    } catch (error) {
      console.error("Payment failed:", error);

      // Global failure state
      setTransaction({
        success: false,
      });
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 w-full text-white">

      {/* Heading */}
      <h2 className="text-3xl font-bold mb-8 text-center">
        Make a Payment
      </h2>

      {/* Merchant Wallet */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">
          Merchant Wallet Address
        </label>

        <input
          type="text"
          value={
            merchantAddress
              ? `${merchantAddress.slice(0, 8)}...${merchantAddress.slice(-6)}`
              : "Not Connected"
          }
          readOnly
          className="w-full p-4 rounded-2xl bg-[#0B1739] border border-white/10 text-gray-400 outline-none"
        />
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">
          Amount (ETH)
        </label>

        <input
          type="number"
          placeholder="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-4 rounded-2xl bg-[#0B1739] border border-white/10 text-white outline-none"
        />
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          Message
        </label>

        <textarea
          placeholder="Payment note..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 rounded-2xl bg-[#0B1739] border border-white/10 text-white outline-none min-h-[100px]"
        />
      </div>

      {/* Payment Breakdown */}
      <div className="bg-[#0B1739] rounded-2xl p-5 mb-6 border border-white/10">
        <div className="flex justify-between text-gray-400 mb-2">
          <span>Amount</span>
          <span>{amount || "0"} ETH</span>
        </div>

        <div className="flex justify-between text-gray-400 mb-2">
          <span>Estimated Gas Fee</span>
          <span>~0.0002 ETH</span>
        </div>

        <div className="border-t border-white/10 pt-3 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>
            {amount
              ? (parseFloat(amount || 0) + 0.0002).toFixed(4)
              : "0.0000"}{" "}
            ETH
          </span>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        className="w-full py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-[1.02] transition-all duration-300"
      >
        Pay Now
      </button>

    </div>
  );
}

export default PaymentForm;