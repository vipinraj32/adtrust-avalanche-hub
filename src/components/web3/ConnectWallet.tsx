import { useState } from 'react'
import { useConnect, useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'
import { Wallet, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export const ConnectWallet = () => {
  const { connectors, connect, isPending } = useConnect()
  const { isConnected } = useAccount()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleConnect = (connector: any) => {
    connect({ connector }, {
      onSuccess: () => {
        setOpen(false)
        toast({
          title: "Wallet Connected",
          description: "Successfully connected to your wallet.",
        })
      },
      onError: (error) => {
        toast({
          title: "Connection Failed",
          description: error.message,
          variant: "destructive",
        })
      }
    })
  }

  if (isConnected) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to AdTrust
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {connectors.map((connector) => (
            <Card
              key={connector.uid}
              className="p-4 hover:bg-muted/50 cursor-pointer transition-colors border-border/50 hover:border-primary/50"
              onClick={() => handleConnect(connector)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">{connector.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {connector.name === 'MetaMask' && 'Connect using MetaMask wallet'}
                      {connector.name === 'Coinbase Wallet' && 'Connect using Coinbase wallet'}
                      {connector.name === 'Injected' && 'Connect using browser wallet'}
                    </div>
                  </div>
                </div>
                {isPending && (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}