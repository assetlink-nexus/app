// scripts/deploy.ts
import { ethers, upgrades, run } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const StableCoin = await ethers.getContractFactory("StableCoin");
  const stableCoin = await upgrades.deployProxy(StableCoin, ["Stable Coin", "STB"], { initializer: "initialize" });

  await stableCoin.deployed();

  console.log("StableCoin deployed to:", stableCoin.address);

  // Run a Hardhat task
  await run("verify:verify", {
    address: stableCoin.address,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
