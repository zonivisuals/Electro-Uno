/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  ElectroUno,
  ElectroUnoInterface,
} from "../../contracts/ElectroUno";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "gameEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "joinedPlayer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "playerJoinedGame",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "registeredPlayer",
        type: "address",
      },
    ],
    name: "playerRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "endGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gamePlayers",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gameWinner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentPlayers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getGameDetails",
    outputs: [
      {
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "players",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isPlayer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "joinGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recepient",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mintNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registerPlayer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260006007556001600855600b600a5534801561001f57600080fd5b506040518060400160405280600f81526020016e22b632b1ba3937aab737aa37b5b2b760891b8152506040518060400160405280600381526020016211555560ea1b81525081600090816100739190610139565b5060016100808282610139565b5050600980546001600160a01b03191633179055506101f7565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806100c457607f821691505b6020821081036100e457634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561013457806000526020600020601f840160051c810160208510156101115750805b601f840160051c820191505b81811015610131576000815560010161011d565b50505b505050565b81516001600160401b038111156101525761015261009a565b6101668161016084546100b0565b846100ea565b6020601f82116001811461019a57600083156101825750848201515b600019600385901b1c1916600184901b178455610131565b600084815260208120601f198516915b828110156101ca57878501518255602094850194600190920191016101aa565b50848210156101e85786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b611987806102066000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c80636352211e116100c3578063c87b56dd1161007c578063c87b56dd146102f4578063d4f77b1c14610307578063dfa987a21461030f578063dfefef9f14610322578063e985e9c514610335578063eacabe141461034857600080fd5b80636352211e1461027f57806370a08231146102925780638da5cb5b146102b357806395d89b41146102c6578063a22cb465146102ce578063b88d4fde146102e157600080fd5b8063095ea7b311610115578063095ea7b3146101f857806309c95e101461020d5780631b31abda1461023057806323b872dd1461025157806342842e0e146102645780635c07a4b01461027757600080fd5b806301ffc9a71461015257806302cac05c1461017a578063047913091461018f57806306fdde03146101d0578063081812fc146101e5575b600080fd5b6101656101603660046113af565b61035b565b60405190151581526020015b60405180910390f35b610182610386565b6040516101719190611411565b6101b861019d366004611424565b600c602052600090815260409020546001600160a01b031681565b6040516001600160a01b039091168152602001610171565b6101d86103f3565b604051610171919061148d565b6101b86101f3366004611424565b61047c565b61020b6102063660046114bc565b6104a5565b005b61016561021b3660046114e6565b600b6020526000908152604090205460ff1681565b61024361023e366004611424565b6104b4565b604051610171929190611501565b61020b61025f366004611525565b610585565b61020b610272366004611525565b610610565b61020b610630565b6101b861028d366004611424565b6106d2565b6102a56102a03660046114e6565b6106dd565b604051908152602001610171565b6009546101b8906001600160a01b031681565b6101d8610725565b61020b6102dc366004611562565b610734565b61020b6102ef36600461162e565b61073f565b6101d8610302366004611424565b610757565b61020b610868565b61020b61031d3660046116aa565b610993565b6101b861033036600461170c565b610aff565b61016561034336600461172e565b610b37565b61020b6103563660046116aa565b610b65565b60006001600160e01b03198216632483248360e11b1480610380575061038082610ba9565b92915050565b6008546000908152600d60209081526040918290208054835181840281018401909452808452606093928301828280156103e957602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116103cb575b5050505050905090565b60606000805461040290611761565b80601f016020809104026020016040519081016040528092919081815260200182805461042e90611761565b80156103e95780601f10610450576101008083540402835291602001916103e9565b820191906000526020600020905b81548152906001019060200180831161045e57509395945050505050565b600061048782610bf9565b506000828152600460205260409020546001600160a01b0316610380565b6104b0828233610c32565b5050565b6000606060085483106105015760405162461bcd60e51b815260206004820152601060248201526f496e76616c69642067616d652049442160801b60448201526064015b60405180910390fd5b6008546000908152600c6020908152604080832054600d83529281902080548251818502810185019093528083526001600160a01b0390941695509092909183018282801561057957602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161055b575b50505050509050915091565b6001600160a01b0382166105af57604051633250574960e11b8152600060048201526024016104f8565b60006105bc838333610c3f565b9050836001600160a01b0316816001600160a01b03161461060a576040516364283d7b60e01b81526001600160a01b03808616600483015260248201849052821660448201526064016104f8565b50505050565b61062b8383836040518060200160405280600081525061073f565b505050565b336000908152600b602052604090205460ff16156106905760405162461bcd60e51b815260206004820152601b60248201527f596f752061726520616c7265616479207265676973746572656421000000000060448201526064016104f8565b336000818152600b6020526040808220805460ff19166001179055517f9b66d49082843aa418cd502edc3b870cda1cef5aa3c1e289ca61475532afd3569190a2565b600061038082610bf9565b60006001600160a01b038216610709576040516322718ad960e21b8152600060048201526024016104f8565b506001600160a01b031660009081526003602052604090205490565b60606001805461040290611761565b6104b0338383610d38565b61074a848484610585565b61060a3385858585610dd7565b606061076282610bf9565b506000828152600660205260408120805461077c90611761565b80601f01602080910402602001604051908101604052809291908181526020018280546107a890611761565b80156107f55780601f106107ca576101008083540402835291602001916107f5565b820191906000526020600020905b8154815290600101906020018083116107d857829003601f168201915b50505050509050600061081360408051602081019091526000815290565b90508051600003610825575092915050565b81511561085757808260405160200161083f92919061179b565b60405160208183030381529060405292505050919050565b61086084610f02565b949350505050565b336000908152600b602052604090205460ff1615156001146108cc5760405162461bcd60e51b815260206004820152601860248201527f596f75206d75737420726567697374657220666972737421000000000000000060448201526064016104f8565b600a546008546000908152600d60205260409020541061092e5760405162461bcd60e51b815260206004820152601c60248201527f4d617820706c617965727320616c72656164792072656163686564210000000060448201526064016104f8565b600880546000908152600d60209081526040808320805460018101825590845291832090910180546001600160a01b03191633908117909155925490519092917f037e2f1ec15c5b05db19030cd9b1d29b63af664039badf86ef688551d5dec58091a3565b6009546001600160a01b031633146109aa57600080fd5b6001600160a01b0382166000908152600b602052604090205460ff16610a125760405162461bcd60e51b815260206004820152601c60248201527f77696e6e65722073686f756c642062652072656769737465726564210000000060448201526064016104f8565b6008546000908152600d6020526040902054610a7e5760405162461bcd60e51b815260206004820152602560248201527f4e6f20706c617965727320666f756e64206f6e207468652063757272656e742060448201526467616d652160d81b60648201526084016104f8565b610a888282610b65565b600880546000908152600c602052604080822080546001600160a01b0319166001600160a01b03871690811790915560075493549151919290917f9a6a6b8cee91741356cc7da176fdb3aecda5c15bac35d26e6ee28aaab5e784fc9190a460088054906000610af6836117ca565b91905055505050565b600d6020528160005260406000208181548110610b1b57600080fd5b6000918252602090912001546001600160a01b03169150829050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6009546001600160a01b03163314610b7c57600080fd5b60078054906000610b8c836117ca565b9190505550610b9d82600754610f77565b6104b060075482610f91565b60006001600160e01b031982166380ac58cd60e01b1480610bda57506001600160e01b03198216635b5e139f60e01b145b8061038057506301ffc9a760e01b6001600160e01b0319831614610380565b6000818152600260205260408120546001600160a01b03168061038057604051637e27328960e01b8152600481018490526024016104f8565b61062b8383836001610fe1565b6000828152600260205260408120546001600160a01b0390811690831615610c6c57610c6c8184866110e7565b6001600160a01b03811615610caa57610c89600085600080610fe1565b6001600160a01b038116600090815260036020526040902080546000190190555b6001600160a01b03851615610cd9576001600160a01b0385166000908152600360205260409020805460010190555b60008481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b6001600160a01b038216610d6a57604051630b61174360e31b81526001600160a01b03831660048201526024016104f8565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b15610efb57604051630a85bd0160e11b81526001600160a01b0384169063150b7a0290610e199088908890879087906004016117f1565b6020604051808303816000875af1925050508015610e54575060408051601f3d908101601f19168201909252610e519181019061182e565b60015b610ebd573d808015610e82576040519150601f19603f3d011682016040523d82523d6000602084013e610e87565b606091505b508051600003610eb557604051633250574960e11b81526001600160a01b03851660048201526024016104f8565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b14610ef957604051633250574960e11b81526001600160a01b03851660048201526024016104f8565b505b5050505050565b6060610f0d82610bf9565b506000610f2560408051602081019091526000815290565b90506000815111610f455760405180602001604052806000815250610f70565b80610f4f8461114b565b604051602001610f6092919061179b565b6040516020818303038152906040525b9392505050565b6104b08282604051806020016040528060008152506111de565b6000828152600660205260409020610fa98282611892565b506040518281527ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce79060200160405180910390a15050565b8080610ff557506001600160a01b03821615155b156110b757600061100584610bf9565b90506001600160a01b038316158015906110315750826001600160a01b0316816001600160a01b031614155b801561104457506110428184610b37565b155b1561106d5760405163a9fbf51f60e01b81526001600160a01b03841660048201526024016104f8565b81156110b55783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b5050600090815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b6110f28383836111f6565b61062b576001600160a01b03831661112057604051637e27328960e01b8152600481018290526024016104f8565b60405163177e802f60e01b81526001600160a01b0383166004820152602481018290526044016104f8565b6060600061115883611259565b600101905060008167ffffffffffffffff8111156111785761117861159e565b6040519080825280601f01601f1916602001820160405280156111a2576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846111ac57509392505050565b6111e88383611331565b61062b336000858585610dd7565b60006001600160a01b038316158015906108605750826001600160a01b0316846001600160a01b0316148061123057506112308484610b37565b806108605750506000908152600460205260409020546001600160a01b03908116911614919050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106112985772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef810000000083106112c4576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc1000083106112e257662386f26fc10000830492506010015b6305f5e10083106112fa576305f5e100830492506008015b612710831061130e57612710830492506004015b60648310611320576064830492506002015b600a83106103805760010192915050565b6001600160a01b03821661135b57604051633250574960e11b8152600060048201526024016104f8565b600061136983836000610c3f565b90506001600160a01b0381161561062b576040516339e3563760e11b8152600060048201526024016104f8565b6001600160e01b0319811681146113ac57600080fd5b50565b6000602082840312156113c157600080fd5b8135610f7081611396565b600081518084526020840193506020830160005b828110156114075781516001600160a01b03168652602095860195909101906001016113e0565b5093949350505050565b602081526000610f7060208301846113cc565b60006020828403121561143657600080fd5b5035919050565b60005b83811015611458578181015183820152602001611440565b50506000910152565b6000815180845261147981602086016020860161143d565b601f01601f19169290920160200192915050565b602081526000610f706020830184611461565b80356001600160a01b03811681146114b757600080fd5b919050565b600080604083850312156114cf57600080fd5b6114d8836114a0565b946020939093013593505050565b6000602082840312156114f857600080fd5b610f70826114a0565b6001600160a01b0383168152604060208201819052600090610860908301846113cc565b60008060006060848603121561153a57600080fd5b611543846114a0565b9250611551602085016114a0565b929592945050506040919091013590565b6000806040838503121561157557600080fd5b61157e836114a0565b91506020830135801515811461159357600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008067ffffffffffffffff8411156115cf576115cf61159e565b50604051601f19601f85018116603f0116810181811067ffffffffffffffff821117156115fe576115fe61159e565b60405283815290508082840185101561161657600080fd5b83836020830137600060208583010152509392505050565b6000806000806080858703121561164457600080fd5b61164d856114a0565b935061165b602086016114a0565b925060408501359150606085013567ffffffffffffffff81111561167e57600080fd5b8501601f8101871361168f57600080fd5b61169e878235602084016115b4565b91505092959194509250565b600080604083850312156116bd57600080fd5b6116c6836114a0565b9150602083013567ffffffffffffffff8111156116e257600080fd5b8301601f810185136116f357600080fd5b611702858235602084016115b4565b9150509250929050565b6000806040838503121561171f57600080fd5b50508035926020909101359150565b6000806040838503121561174157600080fd5b61174a836114a0565b9150611758602084016114a0565b90509250929050565b600181811c9082168061177557607f821691505b60208210810361179557634e487b7160e01b600052602260045260246000fd5b50919050565b600083516117ad81846020880161143d565b8351908301906117c181836020880161143d565b01949350505050565b6000600182016117ea57634e487b7160e01b600052601160045260246000fd5b5060010190565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061182490830184611461565b9695505050505050565b60006020828403121561184057600080fd5b8151610f7081611396565b601f82111561062b57806000526020600020601f840160051c810160208510156118725750805b601f840160051c820191505b81811015610efb576000815560010161187e565b815167ffffffffffffffff8111156118ac576118ac61159e565b6118c0816118ba8454611761565b8461184b565b6020601f8211600181146118f457600083156118dc5750848201515b600019600385901b1c1916600184901b178455610efb565b600084815260208120601f198516915b828110156119245787850151825560209485019460019092019101611904565b50848210156119425786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea2646970667358221220f7b0617782b0a3282019129bbfddb6998f0a30256b5c01a5912e1e3c048320dc64736f6c634300081c0033";

type ElectroUnoConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ElectroUnoConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ElectroUno__factory extends ContractFactory {
  constructor(...args: ElectroUnoConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      ElectroUno & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ElectroUno__factory {
    return super.connect(runner) as ElectroUno__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ElectroUnoInterface {
    return new Interface(_abi) as ElectroUnoInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ElectroUno {
    return new Contract(address, _abi, runner) as unknown as ElectroUno;
  }
}
