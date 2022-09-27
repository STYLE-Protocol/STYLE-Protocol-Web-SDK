const axios = require("axios");
const Web3 = require("web3");
const { BigNumber } = require("ethers");

const PROTOCOL_CONTRACTS = {
  4: "0x8538D073aF2aD3C1Ecb61cfc97C56acA03CFF479",
  80001: "0xFfe8B49e11883De88e110604DA018572b93f9f24",
};

const metaversesJson = [
  {
    id: "0",
    icon: "decentraland.svg",
    name: "Decentraland",
    slug: "decentraland",
    price: 600,
  },
  {
    id: "1",
    icon: "sandbox.svg",
    name: "The Sandbox",
    slug: "sandbox",
    price: 200,
  },
  {
    id: "2",
    icon: "somnium.svg",
    name: "Somnium Space",
    slug: "somnium_space",
    price: 200,
  },
  {
    id: "3",
    icon: "cryptovoxels.svg",
    name: "Cryptovoxels",
    slug: "cryptovoxels",
    price: 170.01,
  },
];

const NFTMarketplace_ABI = [
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
    name: "getListings",
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
            name: "payment",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address",
            name: "contract_",
            type: "address",
          },
          {
            internalType: "address",
            name: "paymentToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "environment",
            type: "address",
          },
        ],
        internalType: "struct INFTMarketplaceStructs.Listing[]",
        name: "listings",
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
        internalType: "uint80",
        name: "cursor",
        type: "uint80",
      },
      {
        internalType: "uint80",
        name: "howMany",
        type: "uint80",
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
            internalType: "enum IStakingStructs.StakeStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "purpose",
            type: "string",
          },
        ],
        internalType: "struct IStakingStructs.Stake[]",
        name: "stakes",
        type: "tuple[]",
      },
      {
        internalType: "uint80",
        name: "newCursor",
        type: "uint80",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "buyItem",
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
            name: "payment",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "paymentToken",
            type: "address",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
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
            internalType: "uint96",
            name: "metaverseId",
            type: "uint96",
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
];

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
];

const Base_ABI = [
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
        name: "_tokenURI",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "metaverseId",
    outputs: [
      {
        internalType: "uint96",
        name: "metaverseId_",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const getRequestedNFTs = async ({
  cursor = 0,
  amount = 100,
  chainId = 4,
  metaverse = "",
}) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_RINKEBY_ENDPOINT)
  );
  const protocolContract = new web3.eth.Contract(
    NFTMarketplace_ABI,
    PROTOCOL_CONTRACTS[chainId]
  );

  const stakes = (
    await protocolContract.methods.getStakes(cursor, amount).call()
  )[0];

  var stakesData = {};
  stakes.forEach((stake) => {
    stakesData[`${stake.tokenAddress.toLowerCase()}|${stake.tokenId}`] = stake;
  });

  var config = {
    method: "get",
    url: `https://api.pinata.cloud/data/pinList?status=pinned&pageLimit=1000&metadata[name]=NonmintedNFT${
      !!metaverse
        ? `&metadata[keyvalues]={"metaverse": {"value": "${metaverse.toLowerCase()}", "op": "eq"}}`
        : ""
    }`,
    headers: {
      "Content-Type": "application/json",
      pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
      pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
    },
  };
  let result = await axios(config);
  result = result.data.rows;

  let resultGot = await Promise.all(
    result.map((cur) =>
      fetch(`https://stylexchange.mypinata.cloud/ipfs/${cur.ipfs_pin_hash}`)
    )
  );
  resultGot = await Promise.all(resultGot.map((cur) => cur.json()));

  const values = await Promise.all([
    Promise.all(
      resultGot.map((cur) =>
        new web3.eth.Contract(ERC20_ABI, cur.paymentToken).methods
          .decimals()
          .call()
      )
    ),
    Promise.all(
      resultGot.map((cur) =>
        new web3.eth.Contract(ERC20_ABI, cur.paymentToken).methods.name().call()
      )
    ),
    Promise.all(
      resultGot.map((cur) =>
        new web3.eth.Contract(ERC20_ABI, cur.paymentToken).methods
          .symbol()
          .call()
      )
    ),
  ]);

  const decimals = values[0];
  const names = values[1];
  const symbols = values[2];

  resultGot.forEach((cur, index) => {
    cur.payment = {
      value: BigNumber.from(cur.payment),
      stringValue: `${Number.parseInt(cur.payment) / 10 ** decimals[index]}`,
    };
    cur.paymentToken = {
      address: cur.paymentToken,
      name: names[index],
      symbol: symbols[index],
    };
  });

  let resExtras = [];
  let allDataParsed = [];
  resultGot.forEach((cur) => {
    const curStake =
      stakesData[
        `${cur.tokenAddress.toLowerCase()}|${BigNumber.from(
          cur.tokenId
        ).toNumber()}`
      ];

    if (Number.parseInt(curStake?.numberOfDerivatives) > 0) {
      var ipfsUrl = cur.uri;
      if (ipfsUrl.slice(0, 4) === "ipfs") {
        ipfsUrl = `https://stylexchange.mypinata.cloud/ipfs/${ipfsUrl.slice(
          7
        )}`;
      }
      resExtras.push(fetch(ipfsUrl));
      allDataParsed.push(cur);
    }
  });

  resExtras = await Promise.all(resExtras);
  resExtras = await Promise.all(resExtras.map((cur) => cur.json()));

  allDataParsed = allDataParsed.map((data, index) => {
    const curStake =
      stakesData[
        `${data.tokenAddress.toLowerCase()}|${BigNumber.from(
          data.tokenId
        ).toNumber()}`
      ];

    return {
      ...data,
      asset: resExtras[index],
      cid: result[index].ipfs_pin_hash,
      numberOfDerivatives: Number.parseInt(curStake.numberOfDerivatives),
    };
  });

  return allDataParsed;
};

