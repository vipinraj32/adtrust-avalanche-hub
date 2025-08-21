# AvaxTrust

AvaxTrust is a decentralized influencer–advertiser platform built on the Avalanche blockchain.  
It enables trust, transparency, and automated payments between advertisers and influencers by using smart contracts, staking, and decentralized storage.  

---

## Overview

The influencer marketing industry often faces challenges such as lack of trust, delayed payments, and unverifiable campaign outcomes. AvaxTrust solves these challenges by ensuring:

- Advertisers stake funds on-chain before launching campaigns.  
- Influencers can only participate in campaigns if they meet eligibility requirements.  
- Payments are automatically released upon successful campaign completion.  
- All interactions are recorded transparently on the blockchain.  

---

## Features

### Advertiser Workflow
- Advertiser registers by staking a minimum amount of funds on Avalanche (e.g., 250 AVAX).  
- Can publish campaigns by submitting details such as:  
  - Company Name  
  - Advertiser Name  
  - Email  
  - Campaign Requirements  
  - Budget  

### Influencer Workflow
- Influencer logs in with wallet.  
- Can upload profile details, audience insights, or documents (stored on IPFS).  
- Can browse and apply for campaigns published by advertisers.  
- Smart contract + validation layer checks eligibility (based on followers, niche, or engagement).  
- Upon successful campaign completion, funds are automatically released from advertiser stake to influencer.  

### Smart Contract Logic
- **User Identity Manager**: Manages advertiser and influencer identities.  
- **Ad Registry**: Stores ad campaign details and metadata.  
- **Stake Manager**: Locks advertiser funds at registration and handles automated fund release.  
- **Audit Trail**: Maintains a transparent on-chain history of all campaigns, applications, and transactions.  

---

## Architecture

1. **Frontend (React + TypeScript + TailwindCSS)**  
   - User interface for advertisers and influencers.  
   - Wallet connection and campaign management.  

2. **Backend (Spring Boot)**  
   - Handles OAuth2 login with Meta/Facebook/Instagram.  
   - Provides APIs for campaign and user management.  

3. **Smart Contracts (Solidity)**  
   - Deployed on Avalanche Fuji Testnet / C-Chain.  
   - Stores advertiser registrations, campaigns, and manages staking logic.  

4. **Storage (IPFS)**  
   - Stores influencer documents, profile metadata, and campaign content.  

---

## Technology Stack

- **Blockchain**: Avalanche C-Chain (EVM Compatible)  
- **Smart Contracts**: Solidity (Remix, Hardhat)  
- **Frontend**: React, TypeScript, TailwindCSS, Vite, shadcn/ui  
- **Backend**: Spring Boot (OAuth2, REST APIs)  
- **Storage**: IPFS  
- **Authentication**: Wallets (MetaMask/Core Wallet) + Meta/Facebook OAuth2  

---

## Installation and Setup

### Prerequisites
- Node.js v18 or later  
- Java 17 or later (for backend)  
- Avalanche Core Wallet / MetaMask with Fuji Testnet configured  
- Hardhat or Remix for contract deployment  

### Clone Repository
```bash
git clone https://github.com/your-username/avaxtrust.git
cd avaxtrust

