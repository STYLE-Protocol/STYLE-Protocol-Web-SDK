import axios from "axios";
import Web3 from "web3";
import { BigNumber } from "ethers";

const NFTMarketplace_metadata = {
  compiler: {
    version: "0.8.17+commit.8df45f5f",
  },
  language: "Solidity",
  output: {
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "style_",
            type: "address",
          },
          {
            internalType: "address",
            name: "stable_",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "weth_",
            type: "address",
          },
          {
            internalType: "address",
            name: "dclAdmin_",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "DCLLot",
        type: "error",
      },
      {
        inputs: [],
        name: "DerivativesDisallowed",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "admin",
            type: "address",
          },
        ],
        name: "DisallowedAdmin",
        type: "error",
      },
      {
        inputs: [],
        name: "DisallowedModelId",
        type: "error",
      },
      {
        inputs: [],
        name: "ImproperItemStatus",
        type: "error",
      },
      {
        inputs: [],
        name: "ImproperMetaverseIds",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenAddress",
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
        name: "ImproperOwnerOfStake",
        type: "error",
      },
      {
        inputs: [],
        name: "ImproperRoyalties",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "recoveredAdmin",
            type: "address",
          },
        ],
        name: "ImproperSignature",
        type: "error",
      },
      {
        inputs: [],
        name: "ImproperTailorFee",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
        ],
        name: "InsufficientFunds",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "LackOfDerivatives",
        type: "error",
      },
      {
        inputs: [],
        name: "MetaverseIdAlreadyClaimed",
        type: "error",
      },
      {
        inputs: [],
        name: "NoSuchListing",
        type: "error",
      },
      {
        inputs: [],
        name: "NotAdmin",
        type: "error",
      },
      {
        inputs: [],
        name: "NotBridgeRouter",
        type: "error",
      },
      {
        inputs: [],
        name: "NotContractOwner",
        type: "error",
      },
      {
        inputs: [],
        name: "NotDCLLot",
        type: "error",
      },
      {
        inputs: [],
        name: "NotDerivative",
        type: "error",
      },
      {
        inputs: [],
        name: "NotEnoughtSTYLETokens",
        type: "error",
      },
      {
        inputs: [],
        name: "NotOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "payment",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "paymentToken",
            type: "address",
          },
        ],
        name: "PriceNotMet",
        type: "error",
      },
      {
        inputs: [],
        name: "SameERC1155AlreadyStaked",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "bytes",
            name: "adminSignature",
            type: "bytes",
          },
        ],
        name: "DCLInit",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "contract_",
            type: "address",
          },
        ],
        name: "GenerationMint",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            indexed: true,
            internalType: "address",
            name: "redeemer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint96",
            name: "metaverseId",
            type: "uint96",
          },
        ],
        name: "ItemBuyAndMint",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            indexed: true,
            internalType: "address",
            name: "redeemer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint96",
            name: "metaverseId",
            type: "uint96",
          },
        ],
        name: "ItemClaimSingular",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "redeemer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "contract_",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "voucherURI",
            type: "string",
          },
        ],
        name: "NFTMint",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "signer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "redeemer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "contract_",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "voucherURI",
            type: "string",
          },
        ],
        name: "NFTRedeem",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
        ],
        name: "Staked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
        ],
        name: "Unstaked",
        type: "event",
      },
      {
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "admin",
            type: "address",
          },
        ],
        name: "addAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "redeemer",
                type: "address",
              },
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "tokenId",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "payment",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "tokenAddress",
                    type: "address",
                  },
                  {
                    internalType: "uint96",
                    name: "metaverseId",
                    type: "uint96",
                  },
                  {
                    internalType: "address",
                    name: "paymentToken",
                    type: "address",
                  },
                  {
                    internalType: "uint88",
                    name: "modelId",
                    type: "uint88",
                  },
                  {
                    internalType: "address",
                    name: "bidder",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "environment",
                    type: "address",
                  },
                  {
                    internalType: "string",
                    name: "uri",
                    type: "string",
                  },
                  {
                    internalType: "bytes",
                    name: "signature",
                    type: "bytes",
                  },
                ],
                internalType: "struct ILazyMintingStructs.NonmintedNFT",
                name: "nonmintedNFT",
                type: "tuple",
              },
              {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
              },
            ],
            internalType: "struct INFTMarketplaceStructs.RequstedData[]",
            name: "requestedDataArr",
            type: "tuple[]",
          },
        ],
        name: "batchBuy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "redeemer",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "payment",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
              {
                internalType: "uint96",
                name: "metaverseId",
                type: "uint96",
              },
              {
                internalType: "address",
                name: "paymentToken",
                type: "address",
              },
              {
                internalType: "uint88",
                name: "modelId",
                type: "uint88",
              },
              {
                internalType: "address",
                name: "bidder",
                type: "address",
              },
              {
                internalType: "address",
                name: "environment",
                type: "address",
              },
              {
                internalType: "string",
                name: "uri",
                type: "string",
              },
              {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
              },
            ],
            internalType: "struct ILazyMintingStructs.NonmintedNFT",
            name: "nonmintedNFT",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "buyAndMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "redeemer",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "payment",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
              {
                internalType: "uint96",
                name: "metaverseId",
                type: "uint96",
              },
              {
                internalType: "address",
                name: "paymentToken",
                type: "address",
              },
              {
                internalType: "uint88",
                name: "modelId",
                type: "uint88",
              },
              {
                internalType: "address",
                name: "bidder",
                type: "address",
              },
              {
                internalType: "address",
                name: "environment",
                type: "address",
              },
              {
                internalType: "string",
                name: "uri",
                type: "string",
              },
              {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
              },
            ],
            internalType: "struct ILazyMintingStructs.NonmintedNFT",
            name: "nonmintedNFT",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "DCLSignature",
            type: "bytes",
          },
        ],
        name: "buyDCL",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
              {
                internalType: "uint96",
                name: "metaverseId",
                type: "uint96",
              },
              {
                internalType: "address",
                name: "bidder",
                type: "address",
              },
              {
                internalType: "uint88",
                name: "modelId",
                type: "uint88",
              },
              {
                internalType: "string",
                name: "uri",
                type: "string",
              },
              {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
              },
            ],
            internalType: "struct ILazyMintingStructs.NonmintedNFTSingular",
            name: "nonmintedNFT",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        name: "claimSingularNFT",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
              {
                internalType: "uint96",
                name: "metaverseId",
                type: "uint96",
              },
              {
                internalType: "address",
                name: "bidder",
                type: "address",
              },
              {
                internalType: "uint88",
                name: "modelId",
                type: "uint88",
              },
              {
                internalType: "string",
                name: "uri",
                type: "string",
              },
              {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
              },
            ],
            internalType: "struct ILazyMintingStructs.NonmintedNFTSingular",
            name: "nonmintedNFT",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "DCLSignature",
            type: "bytes",
          },
        ],
        name: "claimSingularNFTDCL",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "cursor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "howMany",
            type: "uint256",
          },
        ],
        name: "getAdmins",
        outputs: [
          {
            internalType: "address[]",
            name: "admins",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "newCursor",
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
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getAncestor",
        outputs: [
          {
            internalType: "address",
            name: "ancestor",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "cutSignature",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "redeemer",
            type: "address",
          },
        ],
        name: "getDCLBought",
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
            internalType: "bytes32[]",
            name: "cutSignatures",
            type: "bytes32[]",
          },
        ],
        name: "getIfSignsProceeded",
        outputs: [
          {
            internalType: "bool[]",
            name: "result",
            type: "bool[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "cutSignature",
            type: "bytes32",
          },
        ],
        name: "getLotInfo",
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
        name: "getOwner",
        outputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getStake",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
              {
                internalType: "uint96",
                name: "numberOfDerivatives",
                type: "uint96",
              },
              {
                internalType: "address",
                name: "stakeOwner",
                type: "address",
              },
              {
                internalType: "uint88",
                name: "modelId",
                type: "uint88",
              },
              {
                internalType: "bool",
                name: "isERC1155",
                type: "bool",
              },
            ],
            internalType: "struct IStakingStructs.Stake",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getStakeSingular",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "tailorFee",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
              {
                internalType: "uint88",
                name: "modelId",
                type: "uint88",
              },
              {
                internalType: "bool",
                name: "isERC1155",
                type: "bool",
              },
              {
                internalType: "address",
                name: "stakeOwner",
                type: "address",
              },
              {
                internalType: "uint96[]",
                name: "metaverseIds",
                type: "uint96[]",
              },
            ],
            internalType: "struct IStakingStructs.StakeSingular",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "cursor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "howMany",
            type: "uint256",
          },
        ],
        name: "getStakes",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
              {
                internalType: "uint96",
                name: "numberOfDerivatives",
                type: "uint96",
              },
              {
                internalType: "address",
                name: "stakeOwner",
                type: "address",
              },
              {
                internalType: "uint88",
                name: "modelId",
                type: "uint88",
              },
              {
                internalType: "bool",
                name: "isERC1155",
                type: "bool",
              },
            ],
            internalType: "struct IStakingStructs.Stake[]",
            name: "stakes",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "newCursor",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "cursor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "howMany",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "getStakesByOwner",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
              {
                internalType: "uint96",
                name: "numberOfDerivatives",
                type: "uint96",
              },
              {
                internalType: "address",
                name: "stakeOwner",
                type: "address",
              },
              {
                internalType: "uint88",
                name: "modelId",
                type: "uint88",
              },
              {
                internalType: "bool",
                name: "isERC1155",
                type: "bool",
              },
            ],
            internalType: "struct IStakingStructs.Stake[]",
            name: "stakes",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "newCursor",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "cursor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "howMany",
            type: "uint256",
          },
        ],
        name: "getStakesSingular",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "tailorFee",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
              {
                internalType: "uint88",
                name: "modelId",
                type: "uint88",
              },
              {
                internalType: "bool",
                name: "isERC1155",
                type: "bool",
              },
              {
                internalType: "address",
                name: "stakeOwner",
                type: "address",
              },
              {
                internalType: "uint96[]",
                name: "metaverseIds",
                type: "uint96[]",
              },
            ],
            internalType: "struct IStakingStructs.StakeSingular[]",
            name: "stakes",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "newCursor",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "cursor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "howMany",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "getStakesSingularByOwner",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "tailorFee",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
              },
              {
                internalType: "uint88",
                name: "modelId",
                type: "uint88",
              },
              {
                internalType: "bool",
                name: "isERC1155",
                type: "bool",
              },
              {
                internalType: "address",
                name: "stakeOwner",
                type: "address",
              },
              {
                internalType: "uint96[]",
                name: "metaverseIds",
                type: "uint96[]",
              },
            ],
            internalType: "struct IStakingStructs.StakeSingular[]",
            name: "stakes",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "newCursor",
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
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getTailor",
        outputs: [
          {
            internalType: "address",
            name: "tailor",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "contract_",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
        ],
        name: "isDerivative",
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
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "redeemer",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "metaverseId",
            type: "uint96",
          },
          {
            internalType: "uint88",
            name: "modelId",
            type: "uint88",
          },
          {
            internalType: "string",
            name: "tokenURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "tokenURI",
            type: "string",
          },
          {
            internalType: "uint88",
            name: "modelId",
            type: "uint88",
          },
          {
            internalType: "uint96",
            name: "numberOfDerivatives",
            type: "uint96",
          },
          {
            components: [
              {
                internalType: "uint16",
                name: "environmentRoyaltyPercent",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "stakeOwnerRoyaltyPercent",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "tailorRoyaltyStable",
                type: "uint80",
              },
              {
                internalType: "uint16",
                name: "tailorRoyaltyPercent",
                type: "uint16",
              },
            ],
            internalType: "struct IStakingStructs.Royalties",
            name: "royalties_",
            type: "tuple",
          },
        ],
        name: "mintGenerationAndStake",
        outputs: [
          {
            internalType: "address",
            name: "clone",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "tokenURI",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tailorFee",
            type: "uint256",
          },
          {
            internalType: "uint88",
            name: "modelId",
            type: "uint88",
          },
          {
            internalType: "uint96[]",
            name: "metaverseIds",
            type: "uint96[]",
          },
          {
            internalType: "address payable",
            name: "paymentToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "paymentAmount",
            type: "uint256",
          },
        ],
        name: "mintGenerationAndStakeSingular",
        outputs: [
          {
            internalType: "address",
            name: "clone",
            type: "address",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "",
            type: "uint256[]",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC1155BatchReceived",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
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
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC1155Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "onERC721Received",
        outputs: [
          {
            internalType: "bytes4",
            name: "",
            type: "bytes4",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "admin",
            type: "address",
          },
        ],
        name: "removeAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "dclAdmin_",
            type: "address",
          },
        ],
        name: "setDCLAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint88",
            name: "modelId",
            type: "uint88",
          },
          {
            internalType: "uint96",
            name: "numberOfDerivatives",
            type: "uint96",
          },
          {
            components: [
              {
                internalType: "uint16",
                name: "environmentRoyaltyPercent",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "stakeOwnerRoyaltyPercent",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "tailorRoyaltyStable",
                type: "uint80",
              },
              {
                internalType: "uint16",
                name: "tailorRoyaltyPercent",
                type: "uint16",
              },
            ],
            internalType: "struct IStakingStructs.Royalties",
            name: "royalties_",
            type: "tuple",
          },
          {
            internalType: "bool",
            name: "isERC1155",
            type: "bool",
          },
        ],
        name: "stake",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tailorFee",
            type: "uint256",
          },
          {
            internalType: "uint88",
            name: "modelId",
            type: "uint88",
          },
          {
            internalType: "uint96[]",
            name: "metaverseIds",
            type: "uint96[]",
          },
          {
            internalType: "bool",
            name: "isERC1155",
            type: "bool",
          },
          {
            internalType: "address payable",
            name: "paymentToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "paymentAmount",
            type: "uint256",
          },
        ],
        name: "stakeSingular",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "unstake",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "bridgeRouter_",
            type: "address",
          },
        ],
        name: "updateBridgeRouter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: "uint16",
                name: "minEnvironmentRoyaltyPercent",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "maxEnvironmentRoyaltyPercent",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "minStakeOwnerRoyaltyPercent",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "maxStakeOwnerRoyaltyPercent",
                type: "uint16",
              },
              {
                internalType: "uint80",
                name: "minTailorRoyaltyStable",
                type: "uint80",
              },
              {
                internalType: "uint80",
                name: "maxTailorRoyaltyStable",
                type: "uint80",
              },
              {
                internalType: "uint16",
                name: "minTailorRoyaltyPercent",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "maxTailorRoyaltyPercent",
                type: "uint16",
              },
            ],
            internalType: "struct IStakingStructs.FeesLimits",
            name: "feesLimits_",
            type: "tuple",
          },
        ],
        name: "updateFeesLimits",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint88",
            name: "modelId",
            type: "uint88",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "minTailorFee",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "maxTailorFee",
                type: "uint256",
              },
            ],
            internalType: "struct IStakingStructs.FeesLimitsSingular",
            name: "feesLimitsSingular_",
            type: "tuple",
          },
        ],
        name: "updateFeesLimitsSingular",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint96",
            name: "metaverseId",
            type: "uint96",
          },
          {
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
        ],
        name: "updateMetaverseFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "minStyleNFTs",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "minStyleAssets",
                type: "uint256",
              },
            ],
            internalType: "struct IStakingStructs.StyleLimits",
            name: "styleLimits_",
            type: "tuple",
          },
        ],
        name: "updateStyleLimits",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    devdoc: {
      kind: "dev",
      methods: {
        "addAdmin(address)": {
          details: "Add admin (only by contract owner).",
          params: {
            admin: "Address of admin.",
          },
        },
        "buyAndMint(address,(uint256,uint256,address,uint96,address,uint88,address,address,string,bytes),bytes,uint256)":
          {
            details: "Buy item with eth and mint it.",
            params: {
              nonmintedNFT: "NonmintedNFT to buy and mint.",
              signature: "Signature for nonmintedNFT by creator of the item.",
            },
          },
        "getAdmins(uint256,uint256)": {
          details: "Get admins.",
        },
        "getAncestor(address,uint256)": {
          params: {
            tokenId: "A tokenId of ERC721 to get info about.",
          },
        },
        "getOwner()": {
          details: "Get owner of the contract.",
        },
        "getStake(address,uint256)": {
          details: "Get stake.",
        },
        "getStakeSingular(address,uint256)": {
          details: "Get stake Singular.",
        },
        "getStakes(uint256,uint256)": {
          details: "Get all stakes.",
          returns: {
            newCursor: "for subsequental calls",
            stakes: "stakes",
          },
        },
        "getStakesSingular(uint256,uint256)": {
          details: "Get all stakes Singular.",
          returns: {
            newCursor: "for subsequental calls",
            stakes: "Singular",
          },
        },
        "getTailor(address,uint256)": {
          params: {
            tokenId: "A tokenId of ERC721 to get info about.",
          },
        },
        "isDerivative(address,bytes32)": {
          details: "Determine if the contract is the derivative.",
          params: {
            contract_: "A contract_ to get info about.",
          },
        },
        "removeAdmin(address)": {
          details: "Remove admin (only by contract owner).",
          params: {
            admin: "Address of admin.",
          },
        },
        "stake(address,uint256,uint88,uint96,(uint16,uint16,uint80,uint16),bool)":
          {
            details: "Stake a token.",
            params: {
              tokenAddress: "Address of ERC721 collection.",
              tokenId: "The tokenId of ERC721 to stake.",
            },
          },
        "stakeSingular(address,uint256,uint256,uint88,uint96[],bool,address,uint256)":
          {
            details: "Stake Singular a token.",
            params: {
              tokenAddress: "Address of ERC721 collection.",
              tokenId: "The tokenId of ERC721 to stake.",
            },
          },
        "unstake(address,uint256)": {
          details: "Unstake a token.",
          params: {
            tokenAddress: "Address of ERC721 collection.",
            tokenId: "The tokenId of ERC721 to unstake.",
          },
        },
        "updateFeesLimits((uint16,uint16,uint16,uint16,uint80,uint80,uint16,uint16))":
          {
            details: "Update fees limits.",
          },
        "updateFeesLimitsSingular(uint88,(uint256,uint256))": {
          details: "Update fees limits singular.",
        },
        "updateMetaverseFee(uint96,uint256)": {
          details: "Update metaverses' fees.",
        },
        "withdraw(address,uint256)": {
          details: "Withdraw tokens from contract (only by contract owner).",
          params: {
            token: "Address of token to withdraw.",
          },
        },
      },
      version: 1,
    },
    userdoc: {
      kind: "user",
      methods: {
        "DOMAIN_SEPARATOR()": {
          notice:
            "----------------------------------------------------------------------- EIP-712 Logic -----------------------------------------------------------------------",
        },
        "getAncestor(address,uint256)": {
          notice: "Return ancestor by tokenId.",
        },
        "getTailor(address,uint256)": {
          notice: "Return tailor by tokenId.",
        },
        "stake(address,uint256,uint88,uint96,(uint16,uint16,uint80,uint16),bool)":
          {
            notice: "The ERC721 have to be approved to this contract.",
          },
        "stakeSingular(address,uint256,uint256,uint88,uint96[],bool,address,uint256)":
          {
            notice: "The ERC721 have to be approved to this contract.",
          },
      },
      version: 1,
    },
  },
  settings: {
    compilationTarget: {
      "contracts/NFTMarketplace.sol": "NFTMarketplace",
    },
    evmVersion: "london",
    libraries: {},
    metadata: {
      bytecodeHash: "ipfs",
    },
    optimizer: {
      enabled: true,
      runs: 200,
    },
    remappings: [],
    viaIR: true,
  },
  sources: {
    "@uniswap/swap-router-contracts/contracts/interfaces/IV3SwapRouter.sol": {
      keccak256:
        "0xa2300af2b82af292216a8f3f301a86e65463655fff9fb791515e3fd2ccf4a14c",
      license: "GPL-2.0-or-later",
      urls: [
        "bzz-raw://a0a9bece58527fb5c1773d86666c7a71884a78f413e230dfa8c8a7f8ea564ef9",
        "dweb:/ipfs/QmbDhvpoZJN1KntxUUxkYV89RPTwqVBiyHBkvVh4QHSveo",
      ],
    },
    "@uniswap/v3-core/contracts/interfaces/callback/IUniswapV3SwapCallback.sol":
      {
        keccak256:
          "0x3f485fb1a44e8fbeadefb5da07d66edab3cfe809f0ac4074b1e54e3eb3c4cf69",
        license: "GPL-2.0-or-later",
        urls: [
          "bzz-raw://095ce0626b41318c772b3ebf19d548282607f6a8f3d6c41c13edfbd5370c8652",
          "dweb:/ipfs/QmVDZfJJ89UUCE1hMyzqpkZAtQ8jUsBgZNE5AMRG7RzRFS",
        ],
      },
    "contracts/Base.sol": {
      keccak256:
        "0x01d054882469be6ad919f24a24e252f9951c889c28b3c0a5f23b115cc82edeec",
      license: "MIT",
      urls: [
        "bzz-raw://79a9b99fa1fb111e49ed76b8cd8992549f60380f9ee73d794585eeef797c9d5f",
        "dweb:/ipfs/QmbAFhxkKvzDwXBtCccxNoDitRq8HUMLdHJTnhJ7jpMEnZ",
      ],
    },
    "contracts/Bidding3.sol": {
      keccak256:
        "0x2cb2f621696cdc8669f465a27028873ae478f1f711c988bd9a6ceef86aeea107",
      license: "MIT",
      urls: [
        "bzz-raw://61a76f0fd2986339c5f72e726a5d99ed3b8d3945090b74dfc4e21b6bd8e698c2",
        "dweb:/ipfs/QmaFyacW2p9KVSoNBK2ukoyW5hX6NpaWPM7daTXBoFqX7T",
      ],
    },
    "contracts/Generation.sol": {
      keccak256:
        "0xc9238f44df9d169c0212804a253dde82a921e563a1d6e6951a3b8a78fc7a1ef1",
      license: "MIT",
      urls: [
        "bzz-raw://a992aba896b7689792f4baf954a295e06fb0a2315850b3d86f72c552b738e917",
        "dweb:/ipfs/QmYYGnZvxjCj8hHsRRbPgi8i3Qd7Sjy7LQkXeFai1wnVUv",
      ],
    },
    "contracts/LazyMinting2.sol": {
      keccak256:
        "0x3f03c79b8b9ae07b97df396833a2b09c4956f75a2828ddfc7c31cc94a59419fc",
      license: "MIT",
      urls: [
        "bzz-raw://f727482ff4360853394ab1d71afd4c8f596e448b83aa2eba923504b0d8da9090",
        "dweb:/ipfs/Qme6fZF4rriJcv2AXGuooRTU8KGuVQuvpEmHHqCqqy4wrN",
      ],
    },
    "contracts/NFTMarketplace.sol": {
      keccak256:
        "0x11b1805a103c8ed713806179fa781383935875bd27b418942f3ca8682ea6e8aa",
      license: "MIT",
      urls: [
        "bzz-raw://a2513681ea514c40370ff32af509b334f36dd0e740bde25fa02aa6f0e382d5c3",
        "dweb:/ipfs/QmVTmfFBeV8RPND6wSkVWoaWzWZ759mYsX4CdBoD7bduLW",
      ],
    },
    "contracts/Staking.sol": {
      keccak256:
        "0x00f4a5eef6ce0ad99f12bc8249841b215fcd5ac6386cca16ee3c96feec5c1356",
      license: "MIT",
      urls: [
        "bzz-raw://fd158beaa39c5202cc0f1d8b18f5d969bf3ea25d7c55d167d81f717c7b506995",
        "dweb:/ipfs/QmdVwPV99nzoYsRLKZ84HErzJrfG7mD5N43vdLvvdXjq6Z",
      ],
    },
    "contracts/erc721a/ERC721A.sol": {
      keccak256:
        "0x1c26d7ac036f33c83e214ab0f335728684aee5d36ec4f85cbd39ad986621f08e",
      license: "MIT",
      urls: [
        "bzz-raw://8d2ddac3b4740892b25aef92e306a2b60fd05d56b08a7858f77d3f26de41eff8",
        "dweb:/ipfs/QmYuszEekJRJtRXsaMD9BATNd4WAnt5T2WhLgHJ662ojsM",
      ],
    },
    "contracts/erc721a/IERC721A.sol": {
      keccak256:
        "0x53288f03e0ac344d75a867bfaeb149d6866a4503889b9ba259de57926dffc70f",
      license: "MIT",
      urls: [
        "bzz-raw://2771804c22147d0d315be5f169518d5ee42d9f8a4f2d4d80710b2e19d04c8860",
        "dweb:/ipfs/QmXV4ctinEkwA1GoDy63XCMnL5pBtuWmhXef8CRCzxWni6",
      ],
    },
    "contracts/interfaces/IBase.sol": {
      keccak256:
        "0x56b741e244a7675f72a4eba2c3e6671293ddc65b3b9d636bb7880a4c6beafd53",
      license: "MIT",
      urls: [
        "bzz-raw://b5086de57b1796f074ba2b69983d248d0cbc0bf302a95a21f8715a6e86572384",
        "dweb:/ipfs/QmYT5QHfqcM2GGAHBpkxRd2oUj33vQy7S69bUEaPemWmBE",
      ],
    },
    "contracts/interfaces/IGeneration.sol": {
      keccak256:
        "0xb8a920ac37a4e5979ca0a0f561f9f899fe0a3980d4423654f3c9d0c0b77821ec",
      license: "MIT",
      urls: [
        "bzz-raw://cc9083d73135fec372cf9bdaf8b1d8cd716bd015636aa62b63ee408ee344395c",
        "dweb:/ipfs/QmawE69vbuRZTaAm2N4Ai9qGPGVw7NzEPFXmPKwS9SMfBF",
      ],
    },
    "contracts/interfaces/ILazyMinting.sol": {
      keccak256:
        "0xc2fea6393be1fbd9e5275f3acf2fe3b90b747927903f0c297bc9bf318b8ae0e4",
      license: "MIT",
      urls: [
        "bzz-raw://4de4337b30030d663a3b8e083781bbf01b7a1c7ca120a96046f60d28699eea0a",
        "dweb:/ipfs/QmeeVwHJbXd1H42HjoR1KacexvWG2eFbrTFQYoCipGUc4W",
      ],
    },
    "contracts/interfaces/INFTMarketplace.sol": {
      keccak256:
        "0x5a897fc7392effdb0a377d3ff9be55dda6baed887d758e4869e5ed3b8178074a",
      license: "MIT",
      urls: [
        "bzz-raw://1b9c6ce1e911894001a2acfaf0a1a118bed2de03bccfba03128cc7b2906b18d3",
        "dweb:/ipfs/QmQjCMMUAiEvVYa8K6HuionZiHN1WJ3hiZ9UHio7mDVtKU",
      ],
    },
    "contracts/interfaces/IStaking.sol": {
      keccak256:
        "0xb5cba2a415f44081acb78edbd11dbf0ae223de3fc794c9fb4cb27c8c203cde0a",
      license: "MIT",
      urls: [
        "bzz-raw://dffc1c65f2569a044a28f8c9479a77214958ec41d622ac715eaf83f169d005db",
        "dweb:/ipfs/QmR9ogPEbWLeH8yN3BbBDWRLNzS5GvtPwLPwnbu9H7F4aP",
      ],
    },
    "contracts/interfaces/base/IBaseErrors.sol": {
      keccak256:
        "0x079575f97b6d40ab9556915d097a8984615d287c7e8b053adcc4fb3cb467a7ca",
      license: "MIT",
      urls: [
        "bzz-raw://2011c2eb445799b4847313a37fab137ad2b4180b692fe70513b9882e2cc9ff88",
        "dweb:/ipfs/QmRyqf7rzkxiPoa1tvvFbre8Eg7q3VwWQWPYKyfj4v5ewQ",
      ],
    },
    "contracts/interfaces/base/IBaseEvents.sol": {
      keccak256:
        "0x7fee8c82dbc78fb7d200c2c477652d99992ca5ea8f07b65ebaa0450e9d159c68",
      license: "MIT",
      urls: [
        "bzz-raw://130e9bc013d70fcb7d3bd40bc853052d2b6529bbc2754199147bc1069487f910",
        "dweb:/ipfs/QmWc4VuCUojdpMvSnJKBn3tayMC6mUAHmthVNfKXeHknNt",
      ],
    },
    "contracts/interfaces/base/IBaseStructs.sol": {
      keccak256:
        "0xb228611a68f78eb33d753ac64603c566d7507c738c62195ed107ae77f7ba0cee",
      license: "MIT",
      urls: [
        "bzz-raw://4f151eab783d6332988cb75fa501181965fcb874eb94a59150ce0f82bc4da6b4",
        "dweb:/ipfs/QmZgZnzPSohcMTASseET5JbdQuj3UzN6UZZitBDfUz7AtN",
      ],
    },
    "contracts/interfaces/generation/IGenerationErrors.sol": {
      keccak256:
        "0x183f5f1300953b14429ac4e321a60e404db0c1e70a21863a3e1354f455a59275",
      license: "MIT",
      urls: [
        "bzz-raw://95f0359bf0853fdbe519bd24ae01bcc0472cb78132061a128d00ef36d6cb4c32",
        "dweb:/ipfs/QmPVGHS7C6soZaoC7Po4zEtkZ4uQEjDhBMiwwiT2zMFbXc",
      ],
    },
    "contracts/interfaces/generation/IGenerationEvents.sol": {
      keccak256:
        "0x40384fdf8fb893da10cbfd1792f3402c08d4fe404929b50146712cd8bc82300d",
      license: "MIT",
      urls: [
        "bzz-raw://6a3e53d764a3f92c056191fa0c49911abf110614b70fa28861828235e7a79494",
        "dweb:/ipfs/QmapyizRT2oVXExUPXgVfrqmfhNgiKEV5rw7wm9vu4uuWr",
      ],
    },
    "contracts/interfaces/generation/IGenerationStructs.sol": {
      keccak256:
        "0x1f214bd4ccb4963b9a7b5a8e42291d2b660d6fcd8e15bf4338d3885f2a1c876a",
      license: "MIT",
      urls: [
        "bzz-raw://50538d6acf128bd5c86f6e0f11e8c3f08642aebffb6c0e327f6f331e281e6d86",
        "dweb:/ipfs/QmcxoZPcjhTXBngyeuLcWooYHMemqDPqUNPfNbYqmQxqEr",
      ],
    },
    "contracts/interfaces/lazyminting/ILazyMintingErrors.sol": {
      keccak256:
        "0x8ee6aa584a114acfdd13c412507a01425987c362735088d997a50c5b6cdde998",
      license: "MIT",
      urls: [
        "bzz-raw://8b42bf0b294aeecb72cdca37bae1e85f2cac115f177de3c71aac8745382a92e9",
        "dweb:/ipfs/QmeRT8ezZyBYaGGcQVRZsoPcgBS9mmhxDfK7BuTNou4C9k",
      ],
    },
    "contracts/interfaces/lazyminting/ILazyMintingEvents.sol": {
      keccak256:
        "0x41c471151981b33b421167cbfd49d9223650d1107e1dcb7b0b2f3166e110e71e",
      license: "MIT",
      urls: [
        "bzz-raw://9eb9a05b4ec4e498bb96b3c85f2e76e0098eec5cc195987f3996b12076860dbd",
        "dweb:/ipfs/QmT6L7wPSiBAsDNiwu8XHa7NaziC2qvin6tPXvN33uGyNz",
      ],
    },
    "contracts/interfaces/lazyminting/ILazyMintingStructs.sol": {
      keccak256:
        "0xdf2ed7332746d56b441944d64a248540b9db5c681f3b95c39606ea5293b16a23",
      license: "MIT",
      urls: [
        "bzz-raw://f7144b987c4201b9470ebbb94a8e1e4f86a4c73f7b7f387c0887cd673d3d16c1",
        "dweb:/ipfs/QmfX2yxGwfeV6eh67LBc4JzYx9enTb3XBxocEiag33L4KF",
      ],
    },
    "contracts/interfaces/nftmarketplace/INFTMarketplaceErrors.sol": {
      keccak256:
        "0xa77dc9c08fa49438629bd8c9b098be7ed5e7b0523e7e5335860a162d3b445c90",
      license: "MIT",
      urls: [
        "bzz-raw://b6a669be83ceb46fbd66810626b55615608f7815a7adaadcf8a1b3c4e1d49d1d",
        "dweb:/ipfs/QmcxkT7yvCytgfTkmx2Ewc43TRnnsbu56GiJpdNVMUaTsk",
      ],
    },
    "contracts/interfaces/nftmarketplace/INFTMarketplaceEvents.sol": {
      keccak256:
        "0x1cb875bea92b7eb10bc2327abcd1ca333f209bd17c334481147fe4e2e7934b5d",
      license: "MIT",
      urls: [
        "bzz-raw://1542832dda33ae6df66a2153ee1fed027cb8d13e3041c33d0f258f162663ca84",
        "dweb:/ipfs/QmT8Vb37YbFTAhaK1XKrazP5jyeoikCrPLZQ16rzFkKYDW",
      ],
    },
    "contracts/interfaces/nftmarketplace/INFTMarketplaceStructs.sol": {
      keccak256:
        "0xd9ccb146a989b30ca3fb1f5d10c7f38fcd659d821c0b2f4467fe914560839ab6",
      license: "MIT",
      urls: [
        "bzz-raw://f6b752125329305e3200791772fc16331716fc458d7ec1f09bbc997c427e995e",
        "dweb:/ipfs/QmYnhpiNHWmnfk9ufC6sDtv3NuFtkAa7rXm86ps9L2heQB",
      ],
    },
    "contracts/interfaces/staking/IStakingErrors.sol": {
      keccak256:
        "0x268a11849a7975b509e12e4d5557a046fec8e5f4c328d32cef38099da849fc0e",
      license: "MIT",
      urls: [
        "bzz-raw://07282d576b0d002da0d6b7b523b71ad371eaabf48bf2099dbda8f24d46649670",
        "dweb:/ipfs/QmavaCQH2jbaZd85DCVVV8qyrsBQ5vapHchXZACb6LyAmZ",
      ],
    },
    "contracts/interfaces/staking/IStakingEvents.sol": {
      keccak256:
        "0xdaeaac445bad20c35d8b87dbbfdd16499273a9bba72606cb1a947410c2595b60",
      license: "MIT",
      urls: [
        "bzz-raw://b1c716c266f68d2fdff8510d8a05e1ef725c81d536609212a26e565f4ba50415",
        "dweb:/ipfs/QmNPgfGWYj1mMzqsciHCuKdEhpcUUSwqoy6Rd9Luj7TYfi",
      ],
    },
    "contracts/interfaces/staking/IStakingStructs.sol": {
      keccak256:
        "0x42ae1ca57af1fb0cd233a6689e7fc7d3a9b6e2d10a31d8481b93ac1c19f26b1e",
      license: "MIT",
      urls: [
        "bzz-raw://4489115ab51773a93111573d6a13fcddbe2f0dcf3c661f63ff048ee77776c3fa",
        "dweb:/ipfs/QmZjNqu2UZz5n3oxQatgnaNsUrBhnDWwG7DL1oHT2Vd6Mh",
      ],
    },
    "contracts/libraries/Initializable.sol": {
      keccak256:
        "0x86c97c7db518da2a09a728258b331d56ff81212da22d435a0cf8fcaedcb920d1",
      license: "MIT",
      urls: [
        "bzz-raw://b0fbdae584c25f6f72948c1f5f0567b56311060e9485b401bf50b29e54a2db71",
        "dweb:/ipfs/QmPNqjitw8KziKGcm28t7MP8qJX6icfbrnDLyLQc4L6eJW",
      ],
    },
    "contracts/libraries/PoolAddress.sol": {
      keccak256:
        "0x0abbe017a7ba60e54626de16e07518a69f8ddcd4c8216259858b9658f365105d",
      license: "MIT",
      urls: [
        "bzz-raw://f03f62509b2ef41f23859700d5ab1780d4e378115de66e13df1522f506f462e7",
        "dweb:/ipfs/QmUberjTnJaZcYiZVju9erqqtRpGxQoVdJKCczLvRSpJ3E",
      ],
    },
    "lib/solbase/src/utils/EIP712.sol": {
      keccak256:
        "0x00008285c46aadc7d5b5b6e3e5590102511c14db3baa7105b2d39dac10d61fc5",
      license: "MIT",
      urls: [
        "bzz-raw://2b1db374a386c07bc8d94bdcc8ba71552da7022144a0da2ba38c683cdcb381b9",
        "dweb:/ipfs/QmX1q6AxP86kiEGaESudZPurkRt8EvRupFD8j4obZJezSD",
      ],
    },
    "lib/solmate/src/tokens/ERC1155.sol": {
      keccak256:
        "0x572bc96d7f0302adae31c41cf6f1b8157bb00e171f5f1240e8d60f4c75ef7f62",
      license: "AGPL-3.0-only",
      urls: [
        "bzz-raw://1567c70ae428012b15aa2c95a6b8264d0ee1163c33042dc177cca0a68b318536",
        "dweb:/ipfs/QmdnvQn9Vz4gWMjrP3A7djkAKk1DWfrEsuYRmqgmjEvR1r",
      ],
    },
    "lib/solmate/src/tokens/ERC20.sol": {
      keccak256:
        "0xc911296ba625483b47aeab1857b3175b61fa8b957907dd3d3228adc8c93c4c7e",
      license: "AGPL-3.0-only",
      urls: [
        "bzz-raw://937ba0b5e5d149b932f0458875ff887da73844cbc43eca29465af3e4a6c6bf1f",
        "dweb:/ipfs/Qmbw3BLVsLLrdg6stfTAYFiThz6jNYwiBcAf36srJWrsi9",
      ],
    },
    "lib/solmate/src/tokens/ERC721.sol": {
      keccak256:
        "0x227874af7824c3b886872eaa5edfeae296bdd3a0dcbeb5ef100ecd0fff705fa0",
      license: "AGPL-3.0-only",
      urls: [
        "bzz-raw://24c5aacafaf441ada60afe779a794f4a765ac34494324965c6feef7df4f4620c",
        "dweb:/ipfs/Qme78aYYrvYs9ynnuMjzs8sFjPZQaZTDxWvD68gqkA77Vv",
      ],
    },
    "lib/solmate/src/tokens/WETH.sol": {
      keccak256:
        "0x343cf5f6b643864c5728fa9bf057c5708052402b22c5662decce94f5febff514",
      license: "AGPL-3.0-only",
      urls: [
        "bzz-raw://dc3722cf992cc13ff0728660432092d8ae6851f500b24c0aa474c45f2e8c3f2d",
        "dweb:/ipfs/QmVq7veVaBKKdm4AKQiuCXMPGHPuCcPksm7LNuA2ihpN9U",
      ],
    },
    "lib/solmate/src/utils/FixedPointMathLib.sol": {
      keccak256:
        "0x157e337325356197f974201588e5df25b4baa4b88658d282aea485065b8281e4",
      license: "AGPL-3.0-only",
      urls: [
        "bzz-raw://f5760fa604fcf341273055d1f13f4e4c39e9c6d6b7e50aa30babd577499a9d8c",
        "dweb:/ipfs/QmcUi9MF2QT57qUk8hoJF41RzMCjm2YokU7uxEpqTJW2H1",
      ],
    },
    "lib/solmate/src/utils/ReentrancyGuard.sol": {
      keccak256:
        "0xb282dd78aa7375d6b200b9a5d8dd214b2e5df1004f8217a4b4c2b07f0c5bfd01",
      license: "AGPL-3.0-only",
      urls: [
        "bzz-raw://5fca62eb8d3dbd2b3b7e4bb051f6da16f4d0ff9cee61c39cebb80f031f6a8800",
        "dweb:/ipfs/QmbrsXPK91iBFwHKwJs2HLRud2KzMoBDRiWYMUtyV5H57j",
      ],
    },
    "lib/solmate/src/utils/SafeTransferLib.sol": {
      keccak256:
        "0x90e8b1854e59583fb75be7713a9cb038014cbbd2da14024aba316f9676f11da1",
      license: "AGPL-3.0-only",
      urls: [
        "bzz-raw://003db2b4d38fef5b6eab1738f8d67ebb00af496cea0d020067aed66310086d81",
        "dweb:/ipfs/QmdFbox7ewFXUybptPR6vu7ZuHPKK3jZ1PfAJsfeBFhAaz",
      ],
    },
    "solady/src/utils/ECDSA.sol": {
      keccak256:
        "0x2b27db399017306663dd21599aaa82dfd8caca559b1c5e4bda4eb435983ae511",
      license: "MIT",
      urls: [
        "bzz-raw://c4556b607236e1fef21b47f0cce49bd3ec7dd9c1feb3bec9b1405130515bb904",
        "dweb:/ipfs/Qmbwa2Eext85sbxjfik27chhDWXwZmng8i9mLoPzunkuNX",
      ],
    },
    "solady/src/utils/LibClone.sol": {
      keccak256:
        "0x90c68c527f54164e04fe7908246628c96c4d353050efc41910d41033f6ef196b",
      license: "MIT",
      urls: [
        "bzz-raw://3d2327176fca279f135c0e4387b07ffaf8a340f28de130960e572557afcc640f",
        "dweb:/ipfs/QmPgSb3nFCgybvN4VCw64JLeKVmQYAyiFXARo6oQRi2vxk",
      ],
    },
    "solady/src/utils/LibString.sol": {
      keccak256:
        "0x1aeed89e393350c7b015f9e77dd360f64427e059442833bf6647f34a535e1b42",
      license: "MIT",
      urls: [
        "bzz-raw://71de991154b5c4963fedfdd73b77eeb2f0a01ebdad2ca8cacfd354aea7467d70",
        "dweb:/ipfs/QmPe4ttUtoApXsBunEbXmemhZTbNd1eXYr5evQEqNkHvcY",
      ],
    },
  },
  version: 1,
};

