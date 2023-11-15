import {
  parseEther,
  type PublicClient,
  type Account,
  type WalletClient,
  type Transport,
  type Chain,
} from "viem"
import { expect } from "chai"

import type { ContractClient } from "../scripts/client"
import { checkBalance, win } from "../scripts/checks"

import { initialize } from "../scripts/challengeConfigs/shapeShifter.config"

// https://onlypwner.xyz/challenges/8
describe("Challenge: Shape Shifter", () => {
  let publicClient: PublicClient
  let walletClient: WalletClient<Transport, Chain, Account>
  let stuntContract: ContractClient

  before(async () => {
    ;({
      publicClient,
      walletClient,
      contracts: [stuntContract],
    } = await initialize())
  })

  it("Get 100 or more ETH", async () => {
    //  ADD YOUR SOLUTION HERE 🤞
  })

  after(async () => {
    const balance = await checkBalance(
      publicClient,
      walletClient.account.address,
    )
    expect(balance).to.be.greaterThanOrEqual(parseEther("100"))
    win()
  })
})
