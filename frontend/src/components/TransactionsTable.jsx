const TransactionsTable = ({ transactions = [] }) => {
    return (
      <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-white">
  
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6">
          Recent Transactions
        </h2>
  
        {/* Header */}
        <div className="grid grid-cols-4 text-gray-400 border-b border-white/10 pb-3 mb-4 font-medium">
          <p>Hash</p>
          <p>Amount</p>
          <p>Message</p>
          <p>Status</p>
        </div>
  
        {/* Data */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {transactions.length === 0 ? (
            <p className="text-gray-400 text-center">No transactions yet</p>
          ) : (
            transactions.map((tx, index) => (
              <div
                key={index}
                className="grid grid-cols-4 items-center py-3 border-b border-white/5"
              >
                <p className="text-sm break-all text-gray-300">
                <a
                href={`https://sepolia.etherscan.io/tx/${tx.transactionHash}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
                >
                    {tx.transactionHash?.slice(0, 10)}...
                    </a>
                </p>
  
                <p>{tx.amount} ETH</p>
  
                <p className="text-gray-300 text-sm truncate">
                  {tx.message || "-"}
                </p>
  
                <p
                  className={`font-semibold ${
                    tx.status === "Success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {tx.status || "Success"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };
  
  export default TransactionsTable;