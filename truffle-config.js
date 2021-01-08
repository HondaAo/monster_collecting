const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider');
const privateKeys = process.env.PRIVATE_KEYS || ""
require('dotenv').config();
module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  },
  ropsten: {
    provider: function() {
      return new HDWalletProvider(
        privateKeys.split(','),
        `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
      )
    },
    gas: 5000000,
    gasPrice: 25000000000,
    network_id: 3
  },
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};