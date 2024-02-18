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
  
  const bundlerUrl =
    "https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; // Found at https://dashboard.biconomy.io
  
  export const createAccountAndMintNft = async () => {
    // ----- 1. Generate EOA from private key
    const privateKey = "b3d192521ddc8b77cd442df971a944e193322f8580f72238d07afbbedf0973fb";
    const account = privateKeyToAccount(`0x${privateKey}`);
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
  const nftAddress = "0x1758f42Af7026fBbB559Dc60EcE0De3ef81f665e";
  const parsedAbi = parseAbi(["function safeMint(address _to)"]);
  const nftData = encodeFunctionData({
    abi: parsedAbi,
    functionName: "safeMint",
    args: [saAddress as Hex],
  });

  // ------ 4. Send transaction
  const { waitForTxHash } = await smartAccount.sendTransaction({
    to: nftAddress,
    data: nftData,
  });

  const { transactionHash } = await waitForTxHash();
  console.log("transactionHash", transactionHash);
};
createAccountAndMintNft();