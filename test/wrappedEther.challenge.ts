import { type PublicClient } from "viem"
import { expect } from "chai"

import type { ContractClient } from "../scripts/client"
import { checkBalance, win } from "../scripts/checks"

import { initialize } from "../scripts/wrappedEther.config"

// https://onlypwner.xyz/challenges/12
describe("Challenge: Wrapped Ether", () => {
  let publicClient: PublicClient
  let wrappedEtherContract: ContractClient

  before(async () => {
    ;({
      publicClient,
      contracts: [wrappedEtherContract],
    } = await initialize())
  })

  it("Wrapped Ether", async () => {
    //  ADD YOUR SOLUTION HERE 🤞
  })

  after(async () => {
    const contractBalance = await checkBalance(
      publicClient,
      wrappedEtherContract.address,
    )
    expect(contractBalance).to.equal(0n)
    win()
  })
})
