import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from "dotenv";

const { PRIVATE_KEY, ALCHEMY_SEPOLIA_URL,ETHERSCAN_API_KEY} = process.env;
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/cVeMsJt089c_8f0uAVD6fKYWauwwzLne",
      accounts: ["b3d192521ddc8b77cd442df971a944e193322f8580f72238d07afbbedf0973fb"],
    },
  },
  
  etherscan: {
      apiKey: "JBIAZ9C2QZ581SFVS1XDWKV6JM883XUYM1",
    },

};


export default config;
