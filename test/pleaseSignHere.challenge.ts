import { expect } from "chai"

import type { ContractClient } from "../scripts/client"
import { win } from "../scripts/checks"

import { initialize } from "../scripts/challengeConfigs/pleaseSignHere.config"

// https://onlypwner.xyz/challenges/6
describe("Challenge: Freebie", () => {
  let petitionContract: ContractClient

  before(async () => {
    ;({
      contracts: [petitionContract],
    } = await initialize())
  })

  it("Finish the petition", async () => {
    //  ADD YOUR SOLUTION HERE 🤞
  })

  after(async () => {
    const finished = await petitionContract.read({
      functionName: "isFinished",
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(finished).to.be.true
    win()
  })
})
