import hre from "hardhat"
import { type PublicClient, parseEther } from "viem"
import { expect } from "chai"

import type { ContractClient } from "../scripts/client"
import { checkTokenBalance, win } from "../scripts/checks"

import { initialize } from "../scripts/reverseRugpull.config"

// https://onlypwner.xyz/challenges/7
describe("Challenge: Reverse Rugpull", () => {
  let publicClient: PublicClient
  let vaultContract: ContractClient
  let tokenContract: ContractClient
  let local: boolean

  before(async () => {
    ;({
      local,
      publicClient,
      contracts: [vaultContract, tokenContract],
    } = await initialize())
  })

  it("Reverse Rugpull", async () => {
    //  ADD YOUR SOLUTION HERE 🤞
  })

  after(async () => {
    const vaultTokenBalance = await checkTokenBalance(
      publicClient,
      tokenContract.address,
      vaultContract.address,
    )
    expect(vaultTokenBalance).to.be.above(parseEther("1"))

    // NOTE: The check only runs locally, as it updates the state of the contracts
    // and will intefer with the Onlypwner 'CHECK'.
    if (local) {
      const [deployer] = await hre.viem.getWalletClients()

      let transaction = await deployer.writeContract({
        address: tokenContract.address,
        abi: tokenContract.abi,
        functionName: "approve",
        args: [vaultContract.address, parseEther("0.1")],
      })

      await publicClient.waitForTransactionReceipt({
        hash: transaction,
      })

      transaction = await deployer.writeContract({
        address: vaultContract.address,
        abi: vaultContract.abi,
        functionName: "deposit",
        args: [parseEther("0.1")],
      })

      await publicClient.waitForTransactionReceipt({
        hash: transaction,
      })

      const shares = (await publicClient.readContract({
        address: vaultContract.address,
        abi: vaultContract.abi,
        functionName: "shares",
        args: [deployer.account.address],
      })) as bigint

      expect(shares).to.equal(0)
      win()
    }
  })
})
