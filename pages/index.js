import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import {
  approveERC20,
  buyAndMintItem,
  getRequestedNFTs,
} from "../services/contractService";

import {
  Box,
  Divider,
  Flex,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Card from "../components/Card";
import PropertySelector from "../components/PropertySelector";

import { AppContext } from "../contexts/AppContext";
import { getAllContracts } from "../services/constantsService";
import { useMemo } from "react";

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

  const [PROTOCOL_CONTRACTS, setPROTOCOL_CONTRACTS] = useState({});
  const [metaversesJson, setMetaversesJson] = useState([]);

  useEffect(() => {
    (async () => {
      const contracts = await getAllContracts();
      setPROTOCOL_CONTRACTS(contracts["protocols"]);
      setMetaversesJson(contracts["metaversesJson"]);
    })();
  }, []);

  const [requestedNFTs, setRequestedNFTs] = useState([]);
  const [metaverseFilter, setMetaverseFilter] = useState([]);

  const allProperties = useMemo(() => {
    console.log(metaversesJson, "metaversesJson");
    return {
      METAVERSE: metaversesJson?.map((cur) => {
        return { name: cur.name, slug: cur.slug };
      }),
    };
  }, [metaversesJson]);

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

  useEffect(() => {
    fetchRequestedNFTs(0, 100, chainId || 5, metaverseFilter);
    getAllContracts();
  }, [chainId, metaverseFilter]);

  const onBuyAndMint = async (NFT) => {
    setIsLoading(true);
    try {
      await connectWalletHandler();
      await approveERC20({
        web3,
        walletAddress,
        chainId: chainId || 5,
        NFT,
        spender: PROTOCOL_CONTRACTS[chainId || 5],
      });

      await buyAndMintItem({ web3, walletAddress, chainId: chainId || 5, NFT });

      fetchRequestedNFTs(0, 100, chainId || 5, metaverseFilter);
    } catch (error) {
      console.log("buyAndMintError", error);
    }
    setIsLoading(false);
  };

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
          <Flex w={"100%"} justify={"flex-start"} direction="column">
            <Flex
              justify={"flex-end"}
              w="100%"
              h="5rem"
              px="5rem"
              borderY="solid"
              align="center"
            >
              <Link href="./profile">Profile</Link>
            </Flex>

            <Flex align={"center"} direction="column" h="100%">
              {!isLoading ? (
                <Flex mt="2rem" w="full" flexWrap="wrap">
                  {requestedNFTs.map((NFT) => (
                    <Flex
                      key={NFT.cid}
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
                      <Card
                        name={NFT.asset.name}
                        animation_url={NFT.asset.animation_url}
                        image_url={NFT.asset.image}
                        properties={{
                          Metaverse: metaversesJson
                            .filter((cur) => cur.id === `${NFT.metaverseId}`)[0]
                            .slug.toLowerCase(),
                        }}
                        onClickFunction={() => onBuyAndMint(NFT)}
                        availiableDerivatives={NFT.numberOfDerivatives}
                        viewFormat={viewFormat}
                      />
                    </Flex>
                  ))}
                  {requestedNFTs.length === 0 && (
                    <Flex w="100%" justify="center">
                      <Text fontSize={"1.15rem"} fontWeight={"600"}>
                        No items to buy.
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
