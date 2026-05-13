import { useEffect, useState } from "react";
import { ethers } from "ethers";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PaymentForm from "../components/PaymentForm";
import SuccessCard from "../components/SuccessCard";
import TransactionsTable from "../components/TransactionsTable";

const Home = () => {
  // Wallet data
  const [walletData, setWalletData] = useState({
    address: "",
    balance: "",
    network: "",
  });

  // Transaction state
  const [transaction, setTransaction] = useState(null);

  // Transactions history
  const [transactions, setTransactions] = useState([]);

  // Fetch wallet info
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

  // Fetch payment history
  const fetchTransactions = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payments`
      );

      const data = await res.json();

      if (data.success) {
        setTransactions(data.payments.reverse());
      }

    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchWalletData();
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-[#060B1F] text-white">

      {/* Navbar */}
      <Navbar walletData={walletData} />

      {/* Main Dashboard */}
      <div className="px-12 py-10">

        {/* Top Section */}
        <div className="flex gap-8 items-start">

          {/* LEFT SIDEBAR */}
          <div className="w-[25%]">
            <Sidebar walletData={walletData} />
          </div>

          {/* CENTER PAYMENT FORM */}
          <div className="w-[50%]">
            <PaymentForm
              setTransaction={setTransaction}
              refreshTransactions={fetchTransactions}
            />
          </div>

          {/* RIGHT SUCCESS CARD */}
          <div className="w-[25%]">
            <SuccessCard transaction={transaction} />
          </div>

        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="mt-10">
          <TransactionsTable transactions={transactions} />
        </div>

      </div>

    </div>
  );
};

export default Home;