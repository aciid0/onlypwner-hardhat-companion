import {
  defineChain,
  http,
  createWalletClient,
  createPublicClient,
  WalletClient,
} from "viem";

import hre from "hardhat";
import { reset } from "@nomicfoundation/hardhat-network-helpers";
import { privateKeyToAccount } from "viem/accounts";
import { checkBalance } from "./checks";

const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`;
const RPC_URL = process.env.RPC_URL as string;

export const onlyPwnerChain = () =>
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
  });

export const initialiseClients = async () => {
  console.log("Running on network: ", hre.network.name);

  if (hre.network.name === "localhost") {
    await reset();

    const [owner, walletClient] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    console.log("MY WALLET:", walletClient.account.address);
    await checkBalance(
      publicClient,
      walletClient.account.address,
      "MY BALANCE"
    );

    return {
      walletClient,
      publicClient,
      local: true,
    };
  } else {
    const chain = onlyPwnerChain();
    const account = privateKeyToAccount(PRIVATE_KEY);

    const publicClient = createPublicClient({
      chain,
      transport: http(),
    });
    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(),
    });

    console.log("MY WALLET:", walletClient.account.address);
    await checkBalance(
      publicClient,
      walletClient.account.address,
      "MY BALANCE"
    );

    return { publicClient, walletClient, local: false };
  }
};
