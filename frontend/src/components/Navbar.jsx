function Navbar({ account, connectWallet }) {
    return (
      <nav className="flex justify-between items-center p-6 bg-gray-900 text-white">
        <h1 className="text-2xl font-bold">Crypto Payment Gateway</h1>
  
        <button
          onClick={connectWallet}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {account
            ? `${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </nav>
    );
  }
  
  export default Navbar;