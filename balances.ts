const Web3 = require('web3');
const ERC20ABI = require('./erc-20-abi').default;

// sign up and get an infura projectId from https://infura.io
const INFURA_PROJECT_ID = 'YOUR_INFURA_PROJECT_ID';
const KOVAN_INFURA_URL = 'https://kovan.infura.io/v3';
const WALLET_ADDRESS = 'YOUR_WALLET_ADDRESS';
const DAI_TOKEN_ADDRESS = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa';

class Wallet {
    provider = new Web3.providers.HttpProvider(`${KOVAN_INFURA_URL}/${INFURA_PROJECT_ID}`);

    web3 = new Web3(this.provider);

    getNativeTokenBalance = async () => {
        const balance = await this.web3.eth.getBalance(WALLET_ADDRESS);

        console.log(`ETH balance - ${this.web3.utils.fromWei(balance)}`);
    };

    getDaiTokenBalance = async () => {
        const tokenContract = new this.web3.eth.Contract(ERC20ABI, DAI_TOKEN_ADDRESS);
        const balance = await tokenContract.methods.balanceOf(WALLET_ADDRESS).call();
        const tokenSymbol = await tokenContract.methods.symbol().call();

        console.log(`${tokenSymbol} balance - ${this.web3.utils.fromWei(balance)}`);
    }
}
  
const wallet = new Wallet();

wallet.getNativeTokenBalance();
wallet.getDaiTokenBalance();
