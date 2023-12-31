import hre from "hardhat"
import { parseEther } from "viem"

import {
  initialiseClients,
  buildContractClient,
  type InitializedTutorial,
} from "../client"

import { abi } from "../../artifacts/contracts/freebie/Vault.sol/Vault.json"

export const externalContractAddress =
  "0x78aC353a65d0d0AF48367c0A16eEE0fbBC00aC88" as `0x${string}`

export const initialize = async (): Promise<InitializedTutorial> => {
  let contractAddress: `0x${string}`

  const { walletClient, publicClient, local } = await initialiseClients()

  if (local) {
    const contract = await hre.viem.deployContract(
      "contracts/freebie/Vault.sol:Vault",
    )
    await contract.write.deposit([], { value: parseEther("10") })
    contractAddress = contract.address
  } else {
    contractAddress = externalContractAddress
  }

  const vaultContract = buildContractClient(
    publicClient,
    walletClient,
    contractAddress,
    abi,
  )

  return {
    walletClient,
    publicClient,
    local,
    contracts: [vaultContract],
  }
}
