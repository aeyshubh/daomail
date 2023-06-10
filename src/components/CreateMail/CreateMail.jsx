import React, { useContext, useEffect, useState, useRef } from "react";
import './style.css'
import { Select } from '@chakra-ui/select';
import abi from "../../pages/abi/abi.json"
import { ethers,Contract } from "ethers";
import { Mailchain } from "@mailchain/sdk";
import Auth from "../../context/Auth";
import EmailEditor from "react-email-editor";
import HTMLRenderer from "react-html-renderer";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const CreateMail = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = process.env.REACT_APP_CONTRACT;
  const contract = new ethers.Contract(contractAddress, abi, signer);
var mails = [];
  const { HTML, SETHTML } = useContext(Auth);
  const emailEditorRef = useRef(null);
  // const [data, setData] = useState({});
  const navigate = useNavigate();

    async function getData(html) {
      var data = await contract.participants();
    for (var i = 0; i < data.length; i++) {
      mails.push(data[i] + "@ethereum.mailchain.com");
      //mails.push(mails[i]);
    }
  
    const mailchain = Mailchain.fromSecretRecoveryPhrase(
      process.env.REACT_APP_SECRET_RECOVERY_PHRASE
    );
console.log( process.env.REACT_APP_SECRET_RECOVERY_PHRASE);
    const user = await mailchain.user();
    console.log("user is ", user);
    const result = await mailchain.sendMail({
      from: user.address,
      to: mails,
      subject: "A New DAO Proposal",
      content: {
        text: `Please Refer to the new proposal`,
        html,
      },
    });
    console.log(result);
  }

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      getData(html);
      toast.success(`Proposal sent successfully`, {
        position: toast.POSITION.TOP_RIGHT
      });
      //console.log("exportHtml", html);
      //navigate('/')
    });
  };

  // const saveDesign = () => {
  //   emailEditorRef.current?.editor?.saveDesign((design) => {
  //     console.log('saveDesign', design);
  //     setData(design)

  //     alert('Design JSON has been logged in your developer console.');
  //   });
  // };

  useEffect(() => {}, []);

  return (
    <div className="cont2">

      {/* {htmll && <HTMLRenderer html={htmll} /> } */}

      <EmailEditor ref={emailEditorRef} />
      <div>
      <Select placeholder='Select DAO' id ="sel">
          <option value='0'>Developer Dao</option>
          <option value='1'>Lear Web3 DAO</option>
          <option value='2'>Tornado Cash DAO</option>
        </Select>
        <button onClick={exportHtml}>Send Proposal</button>
        {/* <button onClick={saveDesign}>Save Design</button>  */}
      </div>
    </div>
  );
};

export default CreateMail;
