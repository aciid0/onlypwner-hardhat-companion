import hre from "hardhat"
import { parseEther } from "viem"

import {
  initialiseClients,
  buildContractClient,
  type InitializedTutorial,
} from "./client"

import { abi } from "../artifacts/contracts/underTheFlow/ImprovedERC20.sol/ImprovedERC20.json"

export const externalContractAddress =
  "0x78aC353a65d0d0AF48367c0A16eEE0fbBC00aC88" as `0x${string}`
const externalOtherUserAddress =
  "0x34788137367a14F2C4D253f9A6653A93aDf2D235" as `0x${string}`

interface InitializedUnderTheFlowTutorial extends InitializedTutorial {
  otherUserAddress: `0x${string}`
}

export const initialize =
  async (): Promise<InitializedUnderTheFlowTutorial> => {
    let contractAddress: `0x${string}`
    let otherUserAddress: `0x${string}`

    const { walletClient, publicClient, local } = await initialiseClients()

    if (local) {
      const contract = await hre.viem.deployContract("ImprovedERC20", [
        "Improved ERC20",
        "IMPERC20",
        18,
        parseEther("100"),
      ])

      const [, , otherAccount] = await hre.viem.getWalletClients()

      const receipt = await contract.write.transfer([
        otherAccount.account.address,
        parseEther("100"),
      ])

      await publicClient.waitForTransactionReceipt({
        hash: receipt,
      })

      contractAddress = contract.address
      otherUserAddress = otherAccount.account.address
    } else {
      contractAddress = externalContractAddress
      otherUserAddress = externalOtherUserAddress
    }

    const tokenContract = buildContractClient(
      publicClient,
      walletClient,
      contractAddress,
      abi,
    )

    return {
      walletClient,
      publicClient,
      local,
      contracts: [tokenContract],
      otherUserAddress,
    }
  }
