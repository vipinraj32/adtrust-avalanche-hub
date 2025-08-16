import { useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConnectWallet } from '@/components/web3/ConnectWallet'
import { 
  DollarSign, 
  Plus, 
  Eye, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Upload,
  Coins
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const AdvertiserDashboard = () => {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const { toast } = useToast()
  
  // Mock data - replace with real data from smart contracts
  const [advertiserData, setAdvertiserData] = useState({
    isAdvertiser: true,
    stakedBalance: '1000.0',
    totalCampaigns: 5,
    activeCampaigns: 2
  })

  const [stakeForm, setStakeForm] = useState({
    amount: '',
    token: 'AVAX'
  })

  const [campaignForm, setCampaignForm] = useState({
    title: '',
    description: '',
    viewsRequired: '',
    payout: '',
    duration: '',
    targetAudience: ''
  })

  // Mock campaigns data
  const campaigns = [
    {
      id: 1,
      title: "Summer Fashion Collection",
      status: "Active",
      viewsRequired: 50000,
      payout: "500 AVAX",
      duration: "30 days",
      acceptedBy: "0x742d...7686",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Tech Product Launch",
      status: "Satisfied",
      viewsRequired: 100000,
      payout: "1000 AVAX", 
      duration: "45 days",
      acceptedBy: "0x8f3a...9123",
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      title: "Gaming Platform Promo",
      status: "Disputed",
      viewsRequired: 75000,
      payout: "750 AVAX",
      duration: "30 days", 
      acceptedBy: "0x2c1b...4567",
      createdAt: "2024-01-05"
    }
  ]

  const handleStake = async () => {
    if (!stakeForm.amount) {
      toast({
        title: "Error",
        description: "Please enter an amount to stake",
        variant: "destructive"
      })
      return
    }

    // TODO: Implement smart contract staking
    toast({
      title: "Staking Transaction",
      description: `Staking ${stakeForm.amount} ${stakeForm.token}...`,
    })
    
    // Mock success
    setTimeout(() => {
      toast({
        title: "Stake Successful",
        description: `Successfully staked ${stakeForm.amount} ${stakeForm.token}`,
      })
      setStakeForm({ amount: '', token: 'AVAX' })
    }, 2000)
  }

  const handleCreateCampaign = async () => {
    if (!campaignForm.title || !campaignForm.viewsRequired || !campaignForm.payout) {
      toast({
        title: "Error", 
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    // TODO: Upload to IPFS and call smart contract
    toast({
      title: "Creating Campaign",
      description: "Uploading campaign data and creating smart contract...",
    })

    // Mock success
    setTimeout(() => {
      toast({
        title: "Campaign Created",
        description: "Your campaign has been created successfully!",
      })
      setCampaignForm({
        title: '',
        description: '', 
        viewsRequired: '',
        payout: '',
        duration: '',
        targetAudience: ''
      })
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-primary/10 text-primary border-primary/20'
      case 'Satisfied': return 'bg-success/10 text-success border-success/20'
      case 'Failed': return 'bg-destructive/10 text-destructive border-destructive/20'
      case 'Disputed': return 'bg-warning/10 text-warning border-warning/20'
      default: return 'bg-muted/10 text-muted-foreground border-muted/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Clock className="h-4 w-4" />
      case 'Satisfied': return <CheckCircle className="h-4 w-4" />
      case 'Failed': return <XCircle className="h-4 w-4" />
      case 'Disputed': return <AlertTriangle className="h-4 w-4" />
      default: return <Eye className="h-4 w-4" />
    }
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
                Connect your wallet to access the Advertiser Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ConnectWallet />
            </CardContent>
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
            Advertiser Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage your campaigns and track performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 hover:scale-105 transition-all hover:shadow-glow group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-800 dark:text-white">Wallet Balance</CardTitle>
              <Coins className="h-4 w-4 text-purple-600 dark:text-purple-400 group-hover:animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-white">
                {balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0000 AVAX'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">Available for staking</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 hover:scale-105 transition-all hover:shadow-glow group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-800 dark:text-white">Staked Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400 group-hover:animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-white">{advertiserData.stakedBalance} AVAX</div>
              <p className="text-xs text-slate-600 dark:text-slate-300">Currently staked</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 hover:scale-105 transition-all hover:shadow-glow group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-800 dark:text-white">Total Campaigns</CardTitle>
              <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400 group-hover:animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-white">{advertiserData.totalCampaigns}</div>
              <p className="text-xs text-slate-600 dark:text-slate-300">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 hover:scale-105 transition-all hover:shadow-glow group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-800 dark:text-white">Active Campaigns</CardTitle>
              <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400 group-hover:animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-white">{advertiserData.activeCampaigns}</div>
              <p className="text-xs text-slate-600 dark:text-slate-300">Currently running</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20">
            <TabsTrigger value="campaigns" className="text-slate-700 dark:text-slate-300 data-[state=active]:bg-white/20 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">My Campaigns</TabsTrigger>
            <TabsTrigger value="create" className="text-slate-700 dark:text-slate-300 data-[state=active]:bg-white/20 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">Create Campaign</TabsTrigger>
            <TabsTrigger value="stake" className="text-slate-700 dark:text-slate-300 data-[state=active]:bg-white/20 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">Stake Tokens</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 shadow-glow">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-white">Campaign Management</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  Monitor your active campaigns and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="bg-white/5 dark:bg-white/5 backdrop-blur-md border-white/10 hover:border-purple-400/50 transition-all hover:scale-[1.02] hover:shadow-glow group">
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{campaign.title}</h3>
                              <Badge className={`w-fit ${getStatusColor(campaign.status)} backdrop-blur-md`}>
                                {getStatusIcon(campaign.status)}
                                <span className="ml-1">{campaign.status}</span>
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 text-sm text-slate-600 dark:text-slate-300">
                              <span>Views: {campaign.viewsRequired.toLocaleString()}</span>
                              <span>Payout: {campaign.payout}</span>
                              <span>Duration: {campaign.duration}</span>
                              {campaign.acceptedBy && (
                                <span className="truncate">Influencer: {campaign.acceptedBy}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <Button variant="outline" size="sm" className="bg-white/10 border-white/30 hover:bg-white/20 text-slate-700 dark:text-white">
                              View Details
                            </Button>
                            {campaign.status === 'Disputed' && (
                              <Button variant="destructive" size="sm" className="bg-red-500/20 border-red-500/30 hover:bg-red-500/30 text-red-600 dark:text-red-400">
                                Manage Dispute
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

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Campaign</CardTitle>
                <CardDescription>
                  Set up a new influencer marketing campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Campaign Title *</Label>
                      <Input
                        id="title"
                        value={campaignForm.title}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter campaign title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={campaignForm.description}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your campaign requirements..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="target">Target Audience</Label>
                      <Input
                        id="target"
                        value={campaignForm.targetAudience}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, targetAudience: e.target.value }))}
                        placeholder="e.g., Tech enthusiasts, 18-35"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="views">Views Required *</Label>
                      <Input
                        id="views"
                        type="number"
                        value={campaignForm.viewsRequired}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, viewsRequired: e.target.value }))}
                        placeholder="50000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="payout">Payout (AVAX) *</Label>
                      <Input
                        id="payout"
                        type="number"
                        step="0.01"
                        value={campaignForm.payout}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, payout: e.target.value }))}
                        placeholder="100.00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="duration">Duration (days)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={campaignForm.duration}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="30"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                  <Upload className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Campaign terms will be stored on IPFS</p>
                    <p className="text-sm text-muted-foreground">
                      Your campaign details will be uploaded to IPFS for transparency and immutability
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={handleCreateCampaign}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stake" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stake Tokens</CardTitle>
                <CardDescription>
                  Stake AVAX or USDC to become a verified advertiser
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Amount to Stake</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={stakeForm.amount}
                        onChange={(e) => setStakeForm(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="Enter amount"
                      />
                    </div>

                    <div>
                      <Label>Token</Label>
                      <div className="flex space-x-2 mt-2">
                        <Button
                          variant={stakeForm.token === 'AVAX' ? 'default' : 'outline'}
                          onClick={() => setStakeForm(prev => ({ ...prev, token: 'AVAX' }))}
                          className="flex-1"
                        >
                          AVAX
                        </Button>
                        <Button
                          variant={stakeForm.token === 'USDC' ? 'default' : 'outline'}
                          onClick={() => setStakeForm(prev => ({ ...prev, token: 'USDC' }))}
                          className="flex-1"
                        >
                          USDC
                        </Button>
                      </div>
                    </div>

                    <Button 
                      onClick={handleStake}
                      className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                      size="lg"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Stake {stakeForm.token}
                    </Button>
                  </div>

                  <Card className="bg-muted/20 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Staking Benefits</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Become a verified advertiser</li>
                        <li>• Create unlimited campaigns</li>
                        <li>• Access premium features</li>
                        <li>• Build trust with influencers</li>
                        <li>• Earn staking rewards (coming soon)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdvertiserDashboard