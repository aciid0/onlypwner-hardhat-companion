import type { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox-viem"
import "@nomicfoundation/hardhat-chai-matchers"

import dotenv from "dotenv"
dotenv.config()

const RPC_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
      },
      {
        version: "0.8.13",
      },
      {
        version: "0.8.20",
      },
      {
        version: "0.7.0",
      },
    ],
  },
  networks: {
    onlypwner: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  mocha: {
    slow: 200000,
  },
}

export default config
