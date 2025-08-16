import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Shield, Users, Zap, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Decentralized Trust',
      description: 'Smart contracts ensure transparent and trustless agreements between advertisers and influencers.'
    },
    {
      icon: Users,
      title: 'Global Network',
      description: 'Connect with influencers and advertisers from around the world on Avalanche blockchain.'
    },
    {
      icon: Zap,
      title: 'Instant Payments',
      description: 'Fast and low-cost transactions powered by Avalanche network technology.'
    },
    {
      icon: TrendingUp,
      title: 'Performance Tracking',
      description: 'Advanced analytics and dispute resolution system for campaign optimization.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              Powered by Avalanche
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent">
              Decentralized Influencer Marketing Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect advertisers with influencers through transparent, trustless smart contracts. 
              Stake AVAX, create campaigns, and build authentic partnerships on Web3.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/advertiser">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity group">
                  Register as Advertiser
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/influencer">
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                  Join as Influencer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose AdTrust?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of influencer marketing with blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-gradient-card border-border/50 hover:border-primary/50 transition-colors group">
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to get started with decentralized influencer marketing
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
                  <p className="text-muted-foreground">Connect your MetaMask or Core Wallet to start using AdTrust on Avalanche.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Stake & Create</h3>
                  <p className="text-muted-foreground">Advertisers stake AVAX/USDC and create campaigns. Influencers browse and accept campaigns.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Deliver & Verify</h3>
                  <p className="text-muted-foreground">Influencers deliver content, submit proof, and get paid automatically through smart contracts.</p>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-gradient-card border-border/50">
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Trustless Automation</h3>
                <p className="text-muted-foreground mb-6">
                  Smart contracts handle payments, disputes, and campaign management automatically. 
                  No intermediaries, no delays, no trust issues.
                </p>
                <Badge className="bg-success/10 text-success border-success/20">
                  100% Transparent
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-purple-500/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of advertisers and influencers building the future of marketing on Web3
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/advertiser">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                Start as Advertiser
              </Button>
            </Link>
            <Link to="/influencer">
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                Join as Influencer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage