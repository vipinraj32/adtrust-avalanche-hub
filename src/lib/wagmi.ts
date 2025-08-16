import { http, createConfig } from 'wagmi'
import { avalancheFuji } from 'wagmi/chains'
import { metaMask, coinbaseWallet, injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [avalancheFuji],
  connectors: [
    metaMask(),
    coinbaseWallet({ appName: 'AdTrust' }),
    injected(),
  ],
  transports: {
    [avalancheFuji.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}