const ERC20_ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
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
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];

const PROTOCOL_CONTRACTS = {
  5: "0x87148553f8D5c32Ec2358Ab1f3b2eF9C3bBd0f6D",
};

const metaversesJson = [
  {
    id: "0",
    icon: "decentraland.svg",
    name: "Decentraland",
    slug: "decentraland",
    price: 600,
    availabilityRange: 100000,
  },
  // {
  //   id: '1',
  //   icon: 'sandbox.svg',
  //   name: 'The Sandbox',
  //   slug: 'sandbox',
  //   price: 200,
  //   availabilityRange: 1500,
  // },
  {
    id: "1",
    icon: "somnium.svg",
    name: "Somnium Space",
    slug: "somnium_space",
    price: 200,
    availabilityRange: 20,
  },
  {
    id: "2",
    icon: "cryptovoxels.svg",
    name: "Cryptovoxels",
    slug: "cryptovoxels",
    price: 170.01,
    availabilityRange: 1024,
  },
  {
    id: "3",
    icon: "monaverse.svg",
    name: "Monaverse",
    slug: "monaverse",
    price: 199,
    availabilityRange: 1024,
  },
];

const ENDPOINTS = {
  4: process.env.NEXT_PUBLIC_RINKEBY_ENDPOINT,
  5: process.env.NEXT_PUBLIC_GOERLI_ENDPOINT,
};

