import { ethers, upgrades } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const AllowedList = await ethers.getContractFactory("AllowedList");
    const allowedList = await upgrades.deployProxy(AllowedList, [], { initializer: 'initialize' });

    await allowedList.deployed();

    console.log("AllowedList deployed to:", allowedList.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
