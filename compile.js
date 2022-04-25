const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

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

// compiled contract
let output = JSON.parse(solc.compile(JSON.stringify(input)));
// contract info
let outputContracts = output.contracts['Inbox.sol']['Inbox']

// exports ABI interface
console.log(module.exports.abi = outputContracts.abi);

// exports bytecode from smart contract
console.log(module.exports.bytecode = outputContracts.evm.bytecode.object);