const getListedNFTs = async ({
  cursor = 0,
  amount = 100,
  chainId = 4,
  metaverse = "",
}) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_RINKEBY_ENDPOINT)
  );

  const protocolContract = new web3.eth.Contract(
    NFTMarketplace_ABI,
    PROTOCOL_CONTRACTS[chainId]
  );

  const res = (
    await protocolContract.methods.getListings(cursor, amount).call()
  )[0];

  var parsedData = [];
  for (let cur of res) {
    const nftContract = new web3.eth.Contract(Base_ABI, cur.contract_);

    const metaverseId = await nftContract.methods.metaverseId().call();
    const metaverseFilter = metaversesJson
      .filter((cur) => cur.id === `${metaverseId}`)[0]
      .slug.toLowerCase();
    if (!metaverse || metaverseFilter === metaverse.toLowerCase()) {
      var data = { ...cur, metaverse: metaverseFilter };

      var ipfsUrl = await nftContract.methods.tokenURI(data.tokenId).call();
      if (ipfsUrl.slice(0, 4) === "ipfs") {
        ipfsUrl = `https://stylexchange.mypinata.cloud/ipfs/${ipfsUrl.slice(
          7
        )}`;
      }
      const metadata = await (await fetch(ipfsUrl)).json();

      const tokenContract = new web3.eth.Contract(ERC20_ABI, data.paymentToken);

      const decimals = await tokenContract.methods.decimals().call();

      data.payment = {
        value: BigNumber.from(data.payment),
        stringValue: `${Number.parseInt(data.payment) / 10 ** decimals}`,
      };
      data.paymentToken = {
        address: data.paymentToken,
        name: await tokenContract.methods.name().call(),
        symbol: await tokenContract.methods.symbol().call(),
      };

      parsedData.push({ ...data, asset: metadata });
    }
  }

  return parsedData;
};

const approveERC20 = async ({ web3, walletAddress, chainId, NFT }) => {
  const tokenContract = new web3.eth.Contract(
    ERC20_ABI,
    NFT.paymentToken.address
  );

  const allowance = await tokenContract.methods
    .allowance(walletAddress, PROTOCOL_CONTRACTS[chainId])
    .call();

  if (NFT.payment.value.gt(allowance)) {
    await tokenContract.methods
      .approve(PROTOCOL_CONTRACTS[chainId], NFT.payment.value)
      .send({ from: walletAddress });
  }
};

const buyItem = async ({ web3, walletAddress, chainId, NFT }) => {
  const protocolContract = new web3.eth.Contract(
    NFTMarketplace_ABI,
    PROTOCOL_CONTRACTS[chainId]
  );

  await protocolContract.methods
    .buyItem(NFT.contract_, NFT.tokenId, NFT.payment.value)
    .send({ from: walletAddress });
};

const buyAndMintItem = async ({ web3, walletAddress, chainId, NFT }) => {
  const protocolContract = new web3.eth.Contract(
    NFTMarketplace_ABI,
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
        metaverseId: NFT.metaverseId,
        signature: NFT.signature,
      },
      NFT.adminSignature,
      NFT.payment.value
    )
    .send({ from: walletAddress });
};

export {
  getRequestedNFTs,
  getListedNFTs,
  approveERC20,
  buyItem,
  buyAndMintItem,
};
