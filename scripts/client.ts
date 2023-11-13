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

import hre from "hardhat"
import { reset } from "@nomicfoundation/hardhat-network-helpers"
import { privateKeyToAccount } from "viem/accounts"
import { checkBalance } from "./checks"

export interface ContractClient {
  address: `0x${string}`
  abi: Narrow<Abi | unknown[]>
  read: (functionName: string) => Promise<unknown>
  write: (functionName: string, args?: any[]) => Promise<void>
}

export interface InitializedTutorial extends InitializedClients {
  contracts: ContractClient[]
}

interface InitializedClients {
  publicClient: PublicClient
  walletClient: WalletClient<Transport, Chain, Account>
  local: boolean
}

const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`
const RPC_URL = process.env.RPC_URL as string

const onlyPwnerChain = (): Chain =>
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
        http: [RPC_URL],
      },
      public: {
        http: [RPC_URL],
      },
    },
  })

const printWalletDetails = async (
  publicClient: PublicClient,
  address: `0x${string}`,
): Promise<void> => {
  console.log("MY WALLET:", address)
  await checkBalance(publicClient, address, "MY BALANCE")
}

export const initialiseClients = async (): Promise<InitializedClients> => {
  console.log("Running on network: ", hre.network.name)

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
    const chain = onlyPwnerChain()
    const account = privateKeyToAccount(PRIVATE_KEY)

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
  const readContract = async (functionName: string): Promise<unknown> =>
    await publicClient.readContract({
      address: contractAddress,
      abi,
      functionName,
    })

  const writeContract = async (
    functionName: string,
    args: any[] = [],
  ): Promise<void> => {
    const transaction = await walletClient.writeContract({
      address: contractAddress,
      abi,
      functionName,
      args,
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
