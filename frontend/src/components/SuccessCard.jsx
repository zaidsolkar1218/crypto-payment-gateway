import { FaCheckCircle, FaTimesCircle, FaExternalLinkAlt } from "react-icons/fa";

const SuccessCard = ({ transaction = null }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 text-white">

      <h2 className="text-xl font-bold mb-6">Transaction Status</h2>

      {!transaction ? (
        <div className="text-center text-gray-400">
          <p>No transaction yet</p>
        </div>
      ) : transaction.success ? (
        <div className="text-center">

          <FaCheckCircle className="text-green-400 text-5xl mx-auto mb-4" />

          <p className="text-green-400 font-bold text-xl">
            Payment Successful
          </p>

          <p className="mt-4 text-sm text-gray-300 break-all">
            {transaction.hash}
          </p>

          <a
            href={`https://sepolia.etherscan.io/tx/${transaction.hash}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:underline"
          >
            View on Etherscan <FaExternalLinkAlt />
          </a>

        </div>
      ) : (
        <div className="text-center">

          <FaTimesCircle className="text-red-400 text-5xl mx-auto mb-4" />

          <p className="text-red-400 font-bold text-xl">
            Payment Failed
          </p>

          <p className="text-gray-400 mt-2">
            Please try again
          </p>

        </div>
      )}

    </div>
  );
};

export default SuccessCard;