import hre from "hardhat"

import { type InitializedTutorial } from "../client"

import { abi } from "../../artifacts/contracts/pleaseSignHere/Petition.sol/Petition.json"
import { initialiseSingleContract } from "../challengeConfig"

export const initialize = async (): Promise<InitializedTutorial> =>
  await initialiseSingleContract({
    deployContract: async (publicClient) => {
      const contract = await hre.viem.deployContract("Petition")

      const receipt = await contract.write.initialize()
      await publicClient.waitForTransactionReceipt({
        hash: receipt,
      })

      return contract.address
    },
    abi,
  })
