import { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExternalLinkAlt,
  FaCopy,
} from "react-icons/fa";

const SuccessCard = ({ transaction }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!transaction?.hash) return;

    navigator.clipboard.writeText(transaction.hash);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl text-white">

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">
        Transaction Status
      </h2>

      {/* DEFAULT */}
      {!transaction && (
        <div className="text-center text-gray-400 py-10">
          <p>No transaction yet</p>
        </div>
      )}

      {/* SUCCESS */}
      {transaction?.success === true && (
        <div className="text-center">

          {/* Success Icon */}
          <FaCheckCircle className="text-green-400 text-7xl mx-auto mb-4" />

          {/* Success Text */}
          <h3 className="text-3xl font-bold text-green-400 mb-2">
            Payment Successful
          </h3>

          <p className="text-gray-300 mb-4">
            Your blockchain transaction was confirmed.
          </p>

          {/* Hash Box */}
          <div className="bg-[#0B1739] border border-white/10 rounded-2xl p-4 flex justify-between items-center mb-4">

            <p className="text-sm break-all text-gray-300">
              {transaction.hash.slice(0, 12)}...
            </p>

            <button
              onClick={handleCopy}
              className="text-gray-400 hover:text-white"
            >
              <FaCopy />
            </button>

          </div>

          {/* Copy Confirmation */}
          {copied && (
            <p className="text-green-400 text-sm mb-3">
              Copied!
            </p>
          )}

          {/* Etherscan Button */}
          <a
            href={`https://sepolia.etherscan.io/tx/${transaction.hash}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-3 rounded-2xl font-semibold hover:scale-105 transition"
          >
            View on Etherscan
            <FaExternalLinkAlt />
          </a>

        </div>
      )}

      {/* FAILURE */}
      {transaction?.success === false && (
        <div className="text-center">

          {/* Failure Icon */}
          <FaTimesCircle className="text-red-400 text-7xl mx-auto mb-4" />

          {/* Failure Text */}
          <h3 className="text-3xl font-bold text-red-400 mb-2">
            Payment Failed
          </h3>

          <p className="text-gray-400">
            Please try again
          </p>

        </div>
      )}

    </div>
  );
};

export default SuccessCard;