const GATEWAY = "styleprotocol.mypinata.cloud";

const validateMetaverseFilter = (metaverseFilter) => {
  if (typeof metaverseFilter === "string") {
    metaverseFilter = [metaverseFilter];
  } else if (metaverseFilter.length === 0) {
    metaverseFilter.push(null);
  }

  const availiableMetaverses = metaversesJson.map((m) => m.slug.toLowerCase());
  if (metaverseFilter.length == 1 && metaverseFilter[0] == null) {
  } else {
    metaverseFilter = new Set(metaverseFilter.map((m) => m.toLowerCase()));
    for (const m of metaverseFilter) {
      if (!availiableMetaverses.includes(m)) {
        return false;
      }
    }
  }

  return Array.from(metaverseFilter);
};

const validateTypeFilter = (typeFilter) => {
  if (typeof typeFilter === "string") {
    typeFilter = [typeFilter];
  } else if (typeFilter.length === 0) {
    typeFilter.push(null);
  }

  const availiableTypes = ["AVATAR", "WEARABLE", "MISC"];

  if (typeFilter.length == 1 && typeFilter[0] == null) {
  } else {
    typeFilter = new Set(typeFilter.map((m) => m.toUpperCase()));
    for (const m of typeFilter) {
      if (!availiableTypes.includes(m)) {
        return false;
      }
    }
  }

  return Array.from(typeFilter);
};

