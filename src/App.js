import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Wallet } from "@ethersproject/wallet";
//import dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import axios from 'axios';

import { useState, useEffect } from "react";
import { Context, ContextParams } from "@aragon/sdk-client";

import {
  ContextPlugin,
  MultisigClient
} from "@aragon/sdk-client";
const Mailchain = require('@mailchain/sdk').Mailchain; // imports the Mailchain SDK

//import { context } from "./comp1";
function App() {
  //dotenv.config()

  const IPFS_API_KEY = process.env.REACT_APP_IPFS;

  async function getData() {
    console.log("Process :" + process.env.REACT_APP_PK)
    const contextParams = {
      // Choose the network you want to use. You can use "goerli" or "mumbai" for testing, "mainnet" for Ethereum.
      network: "maticmum",
      // Depending on how you're configuring your wallet, you may want to pass in a `signer` object here.
      signer: new Wallet(process.env.REACT_APP_PK),
      // Optional on "rinkeby", "arbitrum-rinkeby" or "mumbai"
      // Pass the address of the  `DaoFactory` contract you want to use. You can find it here based on your chain of choice: https://github.com/aragon/core/blob/develop/active_contracts.json
      daoFactoryAddress: "0x3ff1681f31f68Ff2723d25Cf839bA7500FE5d218",
      // Choose your Web3 provider: Cloudfare, Infura, Alchemy, etc.
      web3Providers: ["https://rpc.ankr.com/polygon_mumbai"],
      ipfsNodes: [
        {
          url: "https://testing-ipfs-0.aragon.network/api/v0",
          headers: { "X-API-KEY": IPFS_API_KEY || "" }
        },
      ],
      // Don't change this line. This is how we connect your app to the Aragon subgraph.
      graphqlNodes: [
        {
          url:
            "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mumbai/api"
        }
      ]
    };
    const context = new Context(contextParams);


    const contextPlugin = ContextPlugin.fromContext(context);
    const multisigClient = new MultisigClient(contextPlugin);

    const daoAddressorEns = "0x14b6728571e0f47a0469496c33f696f7434e6a57"
    const multisigMembers = await multisigClient.methods.getMembers(daoAddressorEns);

    console.log({ multisigMembers });
    sendMail(multisigMembers);
  }

  async function sendMail(addr) {
    var mails = [];

    for (var i = 0; i < addr.length; i++) {
      addr[i] = addr[i] + "@ethereum.mailchain.com"
      mails.push(addr[i]);
    }
    const secretRecoveryPhrase = process.env.REACT_APP_SECRET_RECOVERY_PHRASE; // 25 word mnemonicPhrase

    const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);
   
    const user = await mailchain.user()
    console.log(user);
    /* const result = await mailchain.sendMail({
      from: user.address,
      to: mails,
      subject: 'A New DAO Proposal',
      content: {
        text: `Please Refer to the new proposal`,
        html: `<H2>I AM Inevitable</h2>`,
      }
    });

    console.log(result); */
  }
  //getData();  
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">

    </div>
  );
}

export default App;
