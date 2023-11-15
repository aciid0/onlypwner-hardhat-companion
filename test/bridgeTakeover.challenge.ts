import { pad } from "viem"
import { expect } from "chai"

import type { ContractClient } from "../scripts/client"
import { win } from "../scripts/checks"

import { initialize } from "../scripts/challengeConfigs/bridgeTakeover.config"

// https://onlypwner.xyz/challenges/3
describe("Challenge: Bridge Takeover", () => {
  let bridgeContract: ContractClient

  before(async () => {
    ;({
      contracts: [bridgeContract],
    } = await initialize())
  })

  it("Set the state root to 0xdeadbeef", async () => {
    //  ADD YOUR SOLUTION HERE 🤞
  })

  after(async () => {
    const stateRoot = await bridgeContract.read({
      functionName: "stateRoot",
    })

    expect(stateRoot).to.equal(pad("0xdeadbeef"))
    win()
  })
})
