const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", () => {
    let simpleStorageFactory, simpleStorage;
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });
    it("it should test with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = 0;
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("it should update when we call store", async function () {
        const expectedValue = 7;
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });

    // it("it should add person and a favorite number", async function () {
    //     const expectedValue = [{ name: "Paul", favoriteNumber: 9 }];
    //     const transactionResponse = await simpleStorage.addPerson("Paul", 9);

    //     await transactionResponse.wait(1);

    //     const currentValue = simpleStorage.people;

    //     assert.equal(currentValue, expectedValue);
    // });
});
