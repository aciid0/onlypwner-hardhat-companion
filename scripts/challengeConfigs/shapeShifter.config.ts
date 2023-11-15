import hre from "hardhat"
import { setBalance } from "@nomicfoundation/hardhat-network-helpers"
import { parseEther } from "viem"
import { type InitializedTutorial } from "../client"

import { abi } from "../../artifacts/contracts/shapeShifter/Stunt.sol/Stunt.json"
import { initialiseSingleContract } from "../challengeConfig"

export const initialize = async (): Promise<InitializedTutorial> =>
  await initialiseSingleContract({
    deployContract: async (_, walletClient) => {
      const contract = await hre.viem.deployContract("Stunt", [], {
        value: parseEther("101"),
      })

      //  A little bit of ETH, to cover gas on local node
      await setBalance(walletClient.account.address, parseEther("0.1"))

      return contract.address
    },
    abi,
  })
