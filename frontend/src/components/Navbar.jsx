const Navbar = ({ walletData = {} }) => {
  return (
    <nav className="w-full flex justify-between items-center px-10 py-6 border-b border-white/10 bg-[#060B1F] text-white">

      {/* Logo */}
      <div>
        <h1 className="text-3xl font-bold">
          CryptoPay
        </h1>

        <p className="text-sm text-gray-400">
          Secure • Fast • Decentralized
        </p>
      </div>

      {/* Wallet Info */}
      <div className="flex items-center gap-4">

        {/* Network */}
        <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-sm text-green-400">
            {walletData?.network || "No Network"}
          </span>
        </div>

        {/* Wallet */}
        <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500">
          <span className="text-sm">
            {walletData?.address
              ? `${walletData.address.slice(0, 6)}...${walletData.address.slice(-4)}`
              : "Connect Wallet"}
          </span>
        </div>

      </div>

    </nav>
  );
};

export default Navbar;