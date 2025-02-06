import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
require("dotenv").config()
import { configDotenv } from "dotenv";

configDotenv();

if(!process.env.SEPOLIA_NETWORK_URL){
  throw new Error("Missing environment variable: SEPOLIA_NETWORK_URL");
}

if(!process.env.ELECTRONEUM_NETWORK_URL){
  throw new Error("Missing environment variable: ELECTRONEUM_NETWORK_URL");
}

if(!process.env.ACCOUNT_PRIVATE_KEY){
  throw new Error("Missing environment variable: ACCOUNT_PRIVATE_KEY");
}


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    electroneum:{ 
      url: process.env.ELECTRONEUM_NETWORK_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
    sepolia: {
      url: process.env.SEPOLIA_NETWORK_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    },
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  
};

module.exports = {
  solidity: "0.8.28",
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    only: [':ERC20$'],
    spacing: 2,
    pretty: true,
    format: "minimal",
  },
};

export default config;