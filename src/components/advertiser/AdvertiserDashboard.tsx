import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import AdPlatformABI from "../../lib/AdPlatform.json";

const contractAddress = "0xd2a5bC10698FD955D1Fe6cb468a17809A08fd005"; // Replace with your contract address

const AdvertiserDashboard: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");
  const [price, setPrice] = useState("");
  const [showInfluencers, setShowInfluencers] = useState(false);
  const [ads, setAds] = useState<any[]>([]);
  const [loadingAds, setLoadingAds] = useState(false);
  const [txStatus, setTxStatus] = useState("");

  useEffect(() => {
    setCompanyName(localStorage.getItem("companyName") || "");
    setEmail(localStorage.getItem("email") || "");
  }, []);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setTxStatus("");
    try {
      if (!(window as any).ethereum) return alert("Please install MetaMask!");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, AdPlatformABI, signer);
      setTxStatus("Waiting for MetaMask confirmation...");
      const tx = await contract.createAd(
        companyName,
        companyName, // using companyName as advertiserName for demo
        email,
        requirement,
        ethers.parseEther(price || "0")
      );
      setTxStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      setTxStatus("Ad successfully stored on-chain!");
      setRequirement("");
      setPrice("");
      fetchAds();
    } catch (err: any) {
      setTxStatus("Transaction failed or rejected.");
    }
  };

  const fetchAds = async () => {
    setLoadingAds(true);
    try {
      if (!(window as any).ethereum) return alert("Please install MetaMask!");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const contract = new ethers.Contract(contractAddress, AdPlatformABI, provider);
      const ads = await contract.getAllAds();
      setAds(ads);
    } catch (err) {
      alert("Failed to fetch ads from chain");
    }
    setLoadingAds(false);
  };

  const handleShowInfluencers = () => {
    setShowInfluencers(!showInfluencers);
    if (!showInfluencers) fetchAds();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:via-purple-900/40 dark:to-blue-900/40 p-8">
      <div className="w-full max-w-2xl bg-white/80 dark:bg-slate-900/70 rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-primary">{companyName || "Your Company"}</h1>
        <div className="text-center text-slate-600 dark:text-slate-300 mb-6">Email: {email}</div>
        <form onSubmit={handlePublish} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Requirement</label>
            <input
              type="text"
              value={requirement}
              onChange={e => setRequirement(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Budget (AVAX)</label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 text-lg font-semibold rounded bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-md transition">
            Publish Advertisement
          </button>
        </form>
        {txStatus && <div className="mt-4 text-center text-purple-700 dark:text-purple-300">{txStatus}</div>}
        <button
          className="mt-6 w-full py-2 rounded bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:from-blue-600 hover:to-green-600 transition"
          onClick={handleShowInfluencers}
        >
          {showInfluencers ? "Hide Influencer Details" : "Show Influencer Details"}
        </button>
        {showInfluencers && (
          <div className="mt-6 bg-white/60 dark:bg-slate-800/60 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Influencer Details (All Ads)</h3>
            {loadingAds ? (
              <div className="text-center text-gray-500">Loading ads from chain...</div>
            ) : (
              <ul className="space-y-2">
                {ads.length === 0 ? (
                  <div className="text-center text-gray-500">No ads found.</div>
                ) : (
                  ads.map((ad, idx) => (
                    <li key={idx} className="border-b border-slate-200 dark:border-slate-700 pb-2">
                      <div><span className="font-semibold">Company:</span> {ad.companyName}</div>
                      <div><span className="font-semibold">Advertiser:</span> {ad.advertiserName}</div>
                      <div><span className="font-semibold">Email:</span> {ad.email}</div>
                      <div><span className="font-semibold">Requirement:</span> {ad.requirement}</div>
                      <div><span className="font-semibold">Budget:</span> {ethers.formatEther(ad.price || 0)} AVAX</div>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
