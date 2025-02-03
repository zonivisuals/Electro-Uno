import {ethers} from 'hardhat';

const deployContract = async()=>{
    //get the contract to deploy
    const contractToDeploy = await ethers.getContractFactory("ElectroUno");

    //deploy the contract
    const deployedContract = await contractToDeploy.deploy()

    //wait for deployment
    await deployedContract.waitForDeployment()

    console.log("contract deployed to the address: ", await deployedContract.getAddress())
}

deployContract()
    .then(()=>{
        process.exit(0)
    })
    .catch((error)=>{
        console.error(error)
        process.exit(1)
    })

module.exports = { deployContract };