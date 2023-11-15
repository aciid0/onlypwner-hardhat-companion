import hre from "hardhat"
import { setBalance } from "@nomicfoundation/hardhat-network-helpers"
import { toHex, parseEther } from "viem"

import { type InitializedTutorial } from "../client"

import { abi } from "../../artifacts/contracts/bridgeTakeover/Bridge.sol/Bridge.json"
import { initialiseSingleContract } from "../challengeConfig"

export const initialize = async (): Promise<InitializedTutorial> =>
  await initialiseSingleContract({
    deployContract: async (publicClient, walletClient) => {
      const contract = await hre.viem.deployContract("Bridge")

      const receipt = await contract.write.registerValidator(
        [toHex(0, { size: 20 }), toHex("Some Tag", { size: 32 })],
        {
          value: parseEther("100"),
        },
      )

      await publicClient.waitForTransactionReceipt({
        hash: receipt,
      })

      //  A little extra ETH than onlyPwner, to cover gas on local node
      await setBalance(walletClient.account.address, parseEther("1.1"))

      return contract.address
    },
    abi,
  })
