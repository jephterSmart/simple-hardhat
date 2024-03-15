require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const ETHERSCAN_PRIVATE_KEY = process.env.ETHERSCAN_PRIVATE_KEY
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY

task('accounts', 'Print the list of accounts', async (_, hre) => {
  const accounts =await hre.ethers.getSigners()
  accounts.forEach((acc) =>console.log(acc.address))
})
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"hardhat",
  networks: {
    ganache: {
      url: 'http://127.0.0.1:7545',
      accounts: [ACCOUNT_PRIVATE_KEY]
    },
    // localhost: {
    //   url:'http://127.0.0.1:8545/',
    //   chainId: 31337
    // } 
  },
  solidity: "0.8.24",
  etherscan: {
    apiKey: ETHERSCAN_PRIVATE_KEY
  },
  gasReporter:{
    enabled: true
  }
};
