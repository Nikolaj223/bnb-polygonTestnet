import { ethers, network } from "hardhat";

async function main() {
    const networkName = network.name;
    console.log(`Deploying to network: ${networkName}`);

    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.waitForDeployment();
    const tokenAddress = await simpleStorage.getAddress();
    console.log(`SimpleStorage token deployed to: ${tokenAddress}`);

    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy(tokenAddress);
    await bridge.waitForDeployment();
    const bridgeAddress = await bridge.getAddress();
    console.log(`Bridge contract deployed to: ${bridgeAddress}`);

    const amountToDeposit = ethers.parseEther("100"); // Сумма для перевода

    // Получаем signer (аккаунт)
    const [deployer] = await ethers.getSigners();
    const simpleStorageSigner = simpleStorage.connect(deployer);

    // Сминтить токены на адрес контракта SimpleStorage
    const mintTx = await simpleStorageSigner.mint(tokenAddress, amountToDeposit); // Сминтить на контракт
    await mintTx.wait();
    console.log(`Minted ${amountToDeposit} tokens to SimpleStorage contract`);

    const depositTx = await simpleStorageSigner.transferTo(bridgeAddress, amountToDeposit);
    await depositTx.wait();
    console.log(`Contract SimpleStorage deposited ${amountToDeposit} tokens to bridge`);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});









// import { ethers } from "hardhat";

// async function main() {
//   const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
//   const simpleStorage = await SimpleStorage.deploy();

//   await simpleStorage.waitForDeployment();

//   console.log("SimpleStorage deployed to:", simpleStorage.target);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });