import { type PublicClient, parseEther } from "viem"
import { expect } from "chai"

import type { ContractClient } from "../scripts/client"
import { checkBalance, win } from "../scripts/checks"

import { initialize } from "../scripts/challengeConfigs/thirteenthAirdrop.config"

// https://onlypwner.xyz/challenges/2
describe("Challenge: 13th Airdrop", () => {
  let publicClient: PublicClient
  let airdropContract: ContractClient

  before(async () => {
    ;({
      publicClient,
      contracts: [airdropContract],
    } = await initialize())
  })

  it("Less than 30 ETH remain in the contract", async () => {
    //  ADD YOUR SOLUTION HERE 🤞
  })

  after(async () => {
    const contractBalance = await checkBalance(
      publicClient,
      airdropContract.address,
    )
    expect(contractBalance).to.lessThanOrEqual(parseEther("30"))
    win()
  })
})
