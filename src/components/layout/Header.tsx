import { useState } from 'react'
import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, LogOut, Menu, X } from 'lucide-react'
import { ConnectWallet } from '@/components/web3/ConnectWallet'
import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const { disconnect } = useDisconnect()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Advertiser', href: '/advertiser' },
    { name: 'Influencer', href: '/influencer' },
    { name: 'Disputes', href: '/disputes' },
  ]

  const formatAddress = (addr: string) => 
    `${addr.slice(0, 6)}...${addr.slice(-4)}`

  const formatBalance = (bal: any) => 
    bal ? `${Number(bal.formatted).toFixed(4)} ${bal.symbol}` : '0.0000 AVAX'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center">
              <span className="text-sm font-bold text-white">AT</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              AdTrust
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Wallet Info & Connect */}
          <div className="flex items-center space-x-4">
            {isConnected && address ? (
              <div className="hidden sm:flex items-center space-x-3">
                <Card className="px-3 py-1.5 bg-gradient-card border-border/50">
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <div className="font-medium">{formatAddress(address)}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatBalance(balance)}
                      </div>
                    </div>
                  </div>
                </Card>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => disconnect()}
                  className="hidden lg:flex"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <ConnectWallet />
            )}

            {/* Mobile menu button */}
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
              
              {isConnected && address && (
                <div className="px-3 py-2 mt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">Connected</div>
                  <div className="text-sm font-medium">{formatAddress(address)}</div>
                  <div className="text-xs text-muted-foreground mb-3">
                    {formatBalance(balance)}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      disconnect()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}