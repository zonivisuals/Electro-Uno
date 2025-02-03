//SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.8;

import { ERC721URIStorage, ERC721 } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ElectroUno is ERC721URIStorage{
    uint256 private currentTokenId = 0;
    uint256 private gameId = 1;
    address public owner;
    uint256 private MAX_PLAYERS = 11;

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    constructor() ERC721("ElectroUnoToken","EUT"){
        owner = msg.sender;
    }

    //mappings
    mapping(address => bool) public isPlayer; //perm store registered players
    mapping(uint256 => address) public gameWinner; //perm store the winner of each game
    mapping(uint256 => address[]) public gamePlayers; //temp store the players of each game

    //evnets
    event playerRegistered(address indexed registeredPlayer);
    event playerJoinedGame(address indexed joinedPlayer, uint256 indexed gameId);
    event gameEnded(address indexed winner, uint256 indexed gameId, uint256 indexed tokenId);

    function mintNFT(address recepient, string memory tokenURI) public onlyOwner{
        currentTokenId ++;
        _safeMint(recepient, currentTokenId);
        _setTokenURI(currentTokenId,tokenURI);
    }

    function registerPlayer() external{
        require(!isPlayer[msg.sender],"You are already registered!");
        isPlayer[msg.sender] = true;

        emit playerRegistered(msg.sender);
    }

    function joinGame() external {
        require(isPlayer[msg.sender] == true, "You must register first!");
        require(gamePlayers[gameId].length < MAX_PLAYERS, "Max players already reached!");
        gamePlayers[gameId].push(msg.sender);

        emit playerJoinedGame(msg.sender, gameId);
    }

    function endGame(address winner, string memory tokenURI) public onlyOwner {
        require(isPlayer[winner],"winner should be registered!");
        require(gamePlayers[gameId].length > 0, "No players found on the current game!");

        mintNFT(winner, tokenURI);
        gameWinner[gameId] = winner;

        emit gameEnded(winner, gameId, currentTokenId);

        gameId++;
    }

    function getCurrentPlayers() public view returns(address[] memory){
        return gamePlayers[gameId];
    }

    function getGameDetails(uint256 id) public view returns(address winner, address[] memory players){
        require(id < gameId, "Invalid game ID!");
        winner = gameWinner[gameId];
        players = gamePlayers[gameId];
    }

}