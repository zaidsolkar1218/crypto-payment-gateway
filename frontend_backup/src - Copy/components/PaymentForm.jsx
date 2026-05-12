import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { getContract } from "../utils/contract";

function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [transaction, setTransaction] = useState(null);

  const handlePayment = async () => {
    try {
      const contract = await getContract();

      if (!contract) return;

      const tx = await contract.pay(message, {
        value: ethers.parseEther(amount),
      });

      await tx.wait();

      await axios.post(
        "https://crypto-payment-gateway-2xl2.onrender.com/api/payments",
        {
          sender: await contract.runner.getAddress(),
          amount,
          transactionHash: tx.hash,
          message,
        }
      );

      setTransaction({
        success: true,
        hash: tx.hash,
      });

      setAmount("");
      setMessage("");
    } catch (error) {
      console.error(error);

      setTransaction({
        success: false,
      });
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg w-[520px]">
      <h2 className="text-5xl font-bold text-center mb-8">
        Make Payment
      </h2>

      <input
        type="number"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-4 rounded mb-4"
      />

      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border p-4 rounded mb-4"
      />

      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-4 rounded text-2xl"
      >
        Pay Now
      </button>

      {transaction && (
        <div className="mt-8 text-center">
          {transaction.success ? (
            <>
              <p className="text-green-600 font-bold text-3xl">
                Payment Successful!
              </p>

              <p className="mt-4 break-all">
                Tx Hash: {transaction.hash}
              </p>
            </>
          ) : (
            <p className="text-red-600 font-bold text-3xl">
              Payment Failed
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default PaymentForm; 