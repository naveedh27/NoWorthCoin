const WALLETPROVIDER = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const path = require('path');
const fs = require('fs-extra');
const compiledFactory = require('./build/NoWorthCoin.json');


const provider = new WALLETPROVIDER(
  'soldier ice act culture uniform stereo census worth creek try grief mass',
  'https://rinkeby.infura.io/v3/5a2e60a731254049a9ab4ef748a7eba3'
);

// const provider = new WALLETPROVIDER(
//   'soldier ice act culture uniform stereo census worth creek try grief mass',
//   'http://localhost:8545'
// );

const web3 = new Web3(provider);



let accounts , inbox;
const deploy = async ()=>{
try{
  accounts = await web3.eth.getAccounts();
}catch(e){
  console.log("Error");
}


 console.log('Address from which contract will be deployed : '+accounts[0]);

 const inbox = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: '0x'+compiledFactory.bytecode})
    .send({from : accounts[0],gas: '3000000' })
    .catch(error => console.log(error));

  console.log('Contract Address '+inbox.options.address);
  inbox.setProvider(provider);

  fs.outputJsonSync(
    path.resolve(__dirname,'../src/Util/ADDRESS.json'),
    inbox.options.address
  );

}


deploy();

