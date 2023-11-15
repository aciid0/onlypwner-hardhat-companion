import { type PublicClient } from "viem"
import { expect } from "chai"

import type { ContractClient } from "../scripts/client"
import { checkBalance, win } from "../scripts/checks"

import { initialize } from "../scripts/challengeConfigs/allOrNothing.config"

// https://onlypwner.xyz/challenges/10
describe("Challenge: All or Nothing", () => {
  let publicClient: PublicClient
  let allOrNothingContract: ContractClient

  before(async () => {
    ;({
      publicClient,
      contracts: [allOrNothingContract],
    } = await initialize())
  })

  it("Drain the contract of its funds", async () => {
    //  ADD YOUR SOLUTION HERE 🤞
  })

  after(async () => {
    const contractBalance = await checkBalance(
      publicClient,
      allOrNothingContract.address,
    )
    expect(contractBalance).to.equal(0n)
    win()
  })
})
