import assert from "node:assert";
import { PublicClient, formatEther, parseAbi } from "viem";

export const win = (
  condition: boolean,
  rawValue: any,
  message = "Expected to have some tokens"
) => {
  assert(condition, message + ". Actual is " + rawValue);

  if (condition) {
    console.log("*********************");
    console.log("****** WINNNER *****");
    console.log("***  🤘🏆🏆🏆🤘  ***");
    console.log("********** **********");
  }
};

export const checkBalance = async (
  publicClient: PublicClient,
  address: `0x${string}`,
  message = "BALANCE:"
) => {
  const balance = await publicClient.getBalance({
    address,
  });
  console.log(message, balance, `~ ${formatEther(balance)} ETH`);
  return balance;
};

export const checkTokenBalance = async (
  publicClient: PublicClient,
  tokenAddress: `0x${string}`,
  address: `0x${string}`,
  message = "BALANCE:"
) => {
  const abi = parseAbi(["function balanceOf(address) view returns(uint256)"]);

  const balance = (await publicClient.readContract({
    address: tokenAddress,
    abi,
    functionName: "balanceOf",
    args: [address],
  })) as unknown as bigint;
  console.log(message, balance);
  return balance;
};
