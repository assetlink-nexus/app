import { ethers, upgrades } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Assuming `IAllowedList` is already deployed and you have its address
    const allowedListAddress = "0x33275AE88C367947FfAe2742d27898e1B83f5958";

    const EquityToken = await ethers.getContractFactory("EquityToken");
    const equityToken = await upgrades.deployProxy(EquityToken, ["Equity Token", "EQT", "your_base_URI", allowedListAddress], { initializer: 'initialize' });

    await equityToken.deployed();

    console.log("EquityToken deployed to:", equityToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
