const { utils } = require("ethers");

const { STORAGE_MESSAGE, STORAGE_PREFIX } = require("../constants");

const getUserProof = async ({ web3, walletAddress, cached = true }) => {
  let userProof = {};
  const label = `${STORAGE_PREFIX}${walletAddress.toLowerCase()}`;

  if (!!cached) {
    const tmp = localStorage.getItem(label);
    if (!!tmp) {
      userProof = await JSON.parse(tmp);
    }
  }

  if (
    !userProof.signature ||
    utils.verifyMessage(STORAGE_MESSAGE, userProof.signature).toLowerCase() !==
      walletAddress
  ) {
    if (!!cached) {
      localStorage.removeItem(label);
    }

    const signature = await web3.eth.personal.sign(
      STORAGE_MESSAGE,
      walletAddress
    );
    userProof = {
      signature: signature,
      walletAddress: walletAddress,
    };
  }

  if (!!cached) {
    localStorage.setItem(label, JSON.stringify(userProof));
  }

  return userProof;
};

const getUserProofEthers = async ({ signer, walletAddress, cached = true }) => {
  let userProof = {};
  const label = `${STORAGE_PREFIX}${walletAddress.toLowerCase()}`;

  if (!!cached) {
    const tmp = localStorage.getItem(label);
    if (!!tmp) {
      userProof = await JSON.parse(tmp);
    }
  }

  if (
    !userProof.signature ||
    utils.verifyMessage(STORAGE_MESSAGE, userProof.signature).toLowerCase() !==
      walletAddress
  ) {
    if (!!cached) {
      localStorage.removeItem(label);
    }

    const signature = await signer.signMessage(STORAGE_MESSAGE);
    userProof = {
      signature: signature,
      walletAddress: walletAddress,
    };
  }

  if (!!cached) {
    localStorage.setItem(label, JSON.stringify(userProof));
  }

  return userProof;
};

const getParsedURI = ({ uri, userProof }) => {
  if (uri.startsWith("ipfs")) {
    return uri;
  }

  const splitted = uri.split("/");
  const before = splitted.slice(0, splitted.length - 1).join("/");
  const modelName = splitted[splitted.length - 1];

  return `${before}/${userProof.signature}/${userProof.walletAddress}/${modelName}`;
};

export { getUserProof, getUserProofEthers, getParsedURI };
