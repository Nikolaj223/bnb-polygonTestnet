import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const bscTestnetPrivateKey = process.env.BSC_TESTNET_PRIVATE_KEY;
const polygonTestnetPrivateKey = process.env.POLYGON_TESTNET_PRIVATE_KEY;
const bscTestnetRpcUrl = process.env.BSC_TESTNET_RPC_URL || "";
const polygonTestnetRpcUrl = process.env.POLYGON_TESTNET_RPC_URL || "";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.20" }, // Для Bridge.sol и контрактов OpenZeppelin
      { version: "0.8.0" }   // Для SimpleStorage.sol
    ]
  },
  networks: {
    bscTestnet: { // конфигурация для BSC Testnet
      url: bscTestnetRpcUrl,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: bscTestnetPrivateKey ? [bscTestnetPrivateKey] : [],
    },
    polygonTestnet: { // конфигурация для Polygon Testnet
      url: polygonTestnetRpcUrl,
      chainId: 80002,
      accounts: polygonTestnetPrivateKey ? [polygonTestnetPrivateKey] : [],
    },
  },
};