import type { PublicClient } from "viem"
import { expect } from "chai"

import type { ContractClient } from "../scripts/client"
import { checkBalance, win } from "../scripts/checks"

import { initialize } from "../scripts/challengeConfigs/tutorial.config"

// https://onlypwner.xyz/challenges/1
describe("Challenge: Tutorial", () => {
  let publicClient: PublicClient
  let tutorialContract: ContractClient

  before(async () => {
    ;({
      publicClient,
      contracts: [tutorialContract],
    } = await initialize())
  })

  it("call the callMe method of Tutorial", async () => {
    await tutorialContract.write({ functionName: "callMe" })
  })

  after(async () => {
    const contractBalance = await checkBalance(
      publicClient,
      tutorialContract.address,
    )
    expect(contractBalance).to.equal(0n)
    win()
  })
})
