const path = require('path'); // library that allows handle the right paths of our contracts.
const fs = require('fs');  // Library filesystem that allows read files from our system.
const solc = require('solc');  // Solidity compiler

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');  // Path of our Inbox.sol contract
const source = fs.readFileSync(inboxPath, 'utf8');  // Read the contract

// To understand all the full info about how the input variable must be written check the solidity documentation in:
// https://docs.soliditylang.org/en/latest/using-the-compiler.html
let input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ "abi", "evm.bytecode" ]
            }
        }
    }
};

// compiled contract variable
let output = JSON.parse(solc.compile(JSON.stringify(input)));
// contract info
let outputContracts = output.contracts['Inbox.sol']['Inbox']

// exports ABI interface
console.log(module.exports.abi = outputContracts.abi);

// exports bytecode from smart contract
console.log(module.exports.bytecode = outputContracts.evm.bytecode.object);
