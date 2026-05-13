import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { getContract } from "../utils/contract";

function PaymentForm({ setTransaction, refreshTransactions }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [merchantAddress, setMerchantAddress] = useState("");

  // Load merchant / contract address on page load
  useEffect(() => {
    const loadContract = async () => {
      try {
        const contract = await getContract();

        if (contract) {
          setMerchantAddress(contract.target);
        }
      } catch (error) {
        console.error("Failed to load merchant address:", error);
      }
    };

    loadContract();
  }, []);

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const contract = await getContract();

      if (!contract) {
        alert("Wallet not connected.");
        return;
      }

      // Reset previous transaction state
      setTransaction(null);

      // STEP 1 — Blockchain payment
      const tx = await contract.pay(message, {
        value: ethers.parseEther(amount),
      });

      // STEP 2 — Wait for blockchain confirmation
      await tx.wait();

      // STEP 3 — Immediately show success
      const successData = {
        success: true,
        hash: tx.hash,
      };

      setTransaction(successData);

      // Preserve values before clearing
      const currentAmount = amount;
      const currentMessage = message;

      // STEP 4 — Reset form fields
      setAmount("");
      setMessage("");

      // STEP 5 — Backend logging (non-critical)
      try {
        const senderAddress = await contract.runner.getAddress();

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/payments`,
          {
            sender: senderAddress,
            amount: currentAmount,
            transactionHash: tx.hash,
            message: currentMessage,
            status: "Success",
          }
        );

        // Refresh transactions table
        if (refreshTransactions) {
          refreshTransactions();
        }

      } catch (backendError) {
        console.error(
          "Backend save failed but blockchain payment succeeded:",
          backendError
        );
      }

    } catch (error) {
      console.error("Payment failed:", error);

      // Only real payment rejection/revert should fail
      setTransaction({
        success: false,
        hash: null,
      });
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 w-full text-white">

      {/* Heading */}
      <h2 className="text-4xl font-bold mb-8 text-center">
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
          className="w-full p-4 rounded-2xl bg-[#0B1739] border border-white/10 text-gray-300 outline-none"
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