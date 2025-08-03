// /commands/wallet.js
const chalk = require('chalk');
const { kit } = require('../lib/kit');

function walletCommands(program) {
  const wallet = program.command('wallet').description('Manage your Etherlink wallet.');

  wallet
    .command('new')
    .description('Generates a new, random Etherlink wallet.')
    .action(() => {
      const newWallet = kit.account.create();
      console.log(chalk.green('New Wallet Created!'));
      console.log(chalk.yellow('Address:'), newWallet.address);
      console.log(chalk.red('Private Key:'), newWallet.privateKey);
      console.log(chalk.bold.red('\nSAVE THIS PRIVATE KEY! It cannot be recovered.'));
    });

  wallet
    .command('address')
    .description("Displays the address of the wallet configured in your .env file.")
    .action(() => {
      const address = kit.account.getAddress();
      console.log(chalk.blue('Configured Wallet Address:'), address);
    });
  
  wallet
    .command('balance')
    .description("Fetches the native XTZ balance of the configured wallet.")
    .action(async () => {
      console.log(chalk.yellow('Fetching balance...'));
      const balance = await kit.account.getBalance();
      // Convert from wei (BigInt) to XTZ (number)
      const xtz = Number(balance) / 1e18;
      console.log(chalk.green('Balance:'), `${xtz.toFixed(5)} XTZ`);
    });
}

module.exports = { walletCommands };