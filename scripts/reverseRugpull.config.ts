import hre from "hardhat"
import { parseEther } from "viem"

import {
  initialiseClients,
  buildContractClient,
  type InitializedTutorial,
} from "./client"

import { abi } from "../artifacts/contracts/reverseRugpull/Vault.sol/Vault.json"
import { abi as tokenAbi } from "../artifacts/contracts/reverseRugpull/MintableERC20.sol/MintableERC20.json"

export const externalTokenContractAddress =
  "0x78aC353a65d0d0AF48367c0A16eEE0fbBC00aC88" as `0x${string}`
export const externalVaultContractAddress =
  "0x91B617B86BE27D57D8285400C5D5bAFA859dAF5F" as `0x${string}`

export const initialize = async (): Promise<InitializedTutorial> => {
  let contractAddress: `0x${string}`
  let tokenAddress: `0x${string}`

  const { walletClient, publicClient, local } = await initialiseClients()

  if (local) {
    const tokenContract = await hre.viem.deployContract("MintableERC20", [
      "TOKEN",
      "TOKEN",
      parseEther("10"),
    ])
    const contract = await hre.viem.deployContract(
      "contracts/reverseRugpull/Vault.sol:Vault",
      [tokenContract.address],
    )

    const receipt = await tokenContract.write.transfer([
      walletClient.account.address,
      parseEther("9"),
    ])

    await publicClient.waitForTransactionReceipt({
      hash: receipt,
    })

    contractAddress = contract.address
    tokenAddress = tokenContract.address
  } else {
    contractAddress = externalVaultContractAddress
    tokenAddress = externalTokenContractAddress
  }

  const vaultContract = buildContractClient(
    publicClient,
    walletClient,
    contractAddress,
    abi,
  )

  const tokenContract = buildContractClient(
    publicClient,
    walletClient,
    tokenAddress,
    tokenAbi,
  )

  return {
    walletClient,
    publicClient,
    local,
    contracts: [vaultContract, tokenContract],
  }
}
