const chalk = require('chalk');
const { kit } = require('../lib/kit');

function tokenCommand(program) {
  const token = program.command('token').description('Manage ERC-20 tokens.');

  token
    .command('balance')
    .description('Check the balance of an ERC-20 token for an address.')
    .requiredOption('-t, --token <address>', 'Token contract address')
    .option('-o, --owner <address>', 'Owner address (defaults to current wallet)')
    .action(async (options) => {
      const owner = options.owner || kit.account.getAddress();
      const balance = await kit.token.getBalance({ tokenAddress: options.token, ownerAddress: owner });
      console.log(chalk.green('Token Balance:'), balance.toString());
    });

  token
    .command('transfer')
    .description('Transfer ERC-20 tokens to another address.')
    .requiredOption('-t, --token <address>', 'Token contract address')
    .requiredOption('--to <address>', 'Recipient address')
    .requiredOption('-a, --amount <amount>', 'Amount to transfer (in token decimals)')
    .action(async (options) => {
      const amount = options.amount;
      const receipt = await kit.token.transfer({ tokenAddress: options.token, to: options.to, amount });
      console.log(chalk.green('Transfer successful!'));
      console.log(chalk.blue('Transaction Hash:'), receipt);
    });

  token
    .command('mint')
    .description('Mint new ERC-20 tokens (if permitted).')
    .requiredOption('-t, --token <address>', 'Token contract address')
    .requiredOption('--to <address>', 'Recipient address')
    .requiredOption('-a, --amount <amount>', 'Amount to mint (in token decimals)')
    .action(async (options) => {
      const receipt = await kit.token.mint({ tokenAddress: options.token, to: options.to, amount: options.amount });
      console.log(chalk.green('Mint successful!'));
      console.log(chalk.blue('Transaction Hash:'), receipt);
    });

  token
    .command('burn')
    .description('Burn ERC-20 tokens (if permitted).')
    .requiredOption('-t, --token <address>', 'Token contract address')
    .requiredOption('-a, --amount <amount>', 'Amount to burn (in token decimals)')
    .action(async (options) => {
      const receipt = await kit.token.burn({ tokenAddress: options.token, amount: options.amount });
      console.log(chalk.green('Burn successful!'));
      console.log(chalk.blue('Transaction Hash:'), receipt);
    });
}

module.exports = { tokenCommand };