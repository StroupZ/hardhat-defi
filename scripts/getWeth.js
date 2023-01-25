const { getNamedAccounts, ethers, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

const AMOUNT = ethers.utils.parseEther("0.02")

async function getWeth() {
    const { deployer } = await getNamedAccounts()
    // 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2 weth mainnet contract address
    // abi is pulled from IWeth
    const iWeth = await ethers.getContractAt(
        "IWeth",
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        deployer
    )
    const tx = await iWeth.deposit({ value: AMOUNT })
    await tx.wait(1)
    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`Got ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth, AMOUNT }
