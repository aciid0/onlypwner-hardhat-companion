import hre from "hardhat"
import { setBalance } from "@nomicfoundation/hardhat-network-helpers"
import { parseEther } from "viem"

import {
  initialiseClients,
  buildContractClient,
  type InitializedTutorial,
} from "../client"

import { abi } from "../../artifacts/contracts/wrappedEther/WrappedEther.sol/WrappedEther.json"

export const externalContractAddress =
  "0x78aC353a65d0d0AF48367c0A16eEE0fbBC00aC88" as `0x${string}`

export const initialize = async (): Promise<InitializedTutorial> => {
  let contractAddress: `0x${string}`

  const { walletClient, publicClient, local } = await initialiseClients()

  if (local) {
    const contract = await hre.viem.deployContract("WrappedEther", [])

    const [, , ...rest] = await hre.viem.getWalletClients()

    const deposits = rest.slice(0, 5).map(async (account) => {
      const receipt = await contract.write.deposit([account.account.address], {
        value: parseEther("1"),
      })

      await publicClient.waitForTransactionReceipt({
        hash: receipt,
      })
    })

    await Promise.all(deposits)

    //  A little extra ETH than onlyPwner, to cover gas on local node
    await setBalance(walletClient.account.address, parseEther("1.1"))

    contractAddress = contract.address
  } else {
    contractAddress = externalContractAddress
  }

  const wrappedEtherContract = buildContractClient(
    publicClient,
    walletClient,
    contractAddress,
    abi,
  )

  return {
    walletClient,
    publicClient,
    local,
    contracts: [wrappedEtherContract],
  }
}
