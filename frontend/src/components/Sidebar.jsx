const Sidebar = ({ walletData }) => {
    return (
      <div className="space-y-6 min-h-full">
  
        {/* Wallet Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
          <h2 className="text-xl font-bold mb-4">Wallet Status</h2>
  
          {/* Address */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm">Connected Address</p>
            <p className="text-white break-all text-sm mt-1">
              {walletData?.address
                ? `${walletData.address.slice(0, 6)}...${walletData.address.slice(-4)}`
                : "Not Connected"}
            </p>
          </div>
  
          {/* Balance */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm">Balance</p>
            <p className="text-2xl font-semibold mt-1">
              {walletData?.balance || "0.0000"} ETH
            </p>
          </div>
  
          {/* Network */}
          <div>
            <p className="text-gray-400 text-sm">Network</p>
            <p className="text-green-400 font-medium mt-1">
              {walletData?.network || "Unknown"}
            </p>
          </div>
        </div>
  
        {/* Security Card */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl p-6 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
          <h3 className="text-lg font-bold mb-2">
            Secure Payments
          </h3>
  
          <p className="text-sm text-white/90">
            All transactions are encrypted and verified on blockchain.
          </p>
        </div>
  
        {/* Quick Info Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
          <h3 className="text-lg font-bold mb-4">Quick Info</h3>
  
          <div className="flex justify-between mb-3">
            <span className="text-gray-400">Gas Fee</span>
            <span>~0.0002 ETH</span>
          </div>
  
          <div className="flex justify-between mb-3">
            <span className="text-gray-400">Status</span>
            <span
              className={`${
                walletData?.address ? "text-green-400" : "text-red-400"
              }`}
            >
              {walletData?.address ? "Connected" : "Disconnected"}
            </span>
          </div>
  
          <div className="flex justify-between">
            <span className="text-gray-400">Security</span>
            <span>100%</span>
          </div>
        </div>
  
      </div>
    );
  };
  
  export default Sidebar;