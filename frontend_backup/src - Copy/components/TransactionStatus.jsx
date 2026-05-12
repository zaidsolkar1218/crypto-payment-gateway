function TransactionStatus({ transaction }) {
    if (!transaction) return null;
  
    return (
      <div className="mt-6 text-center">
        {transaction.success ? (
          <div>
            <p className="text-green-600 font-bold">
              Payment Successful!
            </p>
            <p className="break-all">
              Tx Hash: {transaction.hash}
            </p>
          </div>
        ) : (
          <p className="text-red-600 font-bold">
            Payment Failed
          </p>
        )}
      </div>
    );
  }
  
  export default TransactionStatus;