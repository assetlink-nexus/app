import { ethers, upgrades } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Assuming `IAllowedList` is already deployed and you have its address
    const allowedListAddress = "0xEDF9aF4d87e723553d1Bf4C0E55768AC05627647";

    const EquityToken = await ethers.getContractFactory("EquityToken");
    const equityToken = await upgrades.deployProxy(EquityToken, ["Akcje PKO BP", "PKOBP", "your_base_URI", allowedListAddress], { initializer: 'initialize' });

    await equityToken.deployed();

    console.log("EquityToken deployed to:", equityToken.address);

     // Addresses of the individuals to receive the tokens
     const recipientAddress1 = "0xd600A9d3cd56aC0F088CC1a35B7C8747Fd7dddd0";
     const recipientAddress2 = "0x97afd8074A1DAC4b29088F868c4D70B7A13dbd11";
     const recipientAddress3 = "0x45D776e482E142f8F1AD72bAD5C71e0fE4cf2340";
 
     // Issue 50,000 tokens to each recipient
     const issueAmount = ethers.utils.parseUnits("50000", 18); // Assuming token uses 18 decimal places
 
     await equityToken.creatItem(recipientAddress1, issueAmount);
     console.log(`Issued 50,000 tokens to ${recipientAddress1}`);
 
     await equityToken.creatItem(recipientAddress2, issueAmount);
     console.log(`Issued 50,000 tokens to ${recipientAddress2}`);

     await equityToken.creatItem(recipientAddress2, issueAmount);
     console.log(`Issued 50,000 tokens to ${recipientAddress3}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
