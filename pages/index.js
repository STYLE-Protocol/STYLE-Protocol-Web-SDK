import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useMemo, useState } from "react";

import { getRequestedNFTs, getListedNFTs } from "../services/contractService";
import { isCommunityResourcable } from "@ethersproject/providers";

export default function Home() {
  const [requestedNFTs, setRequestedNFTs] = useState([]);
  const [listedNFTs, setListedNFTs] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchRequestedNFTS = async (cursor, amount, chainId, metaverse) => {
    setIsLoading(true);
    const requestedNFTs_ = await getRequestedNFTs({
      cursor,
      amount,
      chainId,
      metaverse,
    });
    setQuery("requested");
    setRequestedNFTs(requestedNFTs_);
    setIsLoading(false);
  };

  const fetchListedNFTS = async (cursor, amount, chainId, metaverse) => {
    setIsLoading(true);
    const listedNFTs_ = await getListedNFTs({
      cursor,
      amount,
      chainId,
      metaverse,
    });
    setQuery("listed");
    setListedNFTs(listedNFTs_);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
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

      <main
        className={styles.main}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            gridGap: "1rem",
          }}
        >
          <button onClick={() => fetchRequestedNFTS(0, 100, 4, "")}>
            Fetch Requested NFTs
          </button>
          <button onClick={() => fetchListedNFTS(0, 100, 4, "")}>
            Fetch Listed NFTs
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isLoading ? (
            query == "requested" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Requested NFTs
                {requestedNFTs.map(
                  (
                    {
                      tokenAddress,
                      tokenId,
                      payment,
                      paymentToken,
                      tailorId,
                      jobId,
                      uri,
                      bidder,
                      signature,
                      environment,
                      metaverseId,
                      adminSignature,
                      asset,
                      cid,
                      numberOfDerivatives,
                    },
                    key
                  ) => (
                    <div
                      style={{
                        border: "solid",
                        margin: "1rem",
                        padding: "0.5rem",
                      }}
                      key={key}
                    >
                      <div>Token Address: {tokenAddress}</div>
                      <div>Token Id: {tokenId}</div>
                      <div>
                        Payment: {payment.stringValue} {paymentToken.symbol}
                      </div>
                      <div>Tailor Id: {tailorId}</div>
                      <div>Job Id: {jobId}</div>
                      <div>Token URI: {uri}</div>
                      <div>Tailor: {bidder}</div>
                      <div>Tailor Signature: {signature}</div>
                      <div>Environment: {environment}</div>
                      <div>Metaverse ID: {metaverseId}</div>
                      <div>Admin Signature: {adminSignature}</div>
                      <div>
                        Asset: <a href={asset.animation_url}>{asset.name}</a>
                      </div>
                      <div>CID: {cid}</div>
                      <div>
                        Number Of Availiable Derivatives: {numberOfDerivatives}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : query == "listed" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Listed NFTs
                {listedNFTs.map(
                  (
                    {
                      tokenId,
                      payment,
                      seller,
                      contract_,
                      paymentToken,
                      environment,
                      metaverse,
                      asset,
                    },
                    key
                  ) => (
                    <div
                      style={{
                        border: "solid",
                        margin: "1rem",
                        padding: "0.5rem",
                      }}
                      key={key}
                    >
                      <div>Token Address: {contract_}</div>
                      <div>Token Id: {tokenId}</div>
                      <div>
                        Payment: {payment.stringValue} {paymentToken.symbol}
                      </div>
                      <div>Seller: {seller}</div>
                      <div>Environment: {environment}</div>
                      <div>Metaverse: {metaverse}</div>
                      <div>
                        Asset: <a href={asset.animation_url}>{asset.name}</a>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div></div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </main>

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
