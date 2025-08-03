const chalk = require('chalk');
const { EtherlinkKit } = require('etherlink-agent-kit');
require('dotenv').config();
const fetch = require('node-fetch');

const ERC721_ABI = [
  {
    "constant": true,
    "inputs": [ { "name": "tokenId", "type": "uint256" } ],
    "name": "tokenURI",
    "outputs": [ { "name": "", "type": "string" } ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

// Use mainnet for NFT operations only
const mainnetKit = new EtherlinkKit({
  privateKey: process.env.PRIVATE_KEY,
  rpcUrl: 'https://node.mainnet.etherlink.com',
  network: 'mainnet'
});

function nftCommand(program) {
  const nft = program.command('nft').description('Manage ERC-721 NFTs.');

  nft
    .command('mint')
    .description('Mint a new NFT to an address.')
    .requiredOption('-c, --collection <address>', 'NFT collection contract address')
    .requiredOption('--to <address>', 'Recipient address')
    .requiredOption('--uri <uri>', 'Metadata URI')
    .action(async (options) => {
      const receipt = await mainnetKit.nft.mint({ collectionAddress: options.collection, to: options.to, metadataUri: options.uri });
      console.log(chalk.green('NFT Minted!'));
      console.log(chalk.blue('Transaction Hash:'), receipt);
    });

  nft
    .command('transfer')
    .description('Transfer an NFT to another address.')
    .requiredOption('-c, --collection <address>', 'NFT collection contract address')
    .requiredOption('--to <address>', 'Recipient address')
    .requiredOption('--id <id>', 'Token ID')
    .action(async (options) => {
      const receipt = await mainnetKit.nft.transfer({ collectionAddress: options.collection, to: options.to, tokenId: options.id });
      console.log(chalk.green('NFT Transferred!'));
      console.log(chalk.blue('Transaction Hash:'), receipt);
    });

  nft
    .command('burn')
    .description('Burn an NFT.')
    .requiredOption('-c, --collection <address>', 'NFT collection contract address')
    .requiredOption('--id <id>', 'Token ID')
    .action(async (options) => {
      const receipt = await mainnetKit.nft.burn({ collectionAddress: options.collection, tokenId: options.id });
      console.log(chalk.green('NFT Burned!'));
      console.log(chalk.blue('Transaction Hash:'), receipt);
    });

  nft
    .command('owner')
    .description('Get the owner of an NFT.')
    .requiredOption('-c, --collection <address>', 'NFT collection contract address')
    .requiredOption('--id <id>', 'Token ID')
    .action(async (options) => {
      try {
        const owner = await mainnetKit.nft.getOwner({ collectionAddress: options.collection, tokenId: options.id });
        console.log(chalk.green('NFT Owner:'), owner);
      } catch (error) {
        if (error.message && error.message.includes('returned no data')) {
          console.error(chalk.red('Token does not exist, or contract is not a valid ERC-721, or the address/network is wrong.'));
        } else {
          console.error(chalk.red('Error:'), error.message || error);
        }
      }
    });

  nft
    .command('metadata')
    .description('Fetch and display NFT metadata (name, description, image) for a tokenId.')
    .requiredOption('-c, --collection <address>', 'NFT collection contract address')
    .requiredOption('--id <id>', 'Token ID')
    .action(async (options) => {
      try {
        // 1. Get tokenURI from contract
        const tokenURI = await mainnetKit.chain.readContract({
          address: options.collection,
          abi: ERC721_ABI,
          functionName: 'tokenURI',
          args: [options.id],
        });
        if (!tokenURI) {
          console.error(chalk.red('No tokenURI found for this token.'));
          return;
        }
        // 2. Handle IPFS URIs
        let uri = tokenURI;
        if (uri.startsWith('ipfs://')) {
          uri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
        }
        // 3. Fetch metadata JSON (dynamic import for node-fetch v3)
        const fetch = (await import('node-fetch')).default;
        const res = await fetch(uri);
        if (!res.ok) {
          console.error(chalk.red('Failed to fetch metadata from URI:'), uri);
          return;
        }
        const metadata = await res.json();
        // 4. Print metadata fields
        console.log(chalk.green('NFT Metadata:'));
        console.log('Name:', metadata.name || '-');
        console.log('Description:', metadata.description || '-');
        console.log('Image:', metadata.image || '-');
      } catch (error) {
        if (error.message && error.message.includes('returned no data')) {
          console.error(chalk.red('Token does not exist, or contract is not a valid ERC-721, or the address/network is wrong.'));
        } else {
          console.error(chalk.red('Error:'), error.message || error);
        }
      }
    });
}

module.exports = { nftCommand };