import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

async function deployContracts() {
  const [owner, otherAccount] = await ethers.getSigners();

  const StableCoin = await ethers.getContractFactory("StableCoin");
  const AllowedList = await ethers.getContractFactory("AllowedList");
  const EquityToken = await ethers.getContractFactory(
    "EquityToken"
  );

  const TOK = await ethers.getContractFactory("TOK");

  const stableCoin = await upgrades.deployProxy(
    StableCoin,
    ["StableCoin", "PL"],
    { initializer: "initialize"}
);
  const allowedList = await upgrades.deployProxy(AllowedList, {
    initializer: "initialize"});
  const equityToken = await upgrades.deployProxy(
    EquityToken,
    ["Huta Julia", "HJ", "URI",allowedList.address],
    { initializer: "initialize"}
  );
  const tok = await upgrades.deployProxy(TOK, [stableCoin.address], {
    initializer: "initialize"});

  return { allowedList, stableCoin, equityToken, owner, tok, otherAccount };
}


describe("EquityToken", function () {
  
  //EquityToken
  describe("Only EquityToken", function () {
    it("Should set the right name for contract", async function () {
      const { equityToken } = await loadFixture(deployContracts);

      expect(await equityToken.name()).to.equal("Huta Julia");
    });

    it("Should set the right URI for contract", async function () {
      const { equityToken } = await loadFixture(deployContracts);

      expect(await equityToken.baseURI()).to.equal("URI");
    });

    it("Should set pause ", async function () {
      const { equityToken } = await loadFixture(deployContracts);
      await equityToken.pause();

      expect(await equityToken.paused()).to.equal(true);
    });

    it("Should unset pause", async function () {
      const { equityToken } = await loadFixture(deployContracts);
      await equityToken.pause();
      await equityToken.unpause();

      expect(await equityToken.paused()).to.equal(false);
    });
  });

  //AllowedList
  describe("AllowedList", function () {
    it("Should add the right address to the AllowedList contract", async function () {
      const { allowedList, owner } = await loadFixture(deployContracts);
      await allowedList.addToAllowedList(owner.address);

      expect(await allowedList.checkAllowedList(owner.address)).to.equal(true);
    });

    it("Should remove the right address from the Allowedlist contract", async function () {
      const { allowedList, owner } = await loadFixture(deployContracts);
      await allowedList.addToAllowedList(owner.address);
      await allowedList.removeFromAllowedList(owner.address);

      expect(await allowedList.checkAllowedList(owner.address)).to.equal(false);
    });
  });

  //Base flow
  describe("Base flow one address", function () {
    it("Should positively go through the base scenario", async function () {
      const { allowedList, equityToken, stableCoin, owner, tok } =
        await loadFixture(deployContracts);
      await allowedList.addToAllowedList(owner.address);
      await equityToken.creatItem(owner.address, 1000);
      await stableCoin.approve(tok.address, 10);
      await stableCoin.transfer(owner.address, 1000);
      await allowedList.addToAllowedList(tok.address);
      await equityToken.approve(tok.address, 10);
      await tok.createOrder(1, equityToken.address, 1);
      await tok.depositEquityToken(0, 1);
      await tok.lockTransaction(0, false);
      await tok.transact(0);

      expect(await equityToken.balanceOf(owner.address)).to.equal(
        ethers.BigNumber.from(1000)
      );
    });
  });

  //Base flow
  describe("Base flow two addresses", function () {
    it("Should positively go through the base scenario", async function () {
      const { allowedList, equityToken, stableCoin, owner, tok, otherAccount } =
        await loadFixture(deployContracts);

      await allowedList.addToAllowedList(owner.address);
      await allowedList.addToAllowedList(otherAccount.address);
      await equityToken.creatItem(otherAccount.address, 1000); //equityToken
      await stableCoin.approve(tok.address, 10);
      await stableCoin.transfer(owner.address, 1000);
      await allowedList.addToAllowedList(tok.address);
      await equityToken.connect(otherAccount).approve(tok.address, 10);
      await tok.createOrder(1, equityToken.address, 1);
      await tok.connect(otherAccount).depositEquityToken(0, 1);
      await tok.lockTransaction(0, false);
      await tok.transact(0);

      expect(await equityToken.balanceOf(owner.address)).to.equal(
        ethers.BigNumber.from(1)
      );

      expect(await equityToken.balanceOf(otherAccount.address)).to.equal(
        ethers.BigNumber.from(999)
      );

      expect(await stableCoin.balanceOf(owner.address)).to.equal(
        ethers.BigNumber.from(999999999)
      );

      expect(await stableCoin.balanceOf(otherAccount.address)).to.equal(
        ethers.BigNumber.from(1)
      );
    });
  });

  //Base flow
  describe("Cancel transaction by buyer", function () {
    it("Should cancel transaction by buyer", async function () {
      const { allowedList, equityToken, stableCoin, owner, tok, otherAccount } =
        await loadFixture(deployContracts);
      await allowedList.addToAllowedList(owner.address);
      await allowedList.addToAllowedList(otherAccount.address);
      await equityToken.creatItem(otherAccount.address, 1000); //equityToken
      await stableCoin.approve(tok.address, 10);
      await stableCoin.transfer(owner.address, 1000);
      await allowedList.addToAllowedList(tok.address);
      await equityToken.connect(otherAccount).approve(tok.address, 10);
      await tok.createOrder(1, equityToken.address, 1);
      await tok.cancelOrderByOwner(0);
      const order = await tok.getOrders(0);
      const ORDER_OWNER_CANCEL = 6;

      expect(order.currentState).to.equal(
        ethers.BigNumber.from(ORDER_OWNER_CANCEL)
      );
    });
  });

  //Base flow
  describe("Cancel transaction by the token's seller", function () {
    it("Should cancel transaction by the token's seller", async function () {
      const { allowedList, equityToken, stableCoin, owner, tok, otherAccount } =
        await loadFixture(deployContracts);
      await allowedList.addToAllowedList(owner.address);
      await allowedList.addToAllowedList(otherAccount.address);
      await equityToken.creatItem(otherAccount.address, 1000); //equityToken
      await stableCoin.approve(tok.address, 10);
      await stableCoin.transfer(owner.address, 1000);
      await allowedList.addToAllowedList(tok.address);
      await equityToken.connect(otherAccount).approve(tok.address, 10);
      await tok.createOrder(1, equityToken.address, 1);
      await tok.connect(otherAccount).depositEquityToken(0, 1);
      await tok.connect(otherAccount).cancelOrderByTokenOwner(0);
      const order = await tok.getOrders(0);
      const TOKEN_OWNER_CANCEL = 7;

      expect(order.currentState).to.equal(
        ethers.BigNumber.from(TOKEN_OWNER_CANCEL)
      );
    });
  });

  //Base flow
  describe("Cancel transaction by token's seller and buyer", function () {
    it("Should cancel transaction first by seller and then token's buyer", async function () {
      const { allowedList, equityToken, stableCoin, owner, tok, otherAccount } =
        await loadFixture(deployContracts);
      await allowedList.addToAllowedList(owner.address);
      await allowedList.addToAllowedList(otherAccount.address);
      await equityToken.creatItem(otherAccount.address, 1000); //equityToken
      await stableCoin.approve(tok.address, 10);
      await stableCoin.transfer(owner.address, 1000);
      await allowedList.addToAllowedList(tok.address);
      await equityToken.connect(otherAccount).approve(tok.address, 10);
      await tok.createOrder(1, equityToken.address, 1);
      await tok.connect(otherAccount).depositEquityToken(0, 1);
      await tok.connect(otherAccount).cancelOrderByTokenOwner(0);
      const order = await tok.getOrders(0);
      const TOKEN_OWNER_CANCEL = 7;

      expect(order.currentState).to.equal(
        ethers.BigNumber.from(TOKEN_OWNER_CANCEL)
      );

      await tok.runCancelOrderByTokenOwner(0);
      await tok.cancelOrderByOwner(0);
      const orderAfterCancelByBayer = await tok.getOrders(0);
      const ORDER_OWNER_CANCEL = 6;

      expect(orderAfterCancelByBayer.currentState).to.equal(
        ethers.BigNumber.from(ORDER_OWNER_CANCEL)
      );

      await tok.runCancelOrderByOwner(0);
      const orderAfterRunCancelByBayer = await tok.getOrders(0);
      const REMOVE = 5;

      expect(orderAfterRunCancelByBayer.currentState).to.equal(
        ethers.BigNumber.from(REMOVE)
      );
    });
  });

  //Base flow
  describe("Cancel a transaction by the PPRA ", function () {
    it("Should REMOVE transaction by the PPRA", async function () {
      const { allowedList, equityToken, stableCoin, owner, tok, otherAccount } =
        await loadFixture(deployContracts);
      await allowedList.addToAllowedList(owner.address);
      await allowedList.addToAllowedList(otherAccount.address);
      await equityToken.creatItem(otherAccount.address, 1000); //equityToken
      await stableCoin.approve(tok.address, 10);
      await stableCoin.transfer(owner.address, 1000);
      await allowedList.addToAllowedList(tok.address);
      await equityToken.connect(otherAccount).approve(tok.address, 10);
      await tok.createOrder(1, equityToken.address, 1);
      await tok.connect(otherAccount).depositEquityToken(0, 1);
      await tok.runModifyOrderByPpra(0, 0);
      const orderAfterRunCancelByBayer = await tok.getOrders(0);
      const REMOVE = 5;

      expect(orderAfterRunCancelByBayer.currentState).to.equal(
        ethers.BigNumber.from(REMOVE)
      );
    });
  });

  //Base flow
  describe("Change state of a transaction by the PPRA", function () {
    it("Should change state to CREATE", async function () {
      const { allowedList, equityToken, stableCoin, owner, tok, otherAccount } =
        await loadFixture(deployContracts);
      await allowedList.addToAllowedList(owner.address);
      await allowedList.addToAllowedList(otherAccount.address);
      await equityToken.creatItem(otherAccount.address, 1000); //equityToken
      await stableCoin.approve(tok.address, 10);
      await stableCoin.transfer(owner.address, 1000);
      await allowedList.addToAllowedList(tok.address);
      await equityToken.connect(otherAccount).approve(tok.address, 10);
      await tok.createOrder(1, equityToken.address, 1);
      await tok.connect(otherAccount).depositEquityToken(0, 1);
      await tok.runModifyOrderByPpra(0, 1);
      const orderAfterRunCancelByBayer = await tok.getOrders(0);
      const CREATE = 0;

      expect(orderAfterRunCancelByBayer.currentState).to.equal(
        ethers.BigNumber.from(CREATE)
      );
    });
  });

  //Base flow
  describe("Remove order by PPRA", function () {
    it("Should change order stage to REMOVE", async function () {
      const { allowedList, equityToken, stableCoin, owner, tok, otherAccount } =
        await loadFixture(deployContracts);
      await allowedList.addToAllowedList(owner.address);
      await allowedList.addToAllowedList(otherAccount.address);
      await equityToken.creatItem(otherAccount.address, 1000); //equityToken
      await stableCoin.approve(tok.address, 10);
      await stableCoin.transfer(owner.address, 1000);
      await allowedList.addToAllowedList(tok.address);
      await equityToken.connect(otherAccount).approve(tok.address, 10);
      await tok.createOrder(1, equityToken.address, 1);
      await tok.runModifyOrderByPpra(0, 2);
      const orderAfterRunCancelByBayer = await tok.getOrders(0);
      const REMOVE = 5;

      expect(orderAfterRunCancelByBayer.currentState).to.equal(
        ethers.BigNumber.from(REMOVE)
      );
    });
  });

  //Base flow
  describe("Unlock transaction by the PPRA", function () {
    it("Should change order's stage to OWNER_APPROVE", async function () {
      const { allowedList, equityToken, stableCoin, owner, tok, otherAccount } =
      await loadFixture(deployContracts);
      await allowedList.addToAllowedList(owner.address);
      await allowedList.addToAllowedList(otherAccount.address);
      await equityToken.creatItem(otherAccount.address, 1000); //equityToken
      await stableCoin.approve(tok.address, 10);
      await stableCoin.transfer(owner.address, 1000);
      await allowedList.addToAllowedList(tok.address);
      await equityToken.connect(otherAccount).approve(tok.address, 10);
      await tok.createOrder(1, equityToken.address, 1);
      await tok.connect(otherAccount).depositEquityToken(0, 1);
      await tok.lockTransaction(0, false);
      await tok.runModifyOrderByPpra(0, 4);
      const orderAfterRunCancelByBayer = await tok.getOrders(0);
      const OWNER_APPROVE = 1;

      expect(orderAfterRunCancelByBayer.currentState).to.equal(
        ethers.BigNumber.from(OWNER_APPROVE)
      );
    });
  });
});
