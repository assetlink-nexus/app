import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

// We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Test = await ethers.getContractFactory("StableCoin");

    const test = await upgrades.deployProxy(Test, ["StableCoin","PL"], { initializer: 'initialize'});
    
    return { test, owner };
  }

describe("StableCoin", function () {
  
  describe("Deployment", function () {
    it("Should set the right name for contaract", async function () {
      const { test } = await loadFixture(deployContract);

      expect(await test.name()).to.equal("StableCoin");
    });
  });
});