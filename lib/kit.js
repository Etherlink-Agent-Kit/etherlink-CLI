// /lib/kit.js
const { EtherlinkKit } = require('etherlink-agent-kit'); // Corrected import
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  console.error('Error: PRIVATE_KEY not found in .env file.');
  process.exit(1);
}

// Corrected to use EtherlinkKit as you specified
const kit = new EtherlinkKit({
    privateKey: privateKey,
    rpcUrl: 'https://node.ghostnet.etherlink.com'
});

module.exports = { kit };