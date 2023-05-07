import "./App.css";
import { useContext, useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import HTMLRenderer from "react-html-renderer";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { goerli, polygonMumbai } from "wagmi/chains";
import Home from "./pages/Home/Home";
import "@rainbow-me/rainbowkit/styles.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./context/Auth";
import CreateMail from "./components/CreateMail/CreateMail";
import "react-toastify/dist/ReactToastify.css";
import { Chat } from "@pushprotocol/uiweb";
import { ethers } from "ethers";
import { ToastContainer } from "react-toastify";
import Body from "./components/Body/Body";
import Home2 from "./pages/NewPage/Home2";
import GroupChat from "./pages/GroupChat/GroupChat";

const { chains, provider } = configureChains(
  [goerli, polygonMumbai],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App(props) {
  
  // const { address } = useContext(Auth);
  const {address} = useAccount()
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const _signer = provider.getSigner();

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        {/* <div>
        <button onClick={exportHtml}>Export HTML</button>
         <button onClick={saveDesign}>Save Design</button> 
      </div> */}

        {/* {htmll && <HTMLRenderer html={htmll} /> } */}

        {/* <EmailEditor ref={emailEditorRef} /> */}
        <div className="app">
          <Routes>
            <Route exact path="/" element={<Home2 />} />
            <Route exact path="/send_mail" element={<Home />} />
            <Route exact path="/group_chat" element={<GroupChat />} />
          </Routes>
        </div>
        <Chat
          account={address}
          supportAddress="db30cc35f8ffebd917bea5ad8161baa702423c04a3e84509b966e544d6a4037e"
          env="staging"
          signer={_signer}
        />
        <ToastContainer autoClose={4000} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
