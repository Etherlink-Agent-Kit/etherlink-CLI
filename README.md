# Etherlink CLI (elink-cli)

A Swiss Army knife CLI for Etherlink developers - manage wallets, tokens, NFTs, and more on the Etherlink blockchain.

## 🚀 Features

- **Wallet Management**: Create and manage wallets on Etherlink
- **Token Operations**: Transfer tokens and check balances
- **NFT Support**: Mint and manage NFTs
- **Funding**: Fund wallets with testnet tokens
- **Contract Interaction**: Call smart contracts directly

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Install globally
```bash
npm install -g .
```

Or install from the current directory:
```bash
npm install -g ./elink-cli
```

## 🛠️ Usage

### Basic Commands

```bash
# Show welcome message and help
elink start

# Show all available commands
elink --help
```

### Wallet Commands

```bash
# Create a new wallet
elink wallet create

# List existing wallets
elink wallet list

# Get wallet balance
elink wallet balance <address>
```

### Token Commands

```bash
# Transfer tokens
elink token transfer <from> <to> <amount>

# Check token balance
elink token balance <address> <token-address>
```

### NFT Commands

```bash
# Mint an NFT
elink nft mint <to> <token-uri>

# Get NFT metadata
elink nft metadata <token-id>
```

### Funding Commands

```bash
# Fund a wallet with testnet tokens
elink fund <address> <amount>
```

### Contract Interaction

```bash
# Call a smart contract
elink call <contract-address> <function> [parameters...]
```

## 🔧 Configuration

The CLI uses environment variables for configuration. Create a `.env` file in your project root:

```env
# Etherlink RPC URL (default: https://node.ghostnet.tezos.marigold.dev)
ETHERLINK_RPC_URL=https://your-rpc-url.com

# Your private key (optional, for signing transactions)
PRIVATE_KEY=your-private-key-here
```

## 📁 Project Structure

```
elink-cli/
├── commands/          # Command implementations
│   ├── wallet.js     # Wallet management commands
│   ├── token.js      # Token operations
│   ├── nft.js        # NFT operations
│   ├── fund.js       # Funding commands
│   └── call.js       # Contract interaction
├── lib/              # Utility libraries
│   └── kit.js        # EtherlinkKit integration
├── index.js          # Main CLI entry point
└── package.json      # Project configuration
```

## 🧪 Development

### Setup Development Environment

```bash
# Clone the repository
git clone <repository-url>
cd elink-cli

# Install dependencies
npm install

# Link the CLI for development
npm link
```

### Running Tests

```bash
npm test
```

## 📚 Dependencies

- **commander**: CLI framework
- **chalk**: Terminal styling
- **ethers**: Ethereum/Tezos library
- **etherlink-agent-kit**: Etherlink blockchain integration
- **dotenv**: Environment variable management
- **node-fetch**: HTTP requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/elink-cli/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🔗 Related Projects

- [EtherlinkKit](https://github.com/yourusername/etherlink-kit) - Core blockchain integration library
- [Etherlink Documentation](https://docs.etherlink.com) - Official Etherlink documentation

---

**Note**: This CLI is designed for development and testing purposes. For production use, ensure proper security measures and key management. 