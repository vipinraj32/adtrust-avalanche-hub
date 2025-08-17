import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const LoggedInNavbar = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/advertiser/login');
  };
  return (
    <header className="sticky top-4 z-50 max-w-6xl w-full mx-auto border-b border-border bg-transparent backdrop-blur-xl shadow-lg rounded-3xl" style={{border: '1px solid rgba(255,255,255,0.12)'}}>
      <div className="container mx-auto px-4 flex h-12 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 group">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
            <span className="text-sm font-bold text-primary-foreground">AvaxTrust</span>
          </div>
          <span className="text-xl font-bold text-primary bg-clip-text text-transparent">
            AdTrust
          </span>
        </div>
        <Button
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:from-purple-700 hover:to-pink-700 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};
