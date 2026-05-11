import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { getContract } from "../utils/contract";

function PaymentForm({ setTransaction }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const contract = await getContract();

      const tx = await contract.pay(message, {
        value: ethers.parseEther(amount),
      });

      await tx.wait();

      // Save to backend
      await axios.post("http://localhost:5000/api/payments", {
        sender: tx.from,
        amount: amount,
        transactionHash: tx.hash,
        message,
      });

      setTransaction({
        hash: tx.hash,
        success: true,
      });

      setAmount("");
      setMessage("");

    } catch (error) {
      console.error(error);

      setTransaction({
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePayment}
      className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Make Payment
      </h2>

      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 border rounded mb-4"
        required
      />

      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default PaymentForm;