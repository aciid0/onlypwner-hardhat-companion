import type {
  Narrow,
  Abi,
  PublicClient,
  WalletClient,
  Transport,
  Chain,
  Account,
} from "viem"

import {
  type InitializedTutorial,
  buildContractClient,
  initialiseClients,
} from "./client"

interface initialiseSingleContractParams {
  deployContract: (
    publicClient: PublicClient,
    walletClient: WalletClient<Transport, Chain, Account>,
  ) => Promise<`0x${string}`>
  abi: Narrow<Abi | unknown[]>
  externalContractAddress?: `0x${string}`
}

export const initialiseSingleContract = async ({
  deployContract,
  abi,
  externalContractAddress = "0x78aC353a65d0d0AF48367c0A16eEE0fbBC00aC88",
}: initialiseSingleContractParams): Promise<InitializedTutorial> => {
  let contractAddress: `0x${string}`

  const { walletClient, publicClient, local } = await initialiseClients()

  if (local) {
    contractAddress = await deployContract(publicClient, walletClient)
  } else {
    contractAddress = externalContractAddress
  }

  const contractClient = buildContractClient(
    publicClient,
    walletClient,
    contractAddress,
    abi,
  )

  return {
    walletClient,
    publicClient,
    local,
    contracts: [contractClient],
  }
}
