import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi";
import { Header } from "@/components/layout/Header";
import { LoggedInNavbar } from "@/components/layout/LoggedInNavbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import AdvertiserDashboard from "./components/advertiser/AdvertiserDashboard";
import InfluencerDashboard from "./pages/InfluencerDashboard";
import DisputePage from "./pages/DisputePage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdvertiserLogin from "./components/advertiser/AdvertiserLogin";
import AdvertiserSignup from "./components/advertiser/AdvertiserSignup";
import InfluencerLogin from "./components/influencer/InfluencerLogin";
import InfluencerSignup from "./components/influencer/InfluencerSignup";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn ? <LoggedInNavbar /> : <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/advertiser/login" element={<AdvertiserLogin />} />
        <Route path="/advertiser/signup" element={<AdvertiserSignup />} />
        <Route path="/advertiser" element={<AdvertiserDashboard />} />
        <Route path="/influencer/login" element={<InfluencerLogin />} />
        <Route path="/influencer/signup" element={<InfluencerSignup />} />
  <Route path="/influencer" element={<InfluencerDashboard />} />
        <Route path="/disputes" element={<DisputePage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
