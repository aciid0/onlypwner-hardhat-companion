import hre from "hardhat"
import { parseEther } from "viem"

import {
  initialiseClients,
  buildContractClient,
  type InitializedTutorial,
} from "../client"

import { abi } from "../../artifacts/contracts/thirteenthAirdrop/Airdrop.sol/Airdrop.json"

export const externalContractAddress =
  "0x78aC353a65d0d0AF48367c0A16eEE0fbBC00aC88" as `0x${string}`

export const initialize = async (): Promise<InitializedTutorial> => {
  let contractAddress: `0x${string}`

  const { walletClient, publicClient, local } = await initialiseClients()

  if (local) {
    const contract = await hre.viem.deployContract("Airdrop")

    const [, ...rest] = await hre.viem.getWalletClients()

    //  user/walletClient account + 5 others
    const registers = rest.slice(0, 6).map(async (wallet) => {
      const receipt = await contract.write.addRecipient(
        [wallet.account.address],
        {
          value: parseEther("10"),
        },
      )

      await publicClient.waitForTransactionReceipt({
        hash: receipt,
      })
    })

    await Promise.all(registers)

    contractAddress = contract.address
  } else {
    contractAddress = externalContractAddress
  }

  const airdropContract = buildContractClient(
    publicClient,
    walletClient,
    contractAddress,
    abi,
  )

  return {
    walletClient,
    publicClient,
    local,
    contracts: [airdropContract],
  }
}
