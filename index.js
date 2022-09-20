import axios from "axios";
import Web3 from "web3";
import { BigNumber } from "ethers";

import {
  PROTOCOL_CONTRACTS,
  metaversesJson,
  NFTMarketplace_ABI,
  ERC20_ABI,
  Base_ABI,
  getRequestedNFTs,
  getListedNFTs,
} from "./services/contractService";
