exports.getRequestedNFTs =
  require("../dist/services/contractService").getRequestedNFTs;
exports.getRequestedSingularNFTs =
  require("../dist/services/contractService").getRequestedSingularNFTs;
exports.approveERC20 = require("../dist/services/contractService").approveERC20;
exports.approveERC20Ethers =
  require("../dist/services/contractService").approveERC20Ethers;
exports.buyAndMintItem =
  require("../dist/services/contractService").buyAndMintItem;
exports.buyAndMintItemEthers =
  require("../dist/services/contractService").buyAndMintItemEthers;
exports.getUserProof = require("../dist/services/storageService").getUserProof;
exports.getUserProofEthers =
  require("../dist/services/storageService").getUserProofEthers;
exports.getParsedURI = require("../dist/services/storageService").getParsedURI;
