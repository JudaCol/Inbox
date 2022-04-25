// const assert = require('assert');
const ganache = require('ganache-cli');
// constructor of Web3
const Web3 = require('web3');
// new instance and to connect it to ganache Web3
const web3 = new Web3(ganache.provider());
// abi interface and bytecode of the contract
const {abi, bytecode} = require('../compile');

// set global variables
let accounts;
let inbox;

// asynchronous process to deploy the contract
beforeEach(async () =>  {
    // get list of all accounts on Ganache
    accounts = await web3.eth.getAccounts()

    // use account to deploy contract
    inbox = await new web3.eth.Contract((abi))
        .deploy({ data: bytecode, arguments: ['Hi there!']})
        .send({ from: accounts[0], gas: '1000000'});

});

// prof of deploy contract
describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox)
    });
});
