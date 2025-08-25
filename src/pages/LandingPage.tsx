import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Shield, Users, Zap, TrendingUp, Coins, Globe, Sparkles } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-blue-900/20 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cloud shapes */}
        <div className="absolute top-10 left-10 w-32 h-20 bg-white/20 dark:bg-white/5 rounded-full blur-xl animate-float" />
        <div className="absolute top-20 right-20 w-40 h-24 bg-purple-200/30 dark:bg-purple-400/10 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-28 h-16 bg-blue-200/30 dark:bg-blue-400/10 rounded-full blur-xl animate-float" />
        
        {/* Floating coins */}
        <div className="absolute top-1/4 right-1/3 animate-float-slow">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
            <Coins className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/6 animate-float-delayed">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg" />
        </div>
        
        <div className="absolute top-1/2 right-1/6 animate-float">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg" />
        </div>

        {/* Floating card elements */}
        <div className="absolute top-1/3 left-1/5 animate-float-slow transform rotate-12">
          <div className="w-16 h-20 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg border border-white/20 shadow-lg" />
        </div>
        
        <div className="absolute bottom-1/4 right-1/4 animate-float transform -rotate-12">
          <div className="w-14 h-18 bg-gradient-to-br from-purple-400/20 to-blue-500/20 backdrop-blur-md rounded-lg border border-white/20 shadow-lg" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 dark:bg-white/10 text-primary border-white/30 hover:bg-white/30 backdrop-blur-md shadow-lg animate-float">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Avalanche
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight">
              Whisper Your Campaigns Into The Chain
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect advertisers with influencers through transparent, trustless smart contracts. 
              Let your partnerships travel unseen through the decentralized web.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/advertiser">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-all hover:scale-105 hover:shadow-glow group backdrop-blur-md">
                  Whisper as Advertiser
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/influencer">
                <Button size="lg" variant="outline" className="bg-white/20 dark:bg-white/10 border-white/30 hover:bg-white/30 backdrop-blur-md text-slate-700 dark:text-white hover:scale-105 transition-all">
                  Join as Influencer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Why Choose AvaxTrust?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Experience the future of influencer marketing with blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 hover:border-purple-400/50 transition-all hover:scale-105 hover:shadow-glow group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow animate-float-slow">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Simple steps to get started with decentralized influencer marketing
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm animate-float-slow group-hover:shadow-glow transition-shadow">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">Connect Your Wallet</h3>
                  <p className="text-slate-600 dark:text-slate-300">Connect your MetaMask or Core Wallet to start using AdTrust on Avalanche.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm animate-float-delayed group-hover:shadow-glow transition-shadow">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">Stake & Create</h3>
                  <p className="text-slate-600 dark:text-slate-300">Advertisers stake AVAX/USDC and create campaigns. Influencers browse and accept campaigns.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm animate-float group-hover:shadow-glow transition-shadow">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">Deliver & Verify</h3>
                  <p className="text-slate-600 dark:text-slate-300">Influencers deliver content, submit proof, and get paid automatically through smart contracts.</p>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 hover:scale-105 transition-all hover:shadow-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
              <div className="text-center relative z-10">
                <div className="h-20 w-20 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center animate-float-slow shadow-glow">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Trustless Automation</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Smart contracts handle payments, disputes, and campaign management automatically. 
                  No intermediaries, no delays, no trust issues.
                </p>
                <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 backdrop-blur-md">
                  100% Transparent
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of advertisers and influencers building the future of marketing on web3 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/advertiser">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-all hover:scale-105 hover:shadow-glow backdrop-blur-md">
                Start as Advertiser
              </Button>
            </Link>
            <Link to="/influencer">
              <Button size="lg" variant="outline" className="bg-white/20 dark:bg-white/10 border-white/30 hover:bg-white/30 backdrop-blur-md text-slate-700 dark:text-white hover:scale-105 transition-all">
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