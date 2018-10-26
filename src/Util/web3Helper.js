import web3 from './web3'
var contractInterface = require('./AppInterface.json')
var address = require('./ADDRESS.json')

const instance = new web3.eth.Contract(
    JSON.parse(contractInterface),
    address
  );


export default instance; 