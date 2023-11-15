import {
  type PublicClient,
  type Account,
  type WalletClient,
  type Transport,
  type Chain,
} from "viem"
import { expect } from "chai"

import type { ContractClient } from "../scripts/client"
import { checkTokenBalance, win } from "../scripts/checks"

import { initialize } from "../scripts/challengeConfigs/underTheFlow.config"

// https://onlypwner.xyz/challenges/9
describe("Challenge: Under the Flow", () => {
  let publicClient: PublicClient
  let walletClient: WalletClient<Transport, Chain, Account>
  let tokenContract: ContractClient

  before(async () => {
    ;({
      publicClient,
      walletClient,
      contracts: [tokenContract],
    } = await initialize())
  })

  it("Get a token balance", async () => {
    //  ADD YOUR SOLUTION HERE 🤞
  })

  after(async () => {
    const tokenBalance = await checkTokenBalance(
      publicClient,
      tokenContract.address,
      walletClient.account.address,
    )
    expect(tokenBalance).to.be.above(0n)
    win()
  })
})
