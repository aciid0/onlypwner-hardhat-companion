import { type PublicClient } from "viem"
import { expect } from "chai"

import type { ContractClient } from "../scripts/client"
import { checkBalance, win } from "../scripts/checks"

import { initialize } from "../scripts/challengeConfigs/freebie.config"

// https://onlypwner.xyz/challenges/5
describe("Challenge: Freebie", () => {
  let publicClient: PublicClient
  let vaultContract: ContractClient

  before(async () => {
    ;({
      publicClient,
      contracts: [vaultContract],
    } = await initialize())
  })

  it("The Vault is out of funds", async () => {
    //  ADD YOUR SOLUTION HERE 🤞
  })

  after(async () => {
    const contractBalance = await checkBalance(
      publicClient,
      vaultContract.address,
    )
    expect(contractBalance).to.equal(0n)
    win()
  })
})
