import type { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox-viem"
import dotenv from "dotenv"
dotenv.config()

const RPC_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    onlypwner: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
}

export default config
