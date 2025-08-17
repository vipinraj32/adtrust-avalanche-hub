import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const CONTRACT_ADDRESS = "0xDA0bab807633f07f013f94DD0E6A4F96F8742B53";
const ABI = ["function register() payable"];

const AdvertiserSignup: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    companyName: "",
    password: "",
    mobile: "",
    wallet: null as string | null,
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const connectWallet = async () => {
    setError("");
    setStatus("");
    if (!window.ethereum) {
      setError("Install MetaMask or Avalanche Core Wallet!");
      return;
    }
    try {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setForm((prev) => ({ ...prev, wallet: accounts[0] }));
      setStatus("Wallet connected: " + accounts[0]);
    } catch (err: any) {
      setError("Wallet connection cancelled or failed.");
    } finally {
      setLoading(false);
    }
  };

  const stakeAndRegister = async () => {
    setError("");
    setStatus("");
    setLoading(true);
    try {
      if (!form.wallet) {
        setError("Connect your wallet first!");
        setLoading(false);
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const minStake = ethers.parseEther("0");
      // Check balance first
      const balance = await provider.getBalance(form.wallet);
      if (balance < minStake) {
        setError(
          "Insufficient AVAX balance. You need at least 250 AVAX in your wallet to stake."
        );
        setLoading(false);
        return;
      }
      // Call register and send funds
      setStatus("Waiting for wallet confirmation...");
      const tx = await contract.register({ value: minStake });
      setStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      setStatus("Stake successful ✅");
      // Save user info to Spring Boot backend
      await fetch("http://localhost:8082/api/advertiser/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          companyName: form.companyName,
          password: form.password,
          mobile: form.mobile,
          wallet: form.wallet,
        }),
      });
      setStatus("Advertiser registered 🎉");
      setTimeout(() => navigate('/advertiser/login'), 1500);
    } catch (err: any) {
      if (err.code === "INSUFFICIENT_FUNDS") {
        setError("Insufficient AVAX in your wallet for staking and gas fees.");
      } else if (err.message && err.message.includes("user rejected")) {
        setError("Transaction rejected in wallet.");
      } else {
        setError("Error: " + (err.message || err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:via-purple-900/40 dark:to-blue-900/40">
      <div className="relative w-full max-w-lg p-8 rounded-2xl shadow-2xl bg-white/30 dark:bg-slate-900/60 backdrop-blur-lg border border-white/20">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 shadow-lg mb-2">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 0c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0v2m0 4h.01"
              />
            </svg>
          </span>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-1 tracking-tight">
            Advertiser Signup
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Create your advertiser account and stake AVAX
          </p>
        </div>
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                Company Name
              </label>
              <input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                Mobile
              </label>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={loading}
              />
            </div>
          </div>
          {!form.wallet ? (
            <button
              type="button"
              onClick={connectWallet}
              className={`w-full py-3 text-lg font-semibold rounded shadow-md transition bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Connecting..." : "Connect Wallet"}
            </button>
          ) : (
            <button
              type="button"
              onClick={stakeAndRegister}
              className={`w-full py-3 text-lg font-semibold rounded shadow-md transition bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Stake & Register"}
            </button>
          )}
        </form>
        {status && (
          <div className="text-green-700 font-medium text-center mt-4">
            {status}
          </div>
        )}
        {error && (
          <div className="text-red-600 font-medium text-center mt-4">
            {error}
          </div>
        )}
        <div className="text-xs text-blue-600 font-semibold max-w-xs text-center mt-2">
          Please connect your wallet to the{" "}
          <span className="underline">Avalanche Fuji (testnet)</span> network for
          testing. You must have at least 250 AVAX (testnet) in your wallet to
          register as an advertiser. Gas fees apply.
        </div>
      </div>
    </div>
  );
};

export default AdvertiserSignup;
