import {
  defineChain,
  http,
  createWalletClient,
  createPublicClient,
  type PublicClient,
  type WalletClient,
  type Narrow,
  type Abi,
  type Account,
  type Transport,
  type Chain,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"
import hre from "hardhat"
import { reset } from "@nomicfoundation/hardhat-network-helpers"
import type { HttpNetworkUserConfig } from "hardhat/types"

import { checkBalance } from "./checks"

type ReadFunc = (functionName: string) => Promise<unknown>
type WriteFunc = (
  functionName: string,
  args?: any[],
  value?: any,
) => Promise<void>

export interface ContractClient {
  address: `0x${string}`
  abi: Narrow<Abi | unknown[]>
  read: ReadFunc
  write: WriteFunc
}

export interface InitializedTutorial extends InitializedClients {
  contracts: ContractClient[]
}

interface InitializedClients {
  publicClient: PublicClient
  walletClient: WalletClient<Transport, Chain, Account>
  local: boolean
}

const onlyPwnerChain = (rpcUrl: string): Chain =>
  defineChain({
    id: 31337,
    name: "Only Pwner",
    network: "only",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    rpcUrls: {
      default: {
        http: [rpcUrl],
      },
      public: {
        http: [rpcUrl],
      },
    },
  })

const printWalletDetails = async (
  publicClient: PublicClient,
  address: `0x${string}`,
): Promise<void> => {
  console.log("  MY WALLET:", address)
  await checkBalance(publicClient, address, "MY BALANCE")
}

export const initialiseClients = async (): Promise<InitializedClients> => {
  console.log("  Running on network: ", hre.network.name)

  if (["localhost", "hardhat"].includes(hre.network.name)) {
    await reset()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_deployer, walletClient] = await hre.viem.getWalletClients()
    const publicClient = await hre.viem.getPublicClient()

    await printWalletDetails(publicClient, walletClient.account.address)

    return {
      walletClient,
      publicClient,
      local: true,
    }
  } else {
    const config = hre.network.config as HttpNetworkUserConfig
    const accountPrivateKey = (config?.accounts as string[])[0] as `0x${string}`

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const chain = onlyPwnerChain(config.url!)
    const account = privateKeyToAccount(accountPrivateKey)

    const publicClient = createPublicClient({
      chain,
      transport: http(),
    })
    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(),
    })

    await printWalletDetails(publicClient, walletClient.account.address)

    return { publicClient, walletClient, local: false }
  }
}

export const buildContractClient = (
  publicClient: PublicClient,
  walletClient: WalletClient<Transport, Chain, Account>,
  contractAddress: `0x${string}`,
  abi: Narrow<Abi | unknown[]>,
): ContractClient => {
  const readContract: ReadFunc = async (functionName) =>
    await publicClient.readContract({
      address: contractAddress,
      abi,
      functionName,
    })

  const writeContract: WriteFunc = async (functionName, args = [], value) => {
    const transaction = await walletClient.writeContract({
      address: contractAddress,
      abi,
      functionName,
      args,
      value,
      gasPrice: walletClient.chain.name === "Only Pwner" ? 0n : undefined,
    })

    await publicClient.waitForTransactionReceipt({
      hash: transaction,
    })
  }

  return {
    address: contractAddress,
    abi,
    read: readContract,
    write: writeContract,
  }
}
