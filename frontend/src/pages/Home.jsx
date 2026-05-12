import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PaymentForm from "../components/PaymentForm";
import SuccessCard from "../components/SuccessCard";
import TransactionsTable from "../components/TransactionsTable";

const Home = () => {
  const [walletData, setWalletData] = useState({
    address: "",
    balance: "",
    network: "",
  });

  const [transaction, setTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Fetch backend transaction history
  const fetchTransactions = async () => {
    try {
      const res = await fetch(
        "https://crypto-payment-gateway-2xl2.onrender.com/api/payments"
      );

      const data = await res.json();

      if (data.success) {
        setTransactions(data.payments.reverse());
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  // Fetch wallet + transaction history
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        if (!window.ethereum) return;

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const address = await signer.getAddress();
        const balanceWei = await provider.getBalance(address);
        const balance = ethers.formatEther(balanceWei);
        const network = await provider.getNetwork();

        setWalletData({
          address,
          balance: parseFloat(balance).toFixed(4),
          network: network.name,
        });
      } catch (error) {
        console.error("Wallet fetch failed:", error);
      }
    };

    fetchWalletData();
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-[#060B1F] text-white">

      {/* Navbar */}
      <Navbar walletData={walletData} />

      {/* Main Page */}
      <div className="px-10 py-8">

        {/* Top Layout */}
        <div className="flex gap-8 items-start">

          {/* Sidebar */}
          <div className="w-[25%]">
            <Sidebar walletData={walletData} />
          </div>

          {/* Payment Form */}
          <div className="w-[50%]">
            <PaymentForm
              setTransaction={setTransaction}
              refreshTransactions={fetchTransactions}
            />
          </div>

          {/* Success Card */}
          <div className="w-[25%]">
            <SuccessCard transaction={transaction} />
          </div>

        </div>

        {/* Transactions Table */}
        <div className="mt-8">
          <TransactionsTable transactions={transactions} />
        </div>

      </div>

    </div>
  );
};

export default Home;