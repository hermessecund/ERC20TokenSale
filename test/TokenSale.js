const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");


describe("TokenSale", function () {

  let provider = ethers.getDefaultProvider();

  async function deploy() {
    const [owner, otherAccount] = await ethers.getSigners();
    const TokenSale = await ethers.getContractFactory("TokenSale");
    const tokenSale = await TokenSale.deploy();
    return { tokenSale, owner, otherAccount };
  }

  it("Should fail if tokens to be minted exceed cap", async function () {
    const { tokenSale, owner, otherAccount } = await loadFixture(deploy);
    await expect(tokenSale.mint({ value: ethers.utils.parseEther("1001") }
    )).to.be.reverted;
  });

  it("Should fail if the withdrawToOwner method is called by anyone but the owner", async function () {
    const { tokenSale, owner, otherAccount } = await loadFixture(deploy);
    await expect(tokenSale.connect(otherAccount).withdrawToOwner()).to.be.reverted;
  });

  it("Should allow the owner to withdraw all the funds", async function () {
    const { tokenSale, owner, otherAccount } = await loadFixture(deploy);
    await expect(tokenSale.withdrawToOwner()).not.to.be.reverted;
  });



});
