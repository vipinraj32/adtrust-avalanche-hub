import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { 
  AlertTriangle, 
  Eye, 
  DollarSign, 
  Clock, 
  CheckCircle,
  XCircle,
  Scale,
  FileText,
  ExternalLink,
  User,
  Calendar
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const DisputePage = () => {
  const { address, isConnected } = useAccount()
  const { toast } = useToast()
  
  const [disputeReason, setDisputeReason] = useState('')

  // Mock dispute data
  const disputes = [
    {
      id: 1,
      campaignTitle: "Tech Product Launch",
      campaignId: "CMP-001",
      advertiser: "0x1234...5678",
      influencer: "0x8765...4321",
      status: "Under Review",
      reason: "View count discrepancy",
      submittedAt: "2024-01-20",
      evidence: {
        videoUrl: "https://youtube.com/watch?v=example1",
        claimedViews: 85000,
        actualViews: 72000,
        ipfsHash: "QmX123...abc",
        screenshots: ["proof1.jpg", "proof2.jpg"]
      },
      payout: "650 AVAX",
      requiredViews: 80000,
      description: "Influencer claims to have achieved 85k views but verification shows only 72k views. Dispute raised by advertiser."
    },
    {
      id: 2,
      campaignTitle: "Gaming Platform Promo",
      campaignId: "CMP-002", 
      advertiser: "0x2c1b...4567",
      influencer: "0x9876...1234",
      status: "Resolved - Advertiser",
      reason: "Content quality issues",
      submittedAt: "2024-01-15",
      resolvedAt: "2024-01-22",
      evidence: {
        videoUrl: "https://youtube.com/watch?v=example2",
        claimedViews: 95000,
        actualViews: 98000,
        ipfsHash: "QmY456...def",
        screenshots: ["proof3.jpg", "proof4.jpg"]
      },
      payout: "750 AVAX",
      requiredViews: 75000,
      description: "Content did not meet campaign guidelines. Resolution: Partial payment released."
    },
    {
      id: 3,
      campaignTitle: "Fashion Brand Campaign",
      campaignId: "CMP-003",
      advertiser: "0x5555...6666",
      influencer: "0x7777...8888",
      status: "Resolved - Influencer", 
      reason: "Payment delay",
      submittedAt: "2024-01-10",
      resolvedAt: "2024-01-18",
      evidence: {
        videoUrl: "https://youtube.com/watch?v=example3",
        claimedViews: 120000,
        actualViews: 125000,
        ipfsHash: "QmZ789...ghi",
        screenshots: ["proof5.jpg", "proof6.jpg"]
      },
      payout: "500 AVAX",
      requiredViews: 100000,
      description: "Campaign requirements exceeded but payment was delayed. Resolution: Full payment released with bonus."
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-warning/10 text-warning border-warning/20'
      case 'Resolved - Advertiser': return 'bg-destructive/10 text-destructive border-destructive/20'
      case 'Resolved - Influencer': return 'bg-success/10 text-success border-success/20'
      case 'Escalated': return 'bg-primary/10 text-primary border-primary/20'
      default: return 'bg-muted/10 text-muted-foreground border-muted/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Under Review': return <Clock className="h-4 w-4" />
      case 'Resolved - Advertiser': return <XCircle className="h-4 w-4" />
      case 'Resolved - Influencer': return <CheckCircle className="h-4 w-4" />
      case 'Escalated': return <AlertTriangle className="h-4 w-4" />
      default: return <Scale className="h-4 w-4" />
    }
  }

  const handleDispute = (campaignId: string) => {
    if (!disputeReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for the dispute",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Dispute Submitted",
      description: "Your dispute has been submitted for review by the AI agent.",
    })

    setTimeout(() => {
      toast({
        title: "Dispute Filed",
        description: "Dispute has been recorded on-chain and is under review.",
      })
      setDisputeReason('')
    }, 2000)
  }

  const handleResolve = (disputeId: number, resolution: 'advertiser' | 'influencer') => {
    toast({
      title: "Resolving Dispute",
      description: `Processing resolution in favor of ${resolution}...`,
    })

    setTimeout(() => {
      toast({
        title: "Dispute Resolved",
        description: `Dispute has been resolved in favor of the ${resolution}.`,
      })
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
                Connect your wallet to access dispute resolution
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
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-slate-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Dispute Resolution
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage campaign disputes and view resolution history
          </p>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Disputes</TabsTrigger>
            <TabsTrigger value="resolved">Resolved Cases</TabsTrigger>
            <TabsTrigger value="file">File Dispute</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Disputes</CardTitle>
                <CardDescription>
                  Disputes currently under review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {disputes.filter(d => d.status === 'Under Review').map((dispute) => (
                    <Card key={dispute.id} className="bg-gradient-card border-border/50">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3">
                                <h3 className="text-xl font-semibold">{dispute.campaignTitle}</h3>
                                <Badge className={getStatusColor(dispute.status)}>
                                  {getStatusIcon(dispute.status)}
                                  <span className="ml-1">{dispute.status}</span>
                                </Badge>
                              </div>
                              <p className="text-muted-foreground">{dispute.description}</p>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              <p>Campaign ID: {dispute.campaignId}</p>
                              <p>Submitted: {dispute.submittedAt}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                            <div className="space-y-2">
                              <p className="font-medium">Participants</p>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>Advertiser: {dispute.advertiser}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>Influencer: {dispute.influencer}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="font-medium">Campaign Details</p>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Eye className="h-4 w-4 text-primary" />
                                  <span>Required: {dispute.requiredViews.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <DollarSign className="h-4 w-4 text-success" />
                                  <span>{dispute.payout}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="font-medium">Evidence</p>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Eye className="h-4 w-4 text-warning" />
                                  <span>Claimed: {dispute.evidence.claimedViews.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Eye className="h-4 w-4 text-destructive" />
                                  <span>Verified: {dispute.evidence.actualViews.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col lg:flex-row gap-4 pt-4 border-t border-border">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center space-x-2">
                                <ExternalLink className="h-4 w-4 text-primary" />
                                <a href={dispute.evidence.videoUrl} target="_blank" rel="noopener noreferrer" 
                                   className="text-primary hover:underline">
                                  View Content
                                </a>
                              </div>
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  IPFS: {dispute.evidence.ipfsHash}
                                </span>
                              </div>
                            </div>
                            
                            {/* Admin/AI Agent Resolution (Mock) */}
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleResolve(dispute.id, 'advertiser')}
                                variant="outline"
                                className="border-destructive/50 hover:bg-destructive/10"
                              >
                                Resolve for Advertiser
                              </Button>
                              <Button
                                onClick={() => handleResolve(dispute.id, 'influencer')}
                                variant="outline"
                                className="border-success/50 hover:bg-success/10"
                              >
                                Resolve for Influencer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resolved" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resolved Disputes</CardTitle>
                <CardDescription>
                  Historical dispute resolutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disputes.filter(d => d.status.includes('Resolved')).map((dispute) => (
                    <Card key={dispute.id} className="bg-gradient-card border-border/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-semibold">{dispute.campaignTitle}</h3>
                              <Badge className={getStatusColor(dispute.status)}>
                                {getStatusIcon(dispute.status)}
                                <span className="ml-1">{dispute.status}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{dispute.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Submitted: {dispute.submittedAt}</span>
                              <span>Resolved: {dispute.resolvedAt}</span>
                              <span>Payout: {dispute.payout}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="file" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>File New Dispute</CardTitle>
                <CardDescription>
                  Submit a dispute for campaign resolution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="disputeReason">Dispute Reason *</Label>
                      <Textarea
                        id="disputeReason"
                        value={disputeReason}
                        onChange={(e) => setDisputeReason(e.target.value)}
                        placeholder="Explain the reason for your dispute in detail..."
                        rows={6}
                      />
                    </div>
                    
                    <Button
                      onClick={() => handleDispute('sample-campaign')}
                      className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                      size="lg"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Submit Dispute
                    </Button>
                  </div>

                  <Card className="bg-muted/20 border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center">
                        <Scale className="h-5 w-5 mr-2 text-primary" />
                        Dispute Process
                      </h3>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>Submit dispute with detailed reasoning</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>AI agent reviews evidence and campaign data</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>Resolution determined based on smart contract logic</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>Payments automatically distributed</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>Appeal process available if needed</span>
                        </li>
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

export default DisputePage