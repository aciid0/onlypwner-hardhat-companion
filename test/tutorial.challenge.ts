import hre from "hardhat";
import {
  parseEther,
  type PublicClient,
  type WalletClient,
  type Account,
  type Transport,
  type Chain,
} from "viem";
import { expect } from "chai";

import { initialiseClients } from "../scripts/chain";
import { checkBalance } from "../scripts/checks";

import { abi } from "../artifacts/contracts/tutorial/Tutorial.sol/Tutorial.json";

describe("[Challenge] Tutorial", () => {
  const externalContractAddress =
    "0x78aC353a65d0d0AF48367c0A16eEE0fbBC00aC88" as `0x${string}`;
  let walletClient: WalletClient<Transport, Chain, Account>,
    publicClient: PublicClient,
    local: boolean;
  let contractAddress: `0x${string}`;

  before(async () => {
    ({ walletClient, publicClient, local } = await initialiseClients());

    if (local) {
      const contract = await hre.viem.deployContract("Tutorial", [], {
        value: parseEther("10"),
      });
      contractAddress = contract.address;
    } else {
      contractAddress = externalContractAddress;
    }
  });

  it("Solve Tutorial", async () => {
    let transaction = await walletClient.writeContract({
      address: contractAddress,
      abi: abi,
      functionName: "callMe",
    });

    await publicClient.waitForTransactionReceipt({
      hash: transaction,
    });
  });

  after(async () => {
    const contractBalance = await checkBalance(publicClient, contractAddress);
    expect(contractBalance).to.equal(0n);
  });
});
