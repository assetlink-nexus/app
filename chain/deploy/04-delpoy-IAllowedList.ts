import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const AllowedList = await ethers.getContractFactory("AllowedList");
    const allowedList = await AllowedList.deploy();

    await allowedList.deployed();
    console.log("AllowedList deployed to:", allowedList.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
