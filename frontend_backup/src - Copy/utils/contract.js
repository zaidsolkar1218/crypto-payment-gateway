import { ethers } from "ethers";

export const CONTRACT_ADDRESS =
  "0xF23E7CB6dF798429C7F1CF615c7149377A309EC7";

export const CONTRACT_ABI = [
  "function pay(string memory _message) public payable",
  "function getPayments() public view returns (tuple(address sender,uint256 amount,string message,uint256 timestamp)[])"
];

export const getContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask not detected");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );
};