import { ethers, run, network } from "hardhat";

async function main() {
    const simpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying Contract..");
    const simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.getDeployedCode();
    const address = await simpleStorage.getAddress();
    console.log(`Deployed Conctract to ${address}`);
    if (network.config.chainId === 11155111 && process.env.EHTERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...");
        await simpleStorage.deploymentTransaction()?.wait(6);
        await verify(address, []);
    }
    const currentValue = await simpleStorage.retrieve();
    console.log("currentValue " + currentValue);

    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log("updated value " + updatedValue);
}

async function verify(contractAddress: string, args: any[]) {
    console.log("verifiny contract....");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error: any) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified");
        } else {
            console.log(error);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
