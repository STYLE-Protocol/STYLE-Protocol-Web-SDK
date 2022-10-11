import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";

import {
  getRequestedNFTs,
  getListedNFTs,
  approveERC20,
  buyItem,
  buyAndMintItem,
} from "../services/contractService";

import Card from "../components/Card";
import PropertySelector from "../components/PropertySelector";
import {
  Text,
  Box,
  VStack,
  Flex,
  Wrap,
  Center,
  Divider,
  Spinner,
} from "@chakra-ui/react";

import { metaversesJson } from "../constants";

import { AppContext } from "../contexts/AppContext";

export default function Home() {
  const {
    walletAddress,
    web3,
    chainId,
    isLoading,
    setIsLoading,
    checkIfWalletIsConnected,
    connectWallet,
  } = useContext(AppContext);

  const [requestedNFTs, setRequestedNFTs] = useState([]);
  const [listedNFTs, setListedNFTs] = useState([]);
  const [metaverseFilter, setMetaverseFilter] = useState([]);

  const allProperties = {
    METAVERSE: metaversesJson.map((cur) => {
      return { name: cur.name, slug: cur.slug };
    }),
  };

  const allSetters = {
    METAVERSE: setMetaverseFilter,
  };

  const fetchRequestedNFTs = async (cursor, amount, chainId_, metaverse_) => {
    setIsLoading(true);
    setRequestedNFTs([]);
    const requestedNFTs_ = await getRequestedNFTs({
      cursor,
      amount,
      chainId: chainId_,
      metaverseFilter: metaverse_,
    });
    setRequestedNFTs(requestedNFTs_);
    setIsLoading(false);
  };

  const fetchListedNFTs = async (cursor, amount, chainId_, metaverse_) => {
    setIsLoading(true);
    setListedNFTs([]);
    const listedNFTs_ = await getListedNFTs({
      cursor,
      amount,
      chainId: chainId_,
      metaverseFilter: metaverse_,
    });
    setListedNFTs(listedNFTs_);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRequestedNFTs(0, 100, chainId || 5, metaverseFilter);
    fetchListedNFTs(0, 100, chainId || 5, metaverseFilter);
  }, [chainId, metaverseFilter]);

  const onBuyAndMint = async (NFT) => {
    setIsLoading(true);
    try {
      await preBuy();
      await approveERC20({
        web3,
        walletAddress,
        chainId: chainId || 5,
        NFT,
      });

      await buyAndMintItem({ web3, walletAddress, chainId: chainId || 5, NFT });

      fetchRequestedNFTs(0, 100, chainId || 5, metaverseFilter);
    } catch (error) {
      console.log("buyAndMintError", error);
    }
    setIsLoading(false);
  };

  const onBuy = async (NFT) => {
    setIsLoading(true);
    try {
      await preBuy();
      await approveERC20({
        web3,
        walletAddress,
        chainId: chainId || 5,
        NFT,
      });

      await buyItem({ web3, walletAddress, chainId: chainId || 5, NFT });

      fetchListedNFTs(0, 100, chainId || 5, metaverseFilter);
    } catch (error) {
      console.log("buyError", error);
    }
    setIsLoading(false);
  };

  const preBuy = async () => {
    if (!(await checkIfWalletIsConnected())) {
      await connectWallet();
    }
  };

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
          <VStack w={"20%"} borderRight={"solid"} borderWidth={"3px"}>
            {Object.keys(allProperties).map((property, key) => (
              <Box key={key}>
                <PropertySelector
                  name={property}
                  properties={allProperties[property]}
                  setter={allSetters[property]}
                />
                <Divider orientation="horizontal" />
              </Box>
            ))}
          </VStack>
          <Center w={"100%"}>
            {!isLoading ? (
              <Wrap>
                {listedNFTs.map((NFT, key) => (
                  <Box key={key}>
                    <Card
                      name={NFT.asset.name}
                      animation_url={NFT.asset.animation_url}
                      properties={{ Metaverse: NFT.metaverse }}
                      onClickFunction={() => onBuy(NFT)}
                      availiableDerivatives={1}
                    />
                  </Box>
                ))}
                {requestedNFTs.map((NFT, key) => (
                  <Box key={key}>
                    <Card
                      name={NFT.asset.name}
                      animation_url={NFT.asset.animation_url}
                      properties={{
                        Metaverse: metaversesJson
                          .filter((cur) => cur.id === `${NFT.metaverseId}`)[0]
                          .slug.toLowerCase(),
                      }}
                      onClickFunction={() => onBuyAndMint(NFT)}
                      availiableDerivatives={NFT.numberOfDerivatives}
                    />
                  </Box>
                ))}
                {listedNFTs.length === 0 && requestedNFTs.length === 0 && (
                  <Text fontSize={"1.15rem"} fontWeight={"600"}>
                    No items to buy.
                  </Text>
                )}
              </Wrap>
            ) : (
              <Center>
                <Spinner size={"lg"} />
              </Center>
            )}
          </Center>
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
