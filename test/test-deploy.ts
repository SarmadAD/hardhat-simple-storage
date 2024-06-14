import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", () => {
    let SimpleStorageFactory: SimpleStorage__factory;
    let simpleStorage: SimpleStorage;
    beforeEach(async () => {
        SimpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage",
        )) as unknown as SimpleStorage__factory;
        simpleStorage = await SimpleStorageFactory.deploy();
    });
    it("it should test with a favorite number of 0", async function () {
        let currentValue = await simpleStorage.retrieve();
        expect(currentValue).to.equal(0);
    });

    it("it should update when we call store", async function () {
        let expectedValue = 7;
        let transactionResponse = await simpleStorage.store(expectedValue);
        let transactionReceipt = await transactionResponse.wait();
        let currentValue = await simpleStorage.retrieve();
        expect(currentValue).to.equal(expectedValue);
    });
});
