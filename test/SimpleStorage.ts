import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleStorage", function () {
  it("Should initialize with a default value of 0", async function () {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorageFactory.deploy();

    await simpleStorage.waitForDeployment();

    const storedData = await simpleStorage.storedData(); // получение данных через переменную
    expect(storedData).to.equal(0);
  });

  it("Should set and get the stored data correctly", async function () {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorageFactory.deploy();

    await simpleStorage.waitForDeployment();

    const newValue = 123;
    const tx = await simpleStorage.set(newValue);
    await tx.wait();

    const storedData = await simpleStorage.storedData(); // получение данных через переменную
    expect(storedData).to.equal(newValue);
  });
});

