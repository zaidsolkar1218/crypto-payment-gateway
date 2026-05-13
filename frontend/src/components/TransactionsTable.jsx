const TransactionsTable = ({ transactions = [] }) => {
    return (
      <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl text-white">
  
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-6">
          Recent Transactions
        </h2>
  
        {/* Header */}
        <div className="grid grid-cols-4 text-gray-400 border-b border-white/10 pb-3 mb-4 font-medium">
          <p>Hash</p>
          <p>Amount</p>
          <p>Message</p>
          <p>Status</p>
        </div>
  
        {/* Rows */}
        <div className="space-y-4 max-h-[320px] overflow-y-auto">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-400">
              No transactions yet
            </p>
          ) : (
            transactions.map((tx, index) => (
              <div
                key={index}
                className="grid grid-cols-4 items-center py-3 border-b border-white/5"
              >
  
                {/* Clickable Hash */}
                <a
                  href={`https://sepolia.etherscan.io/tx/${tx.transactionHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  {tx.transactionHash?.slice(0, 10)}...
                </a>
  
                {/* Amount */}
                <p>{tx.amount} ETH</p>
  
                {/* Message */}
                <p className="truncate text-gray-300">
                  {tx.message || "-"}
                </p>
  
                {/* Status */}
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