function Navbar() {
  const wallet = localStorage.getItem("walletAddress");

  return (
    <nav className="flex justify-between items-center px-8 py-6 bg-slate-950 text-white">
      <h1 className="text-4xl font-bold">
        Crypto Payment Gateway
      </h1>

      <button className="bg-blue-600 px-5 py-3 rounded-xl">
        {wallet
          ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
          : "Connect Wallet"}
      </button>
    </nav>
  );
}

export default Navbar;