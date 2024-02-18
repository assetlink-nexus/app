import {
  Hex,
  createWalletClient,
  encodeFunctionData,
  http,
  parseAbi,
  zeroAddress,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import { createSmartAccountClient } from "@biconomy/account";


const TokContractABI = require("../../chain/artifacts/contracts/TOK.json").abi;
export const createAccountAndMintNft = async () => {
  // ----- 1. Generate EOA from private key
  const account = privateKeyToAccount(`0x${"b3d192521ddc8b77cd442df971a944e193322f8580f72238d07afbbedf0973fb"}`);
  const client = createWalletClient({
    account,
    chain: polygonMumbai,
    transport: http(),
  });
  const eoa = client.account.address;
  console.log(`EOA address: ${eoa}`);

  // ------ 2. Create biconomy smart account instance
  const smartAccount = await createSmartAccountClient({
    signer: client,
    bundlerUrl:
      "https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
  });
  const saAddress = await smartAccount.getAccountAddress();
  console.log("SA Address", saAddress);

  // ------ 3. Generate transaction data
  const TOKAddress = "0x76786F56133C4B2173512C935C5d1688ca92B140";
  const parsedAbi = parseAbi(["function safeMint(address _to)"]);
  const TOKData = encodeFunctionData({
    abi: parsedAbi,
    functionName: "safeMint",
    args: [saAddress as Hex],
  });

  // ------ 4. Send transaction
  const { waitForTxHash } = await smartAccount.sendTransaction({
    to: TOKAddress,
    data: TOKData,
  });

  const { transactionHash } = await waitForTxHash();
  console.log("transactionHash", transactionHash);
};
createAccountAndMintNft();