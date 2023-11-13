import type { PublicClient } from "viem"
import { expect } from "chai"

import type { ContractClient } from "../scripts/client"
import { checkBalance, win } from "../scripts/checks"

import { initialize } from "../scripts/tutorial.config"

describe("[Challenge] Tutorial", () => {
  let publicClient: PublicClient
  let tutorialContract: ContractClient

  before(async () => {
    ;({
      publicClient,
      contracts: [tutorialContract],
    } = await initialize())
  })

  it("Solve", async () => {
    await tutorialContract.write("callMe")
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
