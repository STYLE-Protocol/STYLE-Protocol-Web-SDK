exports.getRequestedNFTs =
  require("../dist/services/contractService").getRequestedNFTs;
exports.getRequestedSingularNFTs =
  require("../dist/services/contractService").getRequestedSingularNFTs;
exports.approveERC20 = require("../dist/services/contractService").approveERC20;
exports.buyItem = require("../dist/services/contractService").buyItem;
exports.buyAndMintItem =
  require("../dist/services/contractService").buyAndMintItem;
exports.getUserProof = require("../dist/services/storageService").getUserProof;
exports.getParsedURI = require("../dist/services/storageService").getParsedURI;
