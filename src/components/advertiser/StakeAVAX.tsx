import { useState } from "react";
import { ethers } from "ethers";
import AdStake from "./AdStake.json"; // ABI

const CONTRACT_ADDRESS = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";

export default function StakeAVAX() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function connectWallet() {
    if (!window.ethereum) return alert("Install MetaMask or Core Wallet!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner();
  }

  async function createCampaign() {
    setLoading(true);
    try {
      const signer = await connectWallet();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, AdStake.abi, signer);
      const tx = await contract.createCampaign(
        "0xInfluencerWalletAddress", // influencer wallet
        Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 1 week deadline
        { value: ethers.parseEther(amount) }
      );
      await tx.wait();
      alert("Campaign created and funds staked!");
      setAmount("");
    } catch (err) {
      alert("Error: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[40vh]">
      <input
        type="text"
        placeholder="Enter AVAX amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded mb-4 w-64 text-center"
        disabled={loading}
      />
      <button
        onClick={createCampaign}
        className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
        disabled={loading || !amount}
      >
        {loading ? "Staking..." : "Stake"}
      </button>
    </div>
  );
}
