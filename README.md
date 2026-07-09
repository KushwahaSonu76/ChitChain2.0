# ChitChain: Trustless Rotating Savings Groups on Stellar

ChitChain is a decentralized, rotating savings and credit association (ROSCA) MVP built on the Stellar network using Soroban smart contracts. It enables communities to save money collectively, transparently, and without relying on a centralized organizer.

---

## 1. Project Title & Description
### ChitChain: A Trustless Rotating Savings Group (Chit Fund)
ChitChain solves the key security issue of traditional informal savings circles (known as chit funds, pardnas, or tandas) where an organizer can disappear with the group's pooled money. 

#### Why Stellar & Soroban?
- **Fast Settlements**: Low-latency transaction confirmation keeps the monthly cadence smooth.
- **Negligible Fees**: Extremely low transaction costs make it affordable for micro-savings.
- **Trustless Escrow**: Soroban smart contracts hold and disburse funds strictly according to cryptographic rules, eliminating the risk of fraud.

#### Target Users
- Unbanked or underbanked communities relying on rotating savings for capital.
- Peer groups looking to save collectively for shared or individual goals.
- Crypto-native saving clubs looking for automated smart contract security.

---

## 2. Architecture Overview

```
Frontend (React + Vite) 
      │
      ▼
Wallet Connection (Stellar Wallets Kit / Freighter)
      │
      ▼
Soroban Smart Contract (Testnet)
 ├── create_chit() ──► Initiates escrow state
 ├── contribute()  ──► Locks monthly contribution
 └── disburse()    ──► Automates payout to recipient
      │
      ▼
Analytics & Monitoring (PostHog & Sentry)
```

### Production Stack Choices
- **React/Vite/TS**: Fast dev builds, optimized production bundles, and TypeScript safety.
- **PostHog**: Integrated to monitor wallet connects, contract calls, and onboarding completions.
- **Sentry**: Tracks frontend errors and RPC network drops in real-time.
- **Supabase**: Direct database storage for real-time user feedback.

---

## 3. Features
- **Smart Contract Escrow**: Zero-trust vault logic forces contributors to pay before anyone gets disbursed.
- **Rotation Engine**: Automatically rotates the payout recipient every round based on a fixed member list.
- **Frictionless Onboarding**: Direct tooltips for downloading Freighter and getting Testnet XLM via Friendbot.
- **Feedback Widget**: Integrated form letting users report bugs and submit reviews.
- **Mobile-Responsive**: Tailored UI utilizing Tailwind CSS CSS-Grid and Flexbox for seamless mobile use.

---

## 4. Tech Stack
- **Smart Contracts**: Rust + Soroban SDK
- **Frontend**: React + Vite + TypeScript
- **Wallet Connector**: `@creit.tech/stellar-wallets-kit`
- **Blockchain SDK**: `@stellar/stellar-sdk`
- **CSS Framework**: Tailwind CSS
- **Analytics**: PostHog
- **Error Tracking**: Sentry
- **Database (Feedback)**: Supabase

---

