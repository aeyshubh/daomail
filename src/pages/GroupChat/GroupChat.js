import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";
import "../Home/style.css";
import Header from "../../components/Header/Header";
import { Wallet } from "@ethersproject/wallet";
import { Mailchain } from "@mailchain/sdk";
import { Context, ContextParams } from "@aragon/sdk-client";
import { ContextPlugin, MultisigClient } from "@aragon/sdk-client";
import { useAccount } from "wagmi";

var addr;

async function fetchGroup() {
  const response = await PushAPI.chat.getGroupByName({
    groupName: document.getElementById("gname").value,
    env: "staging",
  });
  console.log(response);
}
async function createGroup() {
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
        headers: { "X-API-KEY": process.env.REACT_APP_IPFS || "" },
      },
    ],
    // Don't change this line. This is how we connect your app to the Aragon subgraph.
    graphqlNodes: [
      {
        url: "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mumbai/api",
      },
    ],
  };
  const context = new Context(contextParams);

  const contextPlugin = ContextPlugin.fromContext(context);
  const multisigClient = new MultisigClient(contextPlugin);
  const daoAddressorEns = "0x14b6728571e0f47a0469496c33f696f7434e6a57";
  const multisigMembers = await multisigClient.methods.getMembers(
    daoAddressorEns
  );
    console.log( multisigMembers);

  var gName = document.getElementById("name").value;
  var gDesc = document.getElementById("desc").value;
  var gImg = document.getElementById("img").value;
  var gStatus = parseInt(document.getElementById("status").value);
  var gPublic;

  if (gStatus == 0) {
    gPublic = false;
  } else {
    gPublic = true;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const _signer = provider.getSigner();

  const user = await PushAPI.user.get({
    account: "eip155:0x07cC2e02D7b1A36091f36add0aEB0D5317DDB261",
    env: "staging", // remove when in production
  });

  const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: _signer,
  });

  const response = await PushAPI.chat.createGroup({
    groupName: gName,
    groupDescription: gDesc,
    groupImage: gImg,
    members: multisigMembers,
    admins: "0xc91a35AF656EA0329aEbB38fc618c4177b96142c",
    isPublic: gPublic,
    account:"0x07cC2e02D7b1A36091f36add0aEB0D5317DDB261",
    pgpPrivateKey: pgpDecryptedPvtKey, //decrypted private key
    env: "staging", // remove when in production
  });

  console.log(response);
  console.log("Group Created!");
  alert("Group Created!");
}

function GroupChat() {
  const {address} = useAccount();
  
  return (
    <div className="container">
      <Header />
      <div className="c2">
        <input type="text" id="name" placeholder="Name"></input>
        <br />
        <input type="text" id="desc" placeholder="Descripton"></input>
        <br />
        <input type="text" id="img" placeholder="Image URL"></input>
        <br />
        <input type="number" id="status" placeholder="isPublic 0 or 1"></input>
        <br />

        <button onClick={createGroup}>Create Group</button>
        <br />
      </div>
    </div>
  );
}

export default GroupChat;
