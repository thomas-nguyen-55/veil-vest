# 🛡️ Veil Vest

> **Privacy-First Asset Management Platform**  
> *Where Confidentiality Meets Blockchain Innovation*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 🌟 What Makes Veil Vest Special?

Veil Vest revolutionizes asset management by combining **Fully Homomorphic Encryption (FHE)** with blockchain technology. Unlike traditional platforms, we ensure your financial data remains private while maintaining complete transparency and security.

### 🔐 Core Innovation
- **Zero-Knowledge Vesting**: Your vesting schedules are encrypted but verifiable
- **Privacy-Preserving Analytics**: Get insights without exposing sensitive data
- **FHE-Powered Smart Contracts**: Revolutionary encryption on-chain
- **Multi-Wallet Ecosystem**: Seamless integration with your preferred wallet

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia testnet ETH for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/thomas-nguyen-55/veil-vest.git
cd veil-vest

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env.local` file:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Optional: Alternative RPC
VITE_ALTERNATIVE_RPC_URL=https://1rpc.io/sepolia
```

---

## 🏗️ Architecture

### Frontend Stack
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React 18      │    │   TypeScript    │    │   Tailwind CSS  │
│   (Modern Hooks)│    │   (Type Safety) │    │   (Styling)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Vite Build    │
                    │   (Fast HMR)    │
                    └─────────────────┘
```

### Blockchain Integration
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   RainbowKit    │    │     Wagmi       │    │      Viem       │
│   (Wallet UI)   │    │   (React Hooks) │    │   (TypeScript)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Sepolia FHE   │
                    │   (Zama Network)│
                    └─────────────────┘
```

---

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

### Project Structure

```
veil-vest/
├── 📁 contracts/           # Smart contracts
│   └── VeilVest.sol       # FHE-enabled vesting contract
├── 📁 src/
│   ├── 📁 components/      # React components
│   │   ├── 📁 ui/         # Reusable UI components
│   │   ├── WalletConnect.tsx
│   │   └── ClaimTokens.tsx
│   ├── 📁 hooks/          # Custom React hooks
│   │   └── useVeilVest.ts # Contract interaction
│   ├── 📁 lib/            # Utilities & config
│   │   ├── config.ts      # App configuration
│   │   ├── contracts.ts   # Contract addresses & ABIs
│   │   └── wagmi.ts       # Wagmi setup
│   └── 📁 pages/          # Application pages
├── 📄 README.md           # This file
└── 📄 DEPLOYMENT.md       # Deployment guide
```

---

## 🔒 Security Features

### Privacy Protection
- ✅ **FHE Encryption**: All sensitive data encrypted on-chain
- ✅ **Zero-Knowledge Proofs**: Verify without revealing
- ✅ **Private Key Security**: Keys never leave your device
- ✅ **Encrypted Communications**: All data transmission secured

### Smart Contract Security
- ✅ **Audited Code**: Comprehensive security reviews
- ✅ **Access Controls**: Role-based permissions
- ✅ **Emergency Functions**: Owner controls for critical situations
- ✅ **Input Validation**: Comprehensive parameter checking

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git push origin main
   ```

2. **Deploy on Vercel**
   - Import project from GitHub
   - Configure environment variables
   - Deploy automatically

3. **Environment Variables**
   ```env
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=your_rpc_url
   VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
   ```

📖 **Detailed Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Code Standards
- **TypeScript**: Full type safety required
- **ESLint**: Follow configured linting rules
- **Testing**: Add tests for new features
- **Documentation**: Update docs for API changes

---

## 📊 Roadmap

### Phase 1: Core Platform ✅
- [x] FHE smart contract implementation
- [x] Wallet integration (RainbowKit)
- [x] Basic vesting functionality
- [x] Privacy-preserving UI

### Phase 2: Enhanced Features 🚧
- [ ] Multi-chain support (Ethereum, Polygon)
- [ ] Advanced FHE operations
- [ ] Mobile application
- [ ] Governance token integration

### Phase 3: Ecosystem 🎯
- [ ] DeFi protocol integrations
- [ ] Advanced analytics dashboard
- [ ] API for third-party developers
- [ ] Enterprise solutions

---

## 🆘 Support & Community

### Getting Help
- 📖 **Documentation**: Check our comprehensive docs
- 🐛 **Issues**: Report bugs on GitHub Issues
- 💬 **Discussions**: Join community discussions
- 📧 **Contact**: Reach out via GitHub

### Community Links
- 🌐 **Website**: [Coming Soon]
- 🐦 **Twitter**: [@veilvest]
- 💬 **Discord**: [Join Community]
- 📺 **YouTube**: [Tutorials & Updates]

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Zama Network** for FHE technology
- **RainbowKit** for wallet integration
- **shadcn/ui** for beautiful components
- **Vite** for lightning-fast builds
- **Open Source Community** for inspiration

---

<div align="center">

**Built with ❤️ for Privacy & Innovation**

[⭐ Star this repo](https://github.com/thomas-nguyen-55/veil-vest) | [🐛 Report Bug](https://github.com/thomas-nguyen-55/veil-vest/issues) | [💡 Request Feature](https://github.com/thomas-nguyen-55/veil-vest/issues)

</div>