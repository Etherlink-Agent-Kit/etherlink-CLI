// /commands/call.js
const chalk = require('chalk');
const { kit } = require('../lib/kit');

function callCommand(program) {
  program
    .command('call')
    .description('Execute a state-changing function on any smart contract.')
    .argument('<contractAddress>', 'The address of the smart contract.')
    .argument('<functionName>', 'The name of the function to call.')
    .option('-p, --params <params...>', 'Comma-separated list of parameters for the function.')
    .option('-a, --abi <abiPath>', 'Path to the contract\'s ABI JSON file. (Optional)')
    .action(async (contractAddress, functionName, options) => {
      
      let args = [];
      if (options.params) {
        args = options.params.split(',').map(param => {
          const p = param.trim();
          if (!isNaN(p) && !p.startsWith('0x')) {
            return Number(p);
          }
          return p;
        });
      }

      console.log(chalk.yellow(`Executing function '${functionName}' on contract ${contractAddress}...`));
      console.log(chalk.blue('With parameters:'), args);

      try {
        const receipt = await kit.executeContract({
          contractAddress,
          functionName,
          args,
        });

        console.log(chalk.green('\nTransaction successful!'));
        console.log(chalk.blue('Transaction Hash:'), receipt.transactionHash);

      } catch (error) {
        console.error(chalk.red('\nError executing contract function:'));
        console.error(error);
      }
    });
}

module.exports = { callCommand };