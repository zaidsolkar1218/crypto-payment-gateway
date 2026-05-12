import { useState } from "react";
import Navbar from "../components/Navbar";
import PaymentForm from "../components/PaymentForm";
import TransactionStatus from "../components/TransactionStatus";

function Home() {
  const [account, setAccount] = useState("");
  const [transaction, setTransaction] = useState(null);

  const connectWallet = async () => {
    console.log("Ethereum Object:", window.ethereum);
  
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask not detected. Please open this site in your MetaMask-enabled browser.");
      return;
    }
  
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  
    setAccount(accounts[0]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        account={account}
        connectWallet={connectWallet}
      />

      <div className="flex flex-col items-center justify-center mt-20 px-4">
        <PaymentForm setTransaction={setTransaction} />
        <TransactionStatus transaction={transaction} />
      </div>
    </div>
  );
}

export default Home;