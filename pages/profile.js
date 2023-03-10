import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { Box, Button, Flex, Link, Spinner, Text } from "@chakra-ui/react";
import Derivative from "../components/Derivative";

import {
  ENDPOINTS,
  GATEWAY,
  metaversesJson,
  MODEL_NAMES,
  PROTOCOL_CONTRACTS,
} from "../constants";

import { AppContext } from "../contexts/AppContext";

import { Alchemy, Network } from "alchemy-sdk";
import Web3 from "web3";

import Base_metadata from "../public/contracts/Base_metadata.json";
import NFTMarketplace_metadata from "../public/contracts/NFTMarketplace_metadata.json";
import { getParsedURI, getUserProof } from "../services/storageService";

export default function Home() {
  const {
    walletAddress,
    web3,
    chainId,
    isLoading,
    setIsLoading,
    checkIfWalletIsConnected,
    connectWallet,
    setIsOverlayLoading,
  } = useContext(AppContext);

  const [ownedDerivatives, setOwnedDerivatives] = useState([]);

  const getOwnedDerivatives = async (walletAddressT, chainId_) => {
    setIsLoading(true);
    try {
      const userProof = await getUserProof({
        web3: web3,
        walletAddress: walletAddress,
      });

      walletAddressT = walletAddressT.toLowerCase();
      const alchemy = new Alchemy({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
        network: { 5: Network.ETH_GOERLI }[chainId_],
      });

      const data = await alchemy.nft.getNftsForOwner(walletAddressT);

      const ownedNFTs = data?.ownedNfts;

      const web3_ = new Web3(ENDPOINTS[5]);
      const protocolContract = new web3_.eth.Contract(
        NFTMarketplace_metadata["output"]["abi"],
        PROTOCOL_CONTRACTS[5]
      );

      let values = [];
      ownedNFTs.forEach((nft) => {
        const nftContract = new web3_.eth.Contract(
          Base_metadata["output"]["abi"],
          nft.contract.address
        );
        values.push(
          (async () => {
            try {
              return await nftContract.methods.source().call();
            } catch (error) {
              return null;
            }
          })()
        );
        values.push(
          (async () => {
            try {
              return await nftContract.methods.metaverseId().call();
            } catch (error) {
              return null;
            }
          })()
        );
        values.push(
          (async () => {
            try {
              return await nftContract.methods.modelId().call();
            } catch (error) {
              return null;
            }
          })()
        );
      });

      values = await Promise.all(values);

      const valuesNew = [];
      const salts = [];
      for (let i = 0; i < values.length; i += 3) {
        if (![values[i], values[i + 1], values[i + 2]].includes(null)) {
          salts.push(
            Web3.utils.keccak256(
              Web3.utils.encodePacked(
                { value: values[i][0], type: "address" },
                { value: values[i][1], type: "uint256" },
                { value: values[i + 1], type: "uint96" },
                { value: values[i + 2], type: "uint88" },
                { value: 5, type: "uint256" } // block.chainid
              )
            )
          );
          valuesNew.push({
            sourceTokenAddress: values[i][0],
            sourceTokenId: values[i][1],
            metaverseId: values[i + 1],
            modelId: values[i + 2],
          });
        } else {
          salts.push(null);
          valuesNew.push(null);
        }
      }

      const isDerivatives = await Promise.all(
        salts.map((salt, i) =>
          (async () => {
            if (salt !== null) {
              return await protocolContract.methods
                .isDerivative(ownedNFTs[i].contract.address, salts[i])
                .call();
            } else {
              return false;
            }
          })()
        )
      );

      const derivativesTmp = [];
      await Promise.all(
        isDerivatives.map(async (isDerivative, i) => {
          if (isDerivative) {
            ownedNFTs[i].metadata = ownedNFTs[i].rawMetadata;

            if (!!ownedNFTs[i].error) {
              if (ownedNFTs[i].tokenUri.raw.slice(0, 7) === "ipfs://") {
                ownedNFTs[
                  i
                ].tokenUri.raw = `https://${GATEWAY}/ipfs/${ownedNFTs[
                  i
                ].tokenUri.raw.slice(7)}`;
              }
              let cur = await fetch(ownedNFTs[i].tokenUri.raw);
              cur = await cur.json();

              ownedNFTs[i].metadata = cur;
              ownedNFTs[i].title = cur.name;
              ownedNFTs[i].description = cur.description;
            }

            if (ownedNFTs[i].metadata.image) {
              if (ownedNFTs[i].metadata.image.slice(0, 7) === "ipfs://") {
                ownedNFTs[i].metadata.image = `https://ipfs.io/ipfs/${ownedNFTs[
                  i
                ].metadata.image.slice(7)}`;
              }
            }

            if (!!ownedNFTs[i].metadata.animation_url) {
              if (!!ownedNFTs[i].metadata.model_url) {
                console.log(ownedNFTs[i].metadata, "ownedNFTs[i].metadata");
                ownedNFTs[i].metadata.animation_url = getParsedURI({
                  uri: ownedNFTs[i].metadata.model_url,
                  userProof,
                });
              }

              if (
                ownedNFTs[i].metadata.animation_url.slice(0, 7) === "ipfs://"
              ) {
                ownedNFTs[
                  i
                ].metadata.animation_url = `https://${GATEWAY}/ipfs/${ownedNFTs[
                  i
                ].metadata.animation_url.slice(7)}`;
              }
            }

            ownedNFTs[i].asset = ownedNFTs[i].metadata;
            ownedNFTs[i].asset.image_url = ownedNFTs[i].asset.image;
            ownedNFTs[i].threed_job_file_url =
              ownedNFTs[i].metadata.animation_url;
            ownedNFTs[i].is_3djob = true;

            const metaverseId = valuesNew[i].metaverseId;
            const modelId = valuesNew[i].modelId;
            const sourceTokenAddress = valuesNew[i].sourceTokenAddress;
            const sourceTokenId = valuesNew[i].sourceTokenId;

            if ([0, 2].includes(Number(metaverseId))) {
              const alchemy = new Alchemy({
                apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
                network: Network.ETH_GOERLI,
              });

              const res = await alchemy.core.getAssetTransfers({
                fromAddress: "0x0000000000000000000000000000000000000000",
                contractAddresses: [ownedNFTs[i].contract.address],
                excludeZeroValue: false,
                category: ["erc721"],
              });

              const mintTxn = res.transfers.find(
                (x) => Number(x.tokenId) === Number(ownedNFTs[i].tokenId)
              ).hash;

              const singularClaimSign =
                protocolContract.options.jsonInterface.find((token) => {
                  return (
                    token.type === "event" && token.name === "ItemClaimSingular"
                  );
                }).signature;

              const txn = await web3_.eth.getTransactionReceipt(mintTxn);
              const isSingular = !!txn.logs.find(
                (x) => x.topics[0] === singularClaimSign
              );

              ownedNFTs[i].isSingular = isSingular;
              ownedNFTs[i].mintTxn = mintTxn;
            }

            let metaverse = metaversesJson
              .find((metaverse) => Number(metaverse.id) === Number(metaverseId))
              ?.slug.toUpperCase();

            let [type, subType] = MODEL_NAMES[modelId].split("_");
            if (subType === "null") {
              subType = "";
            }

            derivativesTmp.push({
              ...ownedNFTs[i],
              metaverse,
              type,
              subType,
              source: {
                tokenAddress: sourceTokenAddress,
                tokenId: sourceTokenId,
              },
            });
          }
        })
      );

      return derivativesTmp || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchOwnedDerivatives = async (chainId_) => {
    setIsLoading(true);
    setOwnedDerivatives([]);
    const ownedDerivatives_ = await getOwnedDerivatives(
      walletAddress,
      chainId_
    );

    console.log(ownedDerivatives_);
    setOwnedDerivatives(ownedDerivatives_);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!!walletAddress) {
      fetchOwnedDerivatives(chainId || 5);
    }
  }, [chainId, walletAddress]);

  const connectWalletHandler = async () => {
    if (!(await checkIfWalletIsConnected())) {
      await connectWallet();
    }
  };

  const viewFormat = "grid";

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="viewport-fit=cover , initial-scale=0.8, maximum-scale=0.8, user-scalable=no "
        />
        <title>$STYLE | Protocol - SDK</title>
        <meta
          name="description"
          content="Style-SDK is way to integrate with your website using HTML &amp; JS file only."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Flex>
          <Flex w={"100%"} justify={"flex-start"} direction="column">
            <Flex
              justify={"flex-end"}
              w="100%"
              h="5rem"
              px="5rem"
              borderY="solid"
              align="center"
            >
              <Link href="./">Marketplace</Link>
            </Flex>

            <Flex align={"center"} direction="column" h="100%">
              {!walletAddress ? (
                <Flex justify={"center"} align="center" h="100%">
                  <Button
                    onClick={async () => {
                      await connectWalletHandler();
                      setIsOverlayLoading(false);
                    }}
                  >
                    Connect wallet
                  </Button>
                </Flex>
              ) : !isLoading ? (
                <Flex mt="2rem" w="full" flexWrap="wrap">
                  {ownedDerivatives.map((NFT, index) => (
                    <Flex
                      key={index}
                      boxSizing="border-box"
                      p="1rem"
                      w={
                        viewFormat !== "mosaic"
                          ? viewFormat === "window"
                            ? ["full", "full", "50%", "33.33%", "25%"]
                            : ["full", "full", "33.33%", "25%", "20%"]
                          : [
                              "full",
                              "full",
                              "50%",
                              "33.33%",
                              "33.33%",
                              "25%",
                              "25%",
                            ]
                      }
                    >
                      <Derivative
                        name={NFT.asset.name}
                        animation_url={NFT.asset.animation_url}
                        image_url={NFT.asset.image}
                        properties={{
                          Metaverse: NFT.metaverse,
                        }}
                        onClickFunction={() => {}}
                        availiableDerivatives={NFT.numberOfDerivatives}
                        viewFormat={viewFormat}
                      />
                    </Flex>
                  ))}
                  {ownedDerivatives.length === 0 && (
                    <Flex w="100%" justify="center">
                      <Text fontSize={"1.15rem"} fontWeight={"600"}>
                        No owned derivatives.
                      </Text>
                    </Flex>
                  )}
                </Flex>
              ) : (
                <Flex justify={"center"} align="center" h="100%">
                  <Spinner size={"lg"} />
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <footer className={styles.footer}>
        <a
          href="https://www.protocol.style/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by $STYLE | Protocol
        </a>
      </footer>
    </div>
  );
}