## 5. Deployed Contract
- **Contract ID**: `CAM2SW6NSRA2CXP34H5G6Y2EIUOYENP3NAYAD76X3ZHG72NUJO63XPAP`
- **Network**: Stellar Testnet
- **Stellar.Expert Link**: [View on Stellar.Expert](https://stellar.expert/explorer/testnet/contract/CAM2SW6NSRA2CXP34H5G6Y2EIUOYENP3NAYAD76X3ZHG72NUJO63XPAP)

---

## 6. Live Demo
- **Live Deployment**: [https://chit-chain-bice.vercel.app](https://chit-chain-bice.vercel.app)

---

## 7. Prerequisites & Setup (Local Run)

### Prerequisites
- Node.js (v18+)
- Rust & Cargo (Latest Stable)
- Target `wasm32-unknown-unknown` installed:
  ```bash
  rustup target add wasm32-unknown-unknown
  ```
- Soroban CLI installed:
  ```bash
  cargo install --locked soroban-cli
  ```

### Local Setup Instructions
1. **Clone & Install**:
   ```bash
   git clone https://github.com/yourusername/ChitChain.git
   cd ChitChain/frontend
   npm install
   ```
2. **Build Smart Contract**:
   ```bash
   cd ../contracts/chitchain
   cargo build --target wasm32-unknown-unknown --release
   ```
3. **Configure Environment**:
   Create a `.env` file in the `/frontend` directory:
   ```env
   VITE_CONTRACT_ID="CAM2SW6NSRA2CXP34H5G6Y2EIUOYENP3NAYAD76X3ZHG72NUJO63XPAP"
   VITE_POSTHOG_KEY="phc_examplekey123"
   VITE_SENTRY_DSN="https://examplesentry@o123.ingest.sentry.io/12345"
   ```
4. **Run Dev Server**:
   ```bash
   cd ../frontend
   npm run dev
   ```

---

## 8. User Onboarding & Proof of Real Usage

Non-crypto users are welcomed with tooltips guiding them to install **Freighter** and request free Testnet XLM via Friendbot. 

### Proof of 10+ Real User Wallet Interactions (Stellar Testnet)

| Wallet Address | Transaction Hash | Action |
| :--- | :--- | :--- |
| `GDPHORC6UKASNY7WMIW23IOUA2LY5SNENO367O4R6WV7Q7GNJW3WWI27` | [274631002721...](https://stellar.expert/explorer/testnet/tx/274631002721f8fa7b7b9e89c3200d7ce00ac2170288e51486b9a8fb68982f51) | Created Chit Group |
| `GBH45ZRZUNV5RIMDF4IQLSJWFIFEX5KPRJSYEPV5QZCPE6XP77BCSPWD` | [f63926dfe2b2...](https://stellar.expert/explorer/testnet/tx/f63926dfe2b298bcaeb36a03fc9122f3118d7129d7a04d4673be13454e245cb7) | Contributed Round 1 |
| `GASTVZNEON3OSJ5R5YOELNWY7O622OYZ74XWOEQJOUAFPFPDBWEM45US` | [d66cdd3c24bd...](https://stellar.expert/explorer/testnet/tx/d66cdd3c24bdeabcab5b966d29861f389f8b464188f5f3ee482fb6cecd8ba50f) | Contributed Round 1 |
| `GASTVZNEON3OSJ5R5YOELNWY7O622OYZ74XWOEQJOUAFPFPDBWEM45US` | [e1940c9f321a...](https://stellar.expert/explorer/testnet/tx/e1940c9f321a60b02dc2e0e08f43beb535973166a4d7bb1a38cb9d8217458192) | Contributed Round 2 |
| `GBAJGNCG4MVPDMJBG6YVEKAW7EFUEO3NYBCSWYD7RB7IY32LI2GXFIWV` | [a38cde30c357...](https://stellar.expert/explorer/testnet/tx/a38cde30c35741ced9f27c394dd1c223f1fe00e7385367211d2046a611714261) | Contributed Round 2 |
| `GDPHORC6UKASNY7WMIW23IOUA2LY5SNENO367O4R6WV7Q7GNJW3WWI27` | [cb48e81bbeb4...](https://stellar.expert/explorer/testnet/tx/cb48e81bbeb41c867d1a2291df032ad4bfb2b7acbf82b6dad82a41401a1fcc4b) | Contributed Round 2 |
| `GDPXTW53CBUNOFQ5LJ67KKIOMRKKX26JWI53NUJNP2NRPDATMVUGD6AK` | [543ca271586e...](https://stellar.expert/explorer/testnet/tx/543ca271586e788ecd59e76da65a8e4e1869a83299b1df25359f0fb10e4fa745) | Contributed Round 1 |
| `GBUTBHM2PAGZ2HA6HJIGP7PTRG63IQY5BTZENCBS5NIEQ7KCLMH5DOG6` | [05d38ec99282...](https://stellar.expert/explorer/testnet/tx/05d38ec992823b5b1fba306d7ab3472f2281d15fc877a5dfe5d14fe0f44e30e7) | Contributed Round 1 |
| `GAH6NCFLQNLDSAKPDKKZ4H4XDHYQUGMHFZFMVIKYG4J2CLQNQGFJDOS4` | [cecadfca2c85...](https://stellar.expert/explorer/testnet/tx/cecadfca2c85612435bdbd646ac5c5964d0b324ac902b4055ec2fdd33935ff8c) | Disbursed Round 1 |
| `GCGITHGSCUZU2W2YQ7QPSRTKYZOXKAQSG32KKMPN6L2SYBYL4YAI3LWX` | [642a692aead3...](https://stellar.expert/explorer/testnet/tx/642a692aead3a632a0fc3c4e140864408a938731a98b8a4f452b3bdbf42a2265) | Disbursed Round 2 |

*Users were sourced directly from the RiseIn community, WhatsApp group chats, and Stellar Discord channels.*

---

## 9. Feedback Summary
We collected 10 real user responses via Google Forms and the in-app feedback widget:
- **Public Feedback Database**: [View Google Sheets Responses](https://docs.google.com/spreadsheets/d/1lIg8DFYpQiNb5WP8YTOt5YBkWczLjQd_VwGov1p-ceE/edit?usp=sharing)
- **Onboarding Experience**: 8/10 users reported that the Freighter setup and Friendbot links made starting extremely straightforward.
- **UI Flow**: 3 users suggested a pending members view so they could see who has joined before starting a round.
- **Takeaways**: We will prioritize creating an interface for group invitations where creators can track pending invites in future updates.

---

## 10. Analytics & Monitoring
- **PostHog Metrics**: Real event tracking set up for wallet connects, chit fund creations, and disburse actions.
- **Sentry Alerts**: Configured to capture transaction rejection reasons and network RPC timeouts.

---

## 11. Performance Notes
- **Vite Code Splitting**: Lazy loading page components reduces initial bundle load size.
- **State Optimizations**: Component states utilize `useMemo` for heavy lists of transactions to avoid re-renders.

---

## 12. Screenshots
### Product UI (Desktop)
![product-ui](./image.png)
### Mobile Responsive Design
![mobile](./image-1.png)
### Analytics/Monitoring Dashboard
![analytics](./image-2.png)

---

## 13. Demo Video
- **Video Walkthrough**: [Watch the Demo Video](https://youtu.be/PIwo9TdFXRE)

---

## 14. Commit History Note
The repository contains 15+ meaningful atomic commits, tracking initial Soroban contracts, frontend assembly, wallet polyfill integration, styling fixes, and analytics telemetry configuration.

---

## 15. Folder Structure
```
ChitChain/
├── contracts/
│   └── chitchain/
│       ├── Cargo.toml
│       └── src/
│           ├── lib.rs
│           └── test.rs
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   │   ├── contract/
│   │   │   └── wallet/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── package.json
└── README.md
```

---

## 16. Roadmap / What's Next
- **Mainnet Launch**: Deploy to Stellar Mainnet using real USDC/XLM assets.
- **Anchor Integrations**: Direct fiat-to-token on-ramping inside the landing page for users without crypto.
- **Multi-Group Dashboard**: Enable users to participate in multiple savings circles simultaneously.

---

## 17. Known Limitations
- Runs on Testnet only.
- Relies on manual Freighter interactions for signing.
- Does not support late entry once a round starts.
