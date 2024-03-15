const { ethers } = require("hardhat")
const {expect} = require('chai')
describe('SimpleStorage', () => {
    let factory, contract
    beforeEach(async() => {
        factory = await ethers.getContractFactory('SimpleStorage')
        contract = await factory.deploy()
        await contract.deploymentTransaction().wait(1)
    })

    it("returns 0 when retrieve() is called the first time ", async () => {
        const result = await contract.retrieve()
        expect(result.toString()).to.equal("0")
    })

    it('that after storing value to contract, we should the same result', async() => {
        const expectedRes = "15"
        const response = await contract.store(expectedRes)
        await response.wait(1)
        const result = await contract.retrieve()
        expect(result.toString()).to.equal(expectedRes)
    })
})