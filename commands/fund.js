// /commands/fund.js
const chalk = require('chalk');
const { kit } = require('../lib/kit');

function fundCommand(program) {
  program
    .command('fund')
    .description('Send the native gas token (XTZ) to an address.')
    .option('-t, --to <address>', 'The recipient address.')
    .option('-a, --amount <amount>', 'The amount of XTZ to send.')
    .action(async (options) => {
      if (!options.to || !options.amount) {
        return console.error(chalk.red('Error: Both --to and --amount are required.'));
      }
      console.log(chalk.yellow(`Sending ${options.amount} XTZ to ${options.to}...`));
      try {
        const value = BigInt(Math.floor(Number(options.amount) * 1e18));
        // Use the wallet client directly for native XTZ transfer
        const walletClient = kit.account._getWalletClient();
        const txHash = await walletClient.sendTransaction({
          to: options.to,
          value,
        });
        console.log(chalk.green('Transaction successful!'));
        console.log(chalk.blue('Transaction Hash:'), txHash);
      } catch (error) {
        console.error(chalk.red('Error sending XTZ:'), error.message || error);
      }
    });
}

module.exports = { fundCommand };