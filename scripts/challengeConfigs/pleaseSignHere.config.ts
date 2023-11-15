import hre from "hardhat"

import { type InitializedTutorial } from "../client"

import { abi } from "../../artifacts/contracts/pleaseSignHere/Petition.sol/Petition.json"
import { initialiseSingleContract } from "../challengeConfig"

export const initialize = async (): Promise<InitializedTutorial> =>
  await initialiseSingleContract({
    deployContract: async () => {
      const contract = await hre.viem.deployContract("Petition")
      await contract.write.initialize()
      return contract.address
    },
    abi,
  })
