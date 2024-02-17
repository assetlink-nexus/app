import { ethers, upgrades } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const TOK = await ethers.getContractFactory('TOK');
  console.log('Deploying TOK...');
  const tokenAddress = "0xBa9f53005e4ABA3d8F9982034750A43B77715681";
  const tok = await upgrades.deployProxy(TOK, [tokenAddress], { initializer: 'initialize' });
  
  await tok.deployed();
  console.log('TOK deployed to:', tok.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
