// Import ethers and upgrades plugin from Hardhat environment
const { ethers, upgrades } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // Change 'Vault' to the name of your contract
  const Vault = await ethers.getContractFactory('Vault');
  console.log('Deploying Vault...');

  // Assuming your Vault contract's initializer function is named 'initialize'
  // and it expects an address for the token contract as its argument
  const tokenAddress = "0xBa9f53005e4ABA3d8F9982034750A43B77715681"; // Replace with your token address
  const vault = await upgrades.deployProxy(Vault, [tokenAddress], { initializer: 'initialize' });

  await vault.deployed();
  console.log('Vault deployed to:', vault.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
