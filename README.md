# Veil Vest - Privacy-First Asset Management

## Overview

Veil Vest is a cutting-edge decentralized application that leverages Fully Homomorphic Encryption (FHE) to provide privacy-preserving asset management and vesting solutions. Built on the Zama network with Sepolia testnet support, it ensures complete privacy while maintaining transparency and security.

## Features

- **Privacy-First Design**: All sensitive data is encrypted using FHE technology
- **Multi-Wallet Support**: Compatible with Rainbow, MetaMask, and other popular wallets
- **Secure Vesting**: Encrypted vesting schedules and asset management
- **Real-time Analytics**: Privacy-preserving analytics and reporting
- **Decentralized Governance**: Community-driven decision making

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Zama FHE, Sepolia Testnet
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **State Management**: TanStack Query
- **Encryption**: Fully Homomorphic Encryption (FHE)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia testnet ETH for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/thomas-nguyen-55/veil-vest.git

# Navigate to the project directory
cd veil-vest

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## Smart Contract

The project includes a comprehensive FHE-enabled smart contract that handles:

- Encrypted asset vesting schedules
- Privacy-preserving balance queries
- Secure fund management
- Decentralized governance voting

### Contract Features

- **FHE Encryption**: All sensitive data is encrypted on-chain
- **Vesting Management**: Flexible vesting schedules with privacy
- **Access Control**: Role-based permissions with encrypted verification
- **Audit Trail**: Privacy-preserving transaction logging

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Application pages
├── styles/             # Global styles and themes
└── types/              # TypeScript type definitions
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred hosting service
# The build files will be in the 'dist' directory
```

## Security

- All sensitive operations use FHE encryption
- Smart contracts are audited and tested
- Private keys never leave the user's device
- All transactions are verifiable but privacy-preserving

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Join our community Discord
- Follow us on Twitter

## Roadmap

- [ ] Multi-chain support
- [ ] Advanced FHE features
- [ ] Mobile app development
- [ ] Integration with more DeFi protocols
- [ ] Enhanced privacy analytics