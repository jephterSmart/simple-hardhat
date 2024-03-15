const {ethers, run, network } = require("hardhat")

async function main(){
    const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
    const SimpleStorage = await SimpleStorageFactory.deploy()
    const SimpleStorageRec = await SimpleStorage.deploymentTransaction().wait(1)
    if(network.config.chainId === 4 && process.env.ETHERSCAN_PRIVATE_KEY){
        await verify(await SimpleStorageRec.getAddress(),[])
    }
    let currentValue = await SimpleStorage.retrieve()
    const storeRes = await SimpleStorage.store(15)
    await storeRes.wait()
    currentValue = await SimpleStorage.retrieve()
    console.log(currentValue)
}

async function verify(contractAddress, args) {
    try {
        await run('verify:verify', {address: contractAddress, constructorArguments: args})
    } catch (error) {
        if(error.message.toLowerCase().contain('already verified')  ){
            console.log('Already verified')
        }else{
            console.error(error)
        }
    }
}
main().then(() => process.exit(0)).catch(() => process.exit(1))