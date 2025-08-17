import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Advertiser', href: '/advertiser/login' },
    { name: 'Influencer', href: '/influencer' },
    { name: 'Disputes', href: '/disputes' },
  ];
  return (
    <header className="sticky top-4 z-50 max-w-6xl w-full mx-auto border-b border-border bg-transparent backdrop-blur-xl shadow-lg rounded-3xl" style={{border: '1px solid rgba(255,255,255,0.12)'}}>
      <div className="container mx-auto px-4">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
              <span className="text-sm font-bold text-primary-foreground">AvaxTrust</span>
            </div>
            <span className="text-xl font-bold text-primary bg-clip-text text-transparent">
              AdTrust
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all hover:scale-105 ${
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Instagram Login Button & Mobile menu button */}
          <div className="flex items-center space-x-4">
            <button
              className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:from-pink-600 hover:to-yellow-600 transition-colors"
              onClick={() => alert('Instagram login coming soon!')}
            >
              Sign in with Instagram
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    location.pathname === item.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}