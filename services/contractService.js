import { getAllContracts } from "./constantsService";

const axios = require("axios");
const Web3 = require("web3");
const { BigNumber, Contract } = require("ethers");
const { ENDPOINTS, GATEWAY, API_HOST } = require("../constants");

const NFTMarketplace_metadata = require("../public/contracts/NFTMarketplace_metadata.json");
const ERC20_ABI = require("../public/contracts/ERC20_ABI.json");
const Base_metadata = require("../public/contracts/Base_metadata.json");

const {
  validateMetaverseFilter,
  validateTypeFilter,
  validateSubtypeFilter,
} = require("../utils/inputValidation");

const getRequestedNFTs = async ({
  cursor = 0,
  amount = 100,
  chainId = 5,
  metaverseFilter = [],
  typeFilter = [],
  subtypeFilter = [],
}) => {
  try {
    metaverseFilter = await validateMetaverseFilter(metaverseFilter);
    typeFilter = validateTypeFilter(typeFilter);
    subtypeFilter = validateSubtypeFilter(subtypeFilter);

    if (metaverseFilter === false || typeFilter === false) {
      console.log("improper filter");
      return [];
    }

    const params = new URLSearchParams({
      endpoint: ENDPOINTS[chainId],
      cursor,
      amount,
      chainId,
    });

    if (metaverseFilter[0] !== null) {
      params.set("metaverseFilter", metaverseFilter);
    }
    if (typeFilter[0] !== null) {
      params.set("typeFilter", typeFilter);
    }
    if (subtypeFilter[0] !== null) {
      params.set("subtypeFilter", subtypeFilter);
    }

    const apiUrl = `https://${API_HOST}/api/nfts/get-requested-nfts?${params.toString()}`;

    let res = await fetch(apiUrl);
    res = await res.json();

    res.forEach((nft) => {
      nft.payment.value = BigNumber.from(nft.payment.value);
    });

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
    metaverseFilter = await validateMetaverseFilter(metaverseFilter);
    typeFilter = validateTypeFilter(typeFilter);
    subtypeFilter = validateSubtypeFilter(subtypeFilter);

    if (metaverseFilter === false || typeFilter === false) {
      console.log("improper filter");
      return [];
    }

    const contracts = await getAllContracts();
    const PROTOCOL_CONTRACTS = contracts["protocols"];

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

const approveERC20 = async ({ web3, walletAddress, NFT, spender }) => {
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

const approveERC20Ethers = async ({ signer, NFT, spender }) => {
  try {
    const tokenContract = new Contract(
      NFT.paymentToken.address,
      ERC20_ABI,
      signer
    );

    const allowance = await tokenContract.allowance(
      await signer.getAddress(),
      spender
    );

    if (NFT.payment.value.gt(allowance)) {
      await (await tokenContract.approve(spender, NFT.payment.value)).wait();
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const buyAndMintItem = async ({ web3, walletAddress, chainId, NFT }) => {
  try {
    const contracts = await getAllContracts();
    const PROTOCOL_CONTRACTS = contracts["protocols"];

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

const buyAndMintItemEthers = async ({ signer, chainId, NFT }) => {
  try {
    const contracts = await getAllContracts();
    const PROTOCOL_CONTRACTS = contracts["protocols"];

    const protocolContract = new Contract(
      PROTOCOL_CONTRACTS[chainId],
      NFTMarketplace_metadata["output"]["abi"],
      signer
    );

    await (
      await protocolContract.buyAndMint(
        await signer.getAddress(),
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
    ).wait();

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
  approveERC20Ethers,
  buyAndMintItem,
  buyAndMintItemEthers,
};
