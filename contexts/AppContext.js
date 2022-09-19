import React, { createContext, useMemo, useEffect, useState } from "react";
// import { ethers } from 'ethers'
import Web3 from "web3";
import { Flex, useToast } from "@chakra-ui/react";

export const AppContext = createContext();

import Loader from "react-dots-loader";
import "react-dots-loader/index.css";

export const AppProvider = ({ children }) => {
  const toast = useToast();
  // GLOBAL STATES
  const [isLoading, setIsLoading] = useState(false);
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);

  // APP CONTEXT STATES
  const [walletAddress, setWalletAddress] = useState();
  const shortAddress = useMemo(() => {
    return walletAddress
      ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(38)
      : null;
  }, [walletAddress]);
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(new Web3());
  const [chainId, setChainId] = useState(1);

  // APP CONTEXT
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        setIsOverlayLoading(false);
        return;
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setIsOverlayLoading(false);
      if (accounts?.length) {
        const provider_ = window.ethereum;
        setProvider(provider_);
        const web3_ = new Web3(provider_);
        setWeb3(web3_);
        setChainId(await web3_.eth.getChainId());
        setWalletAddress(accounts[0]);

        setIsOverlayLoading(false);
        return true;
      }
    } catch (error) {
      toast({
        title: error?.error,
        status: "error",
        position: "bottom",
        isClosable: true,
      });
      setIsOverlayLoading(false);
    }
    return false;
  };

  const connectWallet = async () => {
    try {
      if (!window?.ethereum) {
        setIsOverlayLoading(false);
        onOpen();
        return;
      }
      setIsOverlayLoading(true);
      const provider_ = window.ethereum;
      setProvider(provider_);
      const accounts = await provider_.request({
        method: "eth_requestAccounts",
      });
      const web3_ = new Web3(provider_);
      setWeb3(web3_);
      setChainId(await web3_.eth.getChainId());
      setWalletAddress(accounts[0]);

      // setIsOverlayLoading(false)
      onClose();
    } catch (error) {
      setIsOverlayLoading(false);
      toast({
        status: "error",
        title: error?.message,
        position: "bottom-right",
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        // APP CONTEXT
        isLoading,
        setIsLoading,
        isOverlayLoading,
        setIsOverlayLoading,
        checkIfWalletIsConnected,
        connectWallet,
        walletAddress,
        shortAddress,
        provider,
        web3,
        chainId,
      }}
    >
      {!isOverlayLoading ? (
        children
      ) : (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Loader color="#FFFF0F" size={10} />
        </Flex>
      )}
    </AppContext.Provider>
  );
};
