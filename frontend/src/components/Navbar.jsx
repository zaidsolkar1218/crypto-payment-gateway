const Navbar = ({ walletData = {} }) => {
  return (
    <nav className="w-full flex justify-between items-center px-12 py-6 border-b border-white/10 bg-[#060B1F] text-white sticky top-0 z-50 backdrop-blur-lg">

      {/* LEFT - LOGO */}
      <div>
        <h1 className="text-3xl font-bold tracking-wide">
          CryptoPay
        </h1>

        <p className="text-sm text-gray-400">
          Secure • Fast • Decentralized
        </p>
      </div>

      {/* CENTER - NAVIGATION */}
      <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">

        <button className="hover:text-white transition">
          Dashboard
        </button>

        <button className="hover:text-white transition">
          Payments
        </button>

        <button className="hover:text-white transition">
          History
        </button>

        <button className="hover:text-white transition">
          About
        </button>

      </div>

      {/* RIGHT - NETWORK + WALLET */}
      <div className="flex items-center gap-4">

        {/* Network */}
        <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-sm text-green-400 font-medium">
            {walletData?.network || "No Network"}
          </span>
        </div>

        {/* Wallet */}
        <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg">
          <span className="text-sm font-medium">
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