import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal, Web3Button } from "@web3modal/react";
// import { useWeb3Modal } from '@web3modal/react'
import {
  polygonMumbai,
  bscTestnet,
  arbitrum,
  mainnet,
  polygon,
} from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig, useAccount } from "wagmi";

const chains = [bscTestnet, polygonMumbai, arbitrum, mainnet, polygon];
const projectId = "58a22d2bc1c793fc31c117ad9ceba8d9";
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
function ConnectButton() {
  // const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  // const refreshPage = () => window.location.reload();
  const disconnectWeb3Modal = () => {
    window.localStorage.removeItem("connectedAccount");
    // navigate("/");
  };

  const connectWeb3Modal = () => {
    setIsConnected(true);
    if (account.address) {
      localStorage.setItem("connectedAccount", account.address);
      if (isConnected) {
        // navigate("/dashboard/");
      }
    }
  };
  const account = useAccount({
    // onSettled(data) {
    //    console.log('Address1:', data.address)
    // },
    onDisconnect() {
      window.localStorage.removeItem("connectedAccount");
      // navigate('/');
      disconnectWeb3Modal();
      // refreshPage();
    },
  });

  useEffect(() => {
    connectWeb3Modal();
    //     if (account.address) {
    //       localStorage.setItem('connectedAccount', account.address);
    //       navigate('/dashboard/');
    //       // const newAddress = localStorage.getItem('connectedAccount');
    //       // console.log('newaddr',newAddress)
    //             //  <Navigate to='/dashboard/'/>
    //       }
  }, [account.address]);
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3Button />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
export default ConnectButton;
