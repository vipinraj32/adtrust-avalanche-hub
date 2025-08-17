import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import AdPlatformABI from "../../lib/AdPlatform.json";

const contractAddress = "0xfA72E68D3fd31F7f00CEeAf463A39F1dC274d0f7"; // ✅ your contract

const AdvertiserDashboard: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [advertiserName, setAdvertiserName] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");
  const [price, setPrice] = useState("");
  const [ads, setAds] = useState<any[]>([]);
  const [loadingAds, setLoadingAds] = useState(false);
  const [txStatus, setTxStatus] = useState("");

  // ✅ Load stored advertiser info on mount
  useEffect(() => {
    setCompanyName(localStorage.getItem("companyname") || "");
    setAdvertiserName(localStorage.getItem("Adname") || "");
    setEmail(localStorage.getItem("email") || "");
    fetchAds(); // auto fetch ads
  }, []);

  // ✅ Publish ad to smart contract
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setTxStatus("");
    try {
      if (!(window as any).ethereum) return alert("Please install MetaMask!");

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, AdPlatformABI, signer);

      setTxStatus("⏳ Waiting for MetaMask confirmation...");
      const tx = await contract.createAd(
        companyName,
        advertiserName,
        email,
        requirement,
        ethers.parseEther(price || "0")
      );

      setTxStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();

      setTxStatus("Ad successfully stored on-chain!");
      setRequirement("");
      setPrice("");

      fetchAds(); // refresh ads
    } catch (err: any) {
      console.error("Publish error:", err);
      setTxStatus("Transaction failed or rejected.");
    }
  };

  // ✅ Fetch all ads from blockchain
  const fetchAds = async () => {
    setLoadingAds(true);
    try {
      if (!(window as any).ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const contract = new ethers.Contract(contractAddress, AdPlatformABI, provider);

      console.log("Fetching ads from:", contractAddress);
      const adsOnChain = await contract.getAllAds();

      // map raw array into readable objects
      const mappedAds = adsOnChain.map((ad: any) => ({
        companyName: ad[0],
        advertiserName: ad[1],
        email: ad[2],
        requirement: ad[3],
        price: ad[4],
      }));

      console.log("Mapped Ads:", mappedAds);
      setAds(mappedAds);
    } catch (err: any) {
      console.error("Fetch ads error:", err);
      alert("Failed to fetch ads from chain: " + (err.message || err));
    } finally {
      setLoadingAds(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:via-purple-900/40 dark:to-blue-900/40 p-8">
      <div className="w-full max-w-2xl bg-white/80 dark:bg-slate-900/70 rounded-2xl shadow-xl p-8 mb-8">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-2 text-primary">
          {companyName || "Your Company"}
        </h1>
        <div className="text-center text-slate-600 dark:text-slate-300 mb-6">
          Email: {email || "Not provided"}
        </div>

        {/* Publish Ad Form */}
        <form onSubmit={handlePublish} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Advertiser Name</label>
            <input
              type="text"
              value={advertiserName}
              onChange={(e) => setAdvertiserName(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Requirement</label>
            <input
              type="text"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
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
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold rounded bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-md transition"
          >
            Publish Advertisement
          </button>
        </form>

        {/* Transaction Status */}
        {txStatus && (
          <div className="mt-4 text-center text-purple-700 dark:text-purple-300">
            {txStatus}
          </div>
        )}



        {/* My Ads Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">My Ads</h2>
          {loadingAds ? (
            <div className="text-center text-gray-500">Loading ads from chain...</div>
          ) : (
            <ul className="space-y-4">
              {ads.filter((ad) => (ad.advertiserName || '').toLowerCase().trim() === (advertiserName || '').toLowerCase().trim()).length === 0 ? (
                <div className="text-center text-gray-500">No ads found.</div>
              ) : (
                ads
                  .filter((ad) => (ad.advertiserName || '').toLowerCase().trim() === (advertiserName || '').toLowerCase().trim())
                  .map((ad, idx) => (
                    <li
                      key={idx}
                      className="border rounded-lg p-4 bg-white/70 dark:bg-slate-800/70"
                    >
                      <div><span className="font-semibold">Company:</span> {ad.companyName || '-'}</div>
                      <div><span className="font-semibold">Advertiser:</span> {ad.advertiserName}</div>
                      <div><span className="font-semibold">Email:</span> {ad.email}</div>
                      <div><span className="font-semibold">Requirement:</span> {ad.requirement}</div>
                      <div><span className="font-semibold">Budget:</span> {ad.price ? (typeof ad.price === 'string' ? ad.price : ethers.formatEther(ad.price)) : '-'} AVAX</div>
                    </li>
                  ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;


