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
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Advertiser Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your campaigns and track performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0000 AVAX'}
              </div>
              <p className="text-xs text-muted-foreground">Available for staking</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staked Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{advertiserData.stakedBalance} AVAX</div>
              <p className="text-xs text-muted-foreground">Currently staked</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{advertiserData.totalCampaigns}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{advertiserData.activeCampaigns}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
            <TabsTrigger value="create">Create Campaign</TabsTrigger>
            <TabsTrigger value="stake">Stake Tokens</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Management</CardTitle>
                <CardDescription>
                  Monitor your active campaigns and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="bg-gradient-card border-border/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-semibold">{campaign.title}</h3>
                              <Badge className={getStatusColor(campaign.status)}>
                                {getStatusIcon(campaign.status)}
                                <span className="ml-1">{campaign.status}</span>
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span>Views: {campaign.viewsRequired.toLocaleString()}</span>
                              <span>Payout: {campaign.payout}</span>
                              <span>Duration: {campaign.duration}</span>
                              {campaign.acceptedBy && (
                                <span>Influencer: {campaign.acceptedBy}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {campaign.status === 'Disputed' && (
                              <Button variant="destructive" size="sm">
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