const validateSubtypeFilter = (subtypeFilter) => {
  if (typeof subtypeFilter === "string") {
    subtypeFilter = [subtypeFilter];
  } else if (subtypeFilter.length === 0) {
    subtypeFilter.push(null);
  }

  subtypeFilter = new Set(subtypeFilter);

  return Array.from(subtypeFilter);
};

const getRequestedNFTs = async ({
  cursor = 0,
  amount = 100,
  chainId = 5,
  metaverseFilter = [],
  typeFilter = [],
  subtypeFilter = [],
}) => {
  try {
    metaverseFilter = validateMetaverseFilter(metaverseFilter);
    typeFilter = validateTypeFilter(typeFilter);
    subtypeFilter = validateSubtypeFilter(subtypeFilter);

    if (metaverseFilter === false || typeFilter === false) {
      console.log("improper filter");
      return [];
    }

    const web3 = new Web3(ENDPOINTS[chainId]);
    const protocolContract = new web3.eth.Contract(
      NFTMarketplace_metadata["output"]["abi"],
      PROTOCOL_CONTRACTS[chainId]
    );

    const stakes = (
      await protocolContract.methods.getStakes(cursor, amount).call()
    )[0];

    var stakesData = {};
    stakes.forEach((stake) => {
      stakesData[`${stake.tokenAddress.toLowerCase()}|${stake.tokenId}`] =
        stake;
    });

    const getNFTs = async (url) => {
      var config = {
        method: "get",
        url: url,
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
        },
      };
      let resultTmp = await axios(config);
      return resultTmp.data.rows;
    };

    let url = `https://api.pinata.cloud/data/pinList?status=pinned&pageLimit=1000&metadata[name]=NonmintedNFT&metadata[keyvalues]={"chainId": {"value": "${chainId}", "op": "eq"}`;

    if (metaverseFilter[0] != null) {
      url += `, "metaverse": {"value": "${metaverseFilter.join(
        "|"
      )}", "op": "regexp"}`;
    }
    if (typeFilter[0] != null) {
      url += `, "type": {"value": "${typeFilter.join("|")}", "op": "regexp"}`;
    }
    if (subtypeFilter[0] != null) {
      url += `, "subtype": {"value": "${subtypeFilter.join(
        "|"
      )}", "op": "regexp"}`;
    }

    url += "}";

    let result = await getNFTs(url);

    let resultGot = await Promise.all(
      result.map(async (cur) => {
        let res = await fetch(`https://${GATEWAY}/ipfs/${cur.ipfs_pin_hash}`);
        res = await res.json();

        const curStake =
          stakesData[
            `${res.tokenAddress.toLowerCase()}|${BigNumber.from(
              res.tokenId
            ).toNumber()}`
          ];

        const numberOfDerivatives = Number.parseInt(
          curStake?.numberOfDerivatives
        );
        if (!numberOfDerivatives || numberOfDerivatives === 0) {
          return null;
        }

        const paymentTokenContract = new web3.eth.Contract(
          ERC20_ABI,
          res.paymentToken
        );
        let decimals;
        try {
          decimals = await paymentTokenContract.methods.decimals().call();
        } catch {
          return null;
        }

        res.numberOfDerivatives = numberOfDerivatives;
        res.cid = cur.ipfs_pin_hash;

        res.payment = {
          value: BigNumber.from(res.payment),
          stringValue: `${Number.parseInt(res.payment) / 10 ** decimals}`,
        };

        res.paymentToken = {
          address: res.paymentToken,
          name: await paymentTokenContract.methods.name().call(),
          symbol: await paymentTokenContract.methods.symbol().call(),
        };

        var ipfsUrl = res.uri;
        if (ipfsUrl.slice(0, 4) === "ipfs") {
          ipfsUrl = `https://${GATEWAY}/ipfs/${ipfsUrl.slice(7)}`;
        }

        let extra = await fetch(ipfsUrl);
        extra = await extra.json();

        res.asset = extra;

        return res;
      })
    );

    const res = resultGot.filter((cur) => cur !== null);
    return res;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getRequestedSingularNFTs = async ({
  owner,
  chainId = 5,
  metaverseFilter = [],
  typeFilter = [],
  subtypeFilter = [],
}) => {
  try {
    metaverseFilter = validateMetaverseFilter(metaverseFilter);
    typeFilter = validateTypeFilter(typeFilter);
    subtypeFilter = validateSubtypeFilter(subtypeFilter);

    if (metaverseFilter === false || typeFilter === false) {
      console.log("improper filter");
      return [];
    }

    const web3 = new Web3(ENDPOINTS[chainId]);
    const protocolContract = new web3.eth.Contract(
      NFTMarketplace_metadata["output"]["abi"],
      PROTOCOL_CONTRACTS[chainId]
    );

    const getNFTs = async (url) => {
      var config = {
        method: "get",
        url: url,
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
        },
      };
      let resultTmp = await axios(config);
      return resultTmp.data.rows;
    };

    let url = `https://api.pinata.cloud/data/pinList?status=pinned&pageLimit=1000&metadata[name]=NonmintedNFTSingular&metadata[keyvalues]={"chainId": {"value": "${chainId}", "op": "eq"}, "owner": {"value": "${owner.toLowerCase()}", "op": "eq"}`;

    if (metaverseFilter[0] != null) {
      url += `, "metaverse": {"value": "${metaverseFilter.join(
        "|"
      )}", "op": "regexp"}`;
    }
    if (typeFilter[0] != null) {
      url += `, "type": {"value": "${typeFilter.join("|")}", "op": "regexp"}`;
    }
    if (subtypeFilter[0] != null) {
      url += `, "subtype": {"value": "${subtypeFilter.join(
        "|"
      )}", "op": "regexp"}`;
    }

    url += "}";

    let result = await getNFTs(url);

    let resultGot = await Promise.all(
      result.map((cur) => fetch(`https://${GATEWAY}/ipfs/${cur.ipfs_pin_hash}`))
    );
    resultGot = await Promise.all(resultGot.map((cur) => cur.json()));

    resultGot = resultGot.map((cur, index) => {
      return {
        ...cur,
        cid: result[index].ipfs_pin_hash,
      };
    });

    const signsProceeded = await protocolContract.methods
      .getIfSignsProceeded(
        resultGot.map((cur) => Web3.utils.keccak256(cur.adminSignature))
      )
      .call();

    const stakesSingular = (
      await protocolContract.methods.getStakesSingular(0, 250).call()
    )[0];

    const resultGotNew = resultGot.filter((cur, index) => {
      return (
        signsProceeded[index] === false &&
        stakesSingular.find(
          (curStake) =>
            curStake.tokenAddress.toLowerCase() ===
              cur.tokenAddress.toLowerCase() &&
            Number(curStake.tokenId) === Number(cur.tokenId)
        ) !== undefined
      );
    });

    let resExtras = [];
    let allDataParsed = [];
    resultGotNew.forEach((cur) => {
      var ipfsUrl = cur.uri;
      if (ipfsUrl.slice(0, 4) === "ipfs") {
        ipfsUrl = `https://${GATEWAY}/ipfs/${ipfsUrl.slice(7)}`;
      }
      resExtras.push(fetch(ipfsUrl));
      allDataParsed.push(cur);
    });

    resExtras = await Promise.all(resExtras);
    resExtras = await Promise.all(resExtras.map((cur) => cur.json()));

    allDataParsed = allDataParsed.map((data, index) => {
      return {
        ...data,
        asset: resExtras[index],
      };
    });

    return allDataParsed;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const approveERC20 = async ({ web3, walletAddress, chainId, NFT, spender }) => {
  try {
    const tokenContract = new web3.eth.Contract(
      ERC20_ABI,
      NFT.paymentToken.address
    );

    const allowance = await tokenContract.methods
      .allowance(walletAddress, spender)
      .call();

    if (NFT.payment.value.gt(allowance)) {
      await tokenContract.methods
        .approve(spender, NFT.payment.value)
        .send({ from: walletAddress });
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const buyAndMintItem = async ({ web3, walletAddress, chainId, NFT }) => {
  try {
    const protocolContract = new web3.eth.Contract(
      NFTMarketplace_metadata["output"]["abi"],
      PROTOCOL_CONTRACTS[chainId]
    );

    await protocolContract.methods
      .buyAndMint(
        walletAddress,
        {
          tokenAddress: NFT.tokenAddress,
          tokenId: NFT.tokenId,
          payment: NFT.payment.value,
          paymentToken: NFT.paymentToken.address,
          uri: NFT.uri,
          bidder: NFT.bidder,
          environment: NFT.environment,
          modelId: NFT.modelId,
          metaverseId: NFT.metaverseId,
          signature: NFT.signature,
        },
        NFT.adminSignature,
        NFT.payment.value
      )
      .send({ from: walletAddress });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export {
  getRequestedNFTs,
  getRequestedSingularNFTs,
  approveERC20,
  buyAndMintItem,
};
