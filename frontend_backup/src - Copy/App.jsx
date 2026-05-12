import Navbar from "./components/Navbar";
import PaymentForm from "./components/PaymentForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <div className="flex justify-center items-center py-20">
        <PaymentForm />
      </div>
    </div>
  );
}

export default App;