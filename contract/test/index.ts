import {expect} from "chai";
import {ethers} from "hardhat";
import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/src/signers"
require("dotenv").config()
import {configDotenv} from "dotenv";

configDotenv();

describe("testing ElectroUno contract",()=>{
    const TOKEN_URI = "https://token-test.uri"
    let eutContract: any;
    let signers: HardhatEthersSigner[]

    //deploy the contract before each test
    beforeEach(async()=>{
        const contractToDeploy = await ethers.getContractFactory("ElectroUno");
        eutContract = await contractToDeploy.deploy()
        await eutContract.deployed;
        await eutContract.waitForDeployment();
        signers = await ethers.getSigners(); 
    })

    //mint nft
    const mintNFT = async(tokenURI: string)=>{
        const minterAddress = signers[0].getAddress()
        const transaction = await eutContract.mintNFT(minterAddress, TOKEN_URI)
        const receipt = await transaction.wait()
        //retrieve nftoken id
        const transferEvent = receipt?.logs
            .map((log: any) => eutContract.interface.parseLog(log))
            .find((parsedLog: any) => parsedLog.name === "Transfer");
        const tokenId = transferEvent?.args.tokenId;
        return tokenId 
    }

    describe("Mint NFT",()=>{
        it("should create nft with the correct owner and token uri",async()=>{
            const tokenId = await mintNFT(TOKEN_URI)
            const mintedTokenURI = await eutContract.tokenURI(tokenId)
            
            //assert the same correct metadata
            expect(mintedTokenURI).to.equal(TOKEN_URI)

            const ownerAddress = await eutContract.ownerOf(tokenId)
            const currentAddress = await signers[0].getAddress()

            //assert the correct owner
            expect(currentAddress).to.equal(ownerAddress)
        })
    })

    describe("Register Players",()=>{
        it("should register a player only once and persist accross the games",async()=>{
            await eutContract.registerPlayer()
            const registeredPlayerAddress = signers[0].address

            //assert player is registered successfully
            expect(await eutContract.isPlayer(registeredPlayerAddress)).is.equal(true)
            
            //revert when same player re-register
            await expect(eutContract.registerPlayer()).to.be.revertedWith("You are already registered!")
        })
    })

    describe("Joining a Game",()=>{
        it("should allow registered players to join the game",async()=>{
            await eutContract.registerPlayer()
            await eutContract.joinGame()
            const currentPlayer = signers[0].address
            const players = await eutContract.getCurrentPlayers()

            expect(players[0]).to.equal(currentPlayer)
        })

        it("should not allow unregistered players to join the game",async()=>{
            await expect(eutContract.joinGame()).to.be.revertedWith("You must register first!")
            
            const players = await eutContract.getCurrentPlayers()
            expect(players.length).to.equal(0)
        })

        it("should not allow more than MAXPLAYERS to join the game",async()=>{
            for(let i=0; i<11; i++){
                await eutContract.connect(signers[i]).registerPlayer()
                await eutContract.connect(signers[i]).joinGame()
            }

            await eutContract.connect(signers[11]).registerPlayer()
            await expect(eutContract.connect(signers[11]).joinGame()).to.be.revertedWith("Max players already reached!")
        })
    })

    describe("Ending a Game",()=>{
        it("should allow the winner to end the game and mint an nft",async()=>{
            await eutContract.registerPlayer()
            await eutContract.joinGame()
            
            const winner = signers[0].address
            await eutContract.endGame(winner, TOKEN_URI)
            
            const tokenId = 1 //assuming as first nft
            const owner = await eutContract.ownerOf(tokenId)
            expect(owner).to.equal(winner)

            const gameWinner = await eutContract.gameWinner(1) //first game by default
            expect(gameWinner).to.equal(winner)
        })
    })
})