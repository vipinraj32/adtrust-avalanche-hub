import { useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { 
  Search, 
  Eye, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Upload,
  Users,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Link } from 'react-router-dom'

const InfluencerDashboard = () => {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const { toast } = useToast()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [proofForm, setProofForm] = useState({
    videoUrl: '',
    postedAt: '',
    description: ''
  })

  // Mock campaigns data
  const activeCampaigns = [
    {
      id: 1,
      title: "Summer Fashion Collection",
      advertiser: "0x1234...5678",
      viewsRequired: 50000,
      payout: "500 AVAX",
      duration: "30 days",
      description: "Promote our new summer fashion line to young audiences aged 18-30",
      targetAudience: "Fashion enthusiasts, 18-30",
      deadline: "2024-02-15",
      status: "Available"
    },
    {
      id: 2,
      title: "Crypto Trading Platform",
      advertiser: "0x8765...4321", 
      viewsRequired: 100000,
      payout: "1200 AVAX",
      duration: "45 days",
      description: "Showcase the benefits of our new crypto trading platform",
      targetAudience: "Crypto enthusiasts, 25-45",
      deadline: "2024-03-01",
      status: "Available"
    },
    {
      id: 3,
      title: "Gaming Accessories Review",
      advertiser: "0x9876...1234",
      viewsRequired: 75000,
      payout: "800 AVAX",
      duration: "30 days", 
      description: "Review our latest gaming accessories and highlight key features",
      targetAudience: "Gamers, 16-35",
      deadline: "2024-02-20",
      status: "Available"
    }
  ]

  // Mock accepted campaigns
  const myCampaigns = [
    {
      id: 4,
      title: "Tech Product Launch",
      advertiser: "0x1111...2222",
      viewsRequired: 80000,
      currentViews: 45000,
      payout: "650 AVAX",
      acceptedAt: "2024-01-10",
      deadline: "2024-02-10",
      status: "In Progress"
    },
    {
      id: 5,
      title: "Health & Wellness App",
      advertiser: "0x3333...4444",
      viewsRequired: 60000,
      currentViews: 62000,
      payout: "450 AVAX",
      acceptedAt: "2024-01-05",
      deadline: "2024-02-05",
      status: "Awaiting Payment"
    }
  ]

  const filteredCampaigns = activeCampaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAcceptCampaign = (campaignId: number) => {
    toast({
      title: "Accepting Campaign",
      description: "Processing campaign acceptance transaction...",
    })

    // Mock acceptance
    setTimeout(() => {
      toast({
        title: "Campaign Accepted!",
        description: "You have successfully accepted the campaign. Start creating content!",
      })
    }, 2000)
  }

  const handleSubmitProof = () => {
    if (!proofForm.videoUrl || !proofForm.postedAt) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Submitting Proof",
      description: "Uploading proof to IPFS and submitting to smart contract...",
    })

    // Mock submission
    setTimeout(() => {
      toast({
        title: "Proof Submitted!",
        description: "Your proof has been submitted successfully. Awaiting verification.",
      })
      setProofForm({ videoUrl: '', postedAt: '', description: '' })
    }, 3000)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-blue-900/20 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-20 bg-white/20 dark:bg-white/5 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-20 right-20 w-40 h-24 bg-purple-200/30 dark:bg-purple-400/10 rounded-full blur-xl animate-float-delayed" />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <Card className="max-w-md mx-auto bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 shadow-glow">
            <CardHeader className="text-center">
              <CardTitle className="text-slate-800 dark:text-white">Connect Your Wallet</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Connect your wallet to access the Influencer Dashboard
              </CardDescription>
            </CardHeader>
            
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-blue-900/20 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-28 h-16 bg-blue-200/30 dark:bg-blue-400/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-32 h-20 bg-purple-200/30 dark:bg-purple-400/10 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/6 w-20 h-12 bg-pink-200/30 dark:bg-pink-400/10 rounded-full blur-xl animate-float-slow" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-slate-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Influencer Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Browse campaigns and manage your content partnerships
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 hover:scale-105 transition-all hover:shadow-glow group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-800 dark:text-white">Wallet Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400 group-hover:animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-white">
                {balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0000 AVAX'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">Available balance</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 hover:scale-105 transition-all hover:shadow-glow group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-800 dark:text-white">Active Campaigns</CardTitle>
              <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400 group-hover:animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-white">{myCampaigns.length}</div>
              <p className="text-xs text-slate-600 dark:text-slate-300">Currently working on</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 hover:scale-105 transition-all hover:shadow-glow group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-800 dark:text-white">Total Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400 group-hover:animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-white">1,850 AVAX</div>
              <p className="text-xs text-slate-600 dark:text-slate-300">All time earnings</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 hover:scale-105 transition-all hover:shadow-glow group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-800 dark:text-white">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 group-hover:animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-white">12</div>
              <p className="text-xs text-slate-600 dark:text-slate-300">Successfully completed</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Campaigns</TabsTrigger>
            <TabsTrigger value="my-campaigns">My Campaigns</TabsTrigger>
            <TabsTrigger value="submit-proof">Submit Proof</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Campaigns</CardTitle>
                <CardDescription>
                  Browse and accept new influencer campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search campaigns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredCampaigns.map((campaign) => (
                    <Card key={campaign.id} className="bg-gradient-card border-border/50 hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-xl font-semibold">{campaign.title}</h3>
                              <Badge className="bg-primary/10 text-primary border-primary/20">
                                Available
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">{campaign.description}</p>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <Eye className="h-4 w-4 text-primary" />
                                <span>{campaign.viewsRequired.toLocaleString()} views</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-4 w-4 text-success" />
                                <span>{campaign.payout}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-warning" />
                                <span>{campaign.duration}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{campaign.targetAudience}</span>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Advertiser: {campaign.advertiser} • Deadline: {campaign.deadline}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button
                              onClick={() => handleAcceptCampaign(campaign.id)}
                              className="bg-gradient-primary hover:opacity-90 transition-opacity"
                            >
                              Accept Campaign
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Active Campaigns</CardTitle>
                <CardDescription>
                  Track progress on your accepted campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myCampaigns.map((campaign) => (
                    <Card key={campaign.id} className="bg-gradient-card border-border/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-xl font-semibold">{campaign.title}</h3>
                              <Badge className={
                                campaign.status === 'In Progress' 
                                  ? 'bg-warning/10 text-warning border-warning/20'
                                  : 'bg-success/10 text-success border-success/20'
                              }>
                                {campaign.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <Eye className="h-4 w-4 text-primary" />
                                <span>
                                  {campaign.currentViews?.toLocaleString() || 0} / {campaign.viewsRequired.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-4 w-4 text-success" />
                                <span>{campaign.payout}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Due: {campaign.deadline}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">Accepted: {campaign.acceptedAt}</span>
                              </div>
                            </div>
                            {campaign.currentViews && (
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className="bg-gradient-primary h-2 rounded-full transition-all"
                                  style={{ 
                                    width: `${Math.min((campaign.currentViews / campaign.viewsRequired) * 100, 100)}%` 
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col space-y-2">
                            {campaign.status === 'Awaiting Payment' ? (
                              <Link to="/disputes">
                                <Button variant="outline">
                                  View Status
                                </Button>
                              </Link>
                            ) : (
                              <Button variant="outline">
                                Update Progress
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submit-proof" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Campaign Proof</CardTitle>
                <CardDescription>
                  Submit proof of your campaign completion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="videoUrl">Video/Content URL *</Label>
                      <Input
                        id="videoUrl"
                        type="url"
                        value={proofForm.videoUrl}
                        onChange={(e) => setProofForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="postedAt">Posted Date *</Label>
                      <Input
                        id="postedAt"
                        type="datetime-local"
                        value={proofForm.postedAt}
                        onChange={(e) => setProofForm(prev => ({ ...prev, postedAt: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Additional Notes</Label>
                      <Textarea
                        id="description"
                        value={proofForm.description}
                        onChange={(e) => setProofForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Any additional information about the campaign delivery..."
                        rows={4}
                      />
                    </div>
                  </div>

                  <Card className="bg-muted/20 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center">
                        <Upload className="h-5 w-5 mr-2 text-primary" />
                        Proof Requirements
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Valid URL to published content</li>
                        <li>• Accurate timestamp of publication</li>
                        <li>• Content must meet campaign requirements</li>
                        <li>• Proof will be stored on IPFS</li>
                        <li>• Verification process may take 24-48 hours</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Button 
                  onClick={handleSubmitProof}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Proof
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default InfluencerDashboard