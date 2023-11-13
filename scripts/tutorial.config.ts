import hre from "hardhat"
import {
  parseEther,
  type PublicClient,
  type WalletClient,
  type Account,
  type Transport,
  type Chain,
} from "viem"

import { initialiseClients, buildContractClient, Initialized } from "./client"

import { abi } from "../artifacts/contracts/tutorial/Tutorial.sol/Tutorial.json"

export const externalContractAddress =
  "0x78aC353a65d0d0AF48367c0A16eEE0fbBC00aC88" as `0x${string}`

export const initialize = async (): Promise<Initialized> => {
  let contractAddress: `0x${string}`

  const { walletClient, publicClient, local } = await initialiseClients()

  if (local) {
    const contract = await hre.viem.deployContract("Tutorial", [], {
      value: parseEther("10"),
    })
    contractAddress = contract.address
  } else {
    contractAddress = externalContractAddress
  }

  const tutorialContract = buildContractClient(
    publicClient,
    walletClient,
    contractAddress,
    abi
  )

  return {
    walletClient,
    publicClient,
    local,
    contracts: [tutorialContract],
  }
}
