import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";

import { getRequestedNFTs, getListedNFTs } from "../services/contractService";
import { isCommunityResourcable } from "@ethersproject/providers";

import Card from "../components/Card";
import PropertySelector from "../components/PropertySelector";
import {
  Text,
  Box,
  VStack,
  Flex,
  Button,
  Grid,
  Container,
  Wrap,
  Center,
  Divider,
  Spinner,
} from "@chakra-ui/react";

import { IDS2ENVIRONMENT, PROTOCOL_CONTRACTS } from "../constants";

import NFTMarketplace_metadata from "../public/contracts/NFTMarketplace_metadata.json";
import ERC20_ABI from "../public/contracts/ERC20_ABI.json";

import { AppContext } from "../contexts/AppContext";

import { BigNumber } from "ethers";

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
  const [metaverseFilter, setMetaverseFilter] = useState("");

  const allProperties = {
    METAVERSE: ["DECENTRALAND", "SANDBOX", "SOMNIUM_SPACE", "CRYPTOVOXELS"],
  };

  const allSetters = {
    METAVERSE: setMetaverseFilter,
  };

  const fetchRequestedNFTs = async (cursor, amount, chainId_, metaverse_) => {
    setIsLoading(true);
    const requestedNFTs_ = await getRequestedNFTs({
      cursor,
      amount,
      chainId: chainId_,
      metaverse: metaverse_,
    });
    setRequestedNFTs(requestedNFTs_);
    setIsLoading(false);
  };

  const fetchListedNFTs = async (cursor, amount, chainId_, metaverse_) => {
    setIsLoading(true);
    const listedNFTs_ = await getListedNFTs({
      cursor,
      amount,
      chainId: chainId_,
      metaverse: metaverse_,
    });
    setListedNFTs(listedNFTs_);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRequestedNFTs(0, 100, 4, "");
    fetchListedNFTs(0, 100, 4, "");
  }, []);

  useEffect(() => {
    fetchRequestedNFTs(0, 100, 4, metaverseFilter);
    fetchListedNFTs(0, 100, 4, metaverseFilter);
  }, [metaverseFilter]);

  const onBuyAndMint = async (
    paymentToken,
    payment,
    tokenAddress,
    tokenId,
    uri,
    bidder,
    environment,
    metaverseId,
    signature,
    adminSignature
  ) => {
    setIsLoading(true);
    try {
      await preBuy();
      const tokenContract = new web3.eth.Contract(
        ERC20_ABI,
        paymentToken.address
      );

      const allowance = await tokenContract.methods
        .allowance(walletAddress, PROTOCOL_CONTRACTS[chainId])
        .call();
      if (payment.value.gt(allowance)) {
        await tokenContract.methods
          .approve(PROTOCOL_CONTRACTS[chainId], payment.value)
          .send({ from: walletAddress });
      }

      const protocolContract = new web3.eth.Contract(
        NFTMarketplace_metadata["output"]["abi"],
        PROTOCOL_CONTRACTS[chainId]
      );

      await protocolContract.methods
        .buyAndMint(
          walletAddress,
          {
            tokenAddress: tokenAddress,
            tokenId: tokenId,
            payment: payment.value,
            paymentToken: paymentToken.address,
            uri: uri,
            bidder: bidder,
            environment: environment,
            metaverseId: metaverseId,
            signature: signature,
          },
          adminSignature,
          payment.value
        )
        .send({ from: walletAddress });

      fetchRequestedNFTs(0, 100, chainId, filteredMetaverse);
    } catch (error) {
      console.log("buyAndMintError", error);
    }
    setIsLoading(false);
  };

  const onBuy = async (paymentToken, payment, contract_, tokenId) => {
    setIsLoading(true);
    try {
      await preBuy();
      const tokenContract = new web3.eth.Contract(
        ERC20_ABI,
        paymentToken.address
      );

      const allowance = await tokenContract.methods
        .allowance(walletAddress, PROTOCOL_CONTRACTS[chainId])
        .call();
      if (payment.value.gt(allowance)) {
        await tokenContract.methods
          .approve(PROTOCOL_CONTRACTS[chainId], payment.value)
          .send({ from: walletAddress });
      }

      const protocolContract = new web3.eth.Contract(
        NFTMarketplace_metadata["output"]["abi"],
        PROTOCOL_CONTRACTS[chainId]
      );

      await protocolContract.methods
        .buyItem(contract_, tokenId, payment.value)
        .send({ from: walletAddress });

      fetchListedNFTs(0, 100, chainId, filteredMetaverse);
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
                {listedNFTs.map(
                  (
                    {
                      tokenId,
                      payment,
                      contract_,
                      paymentToken,
                      metaverse,
                      asset,
                    },
                    key
                  ) => (
                    <Box key={key}>
                      <Card
                        name={asset.name}
                        animation_url={asset.animation_url}
                        properties={{ Metaverse: metaverse }}
                        onClickFunction={() =>
                          onBuy(paymentToken, payment, contract_, tokenId)
                        }
                        availiableDerivatives={1}
                      />
                    </Box>
                  )
                )}
                {requestedNFTs.map(
                  (
                    {
                      tokenAddress,
                      tokenId,
                      payment,
                      paymentToken,
                      uri,
                      bidder,
                      signature,
                      environment,
                      metaverseId,
                      adminSignature,
                      asset,
                      numberOfDerivatives,
                    },
                    key
                  ) => (
                    <Box key={key}>
                      <Card
                        name={asset.name}
                        animation_url={asset.animation_url}
                        properties={{
                          Metaverse: IDS2ENVIRONMENT[metaverseId],
                        }}
                        onClickFunction={() =>
                          onBuyAndMint(
                            paymentToken,
                            payment,
                            tokenAddress,
                            tokenId,
                            uri,
                            bidder,
                            environment,
                            metaverseId,
                            signature,
                            adminSignature
                          )
                        }
                        availiableDerivatives={numberOfDerivatives}
                      />
                    </Box>
                  )
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
