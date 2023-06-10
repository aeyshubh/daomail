import { ethers } from "ethers";
import "../Home/style.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Home/style.css"
import Header from "../../components/Header/Header";
import { Select } from '@chakra-ui/select'
import { useState } from "react";
import abi from "../abi/abi.json";
import { useEffect } from "react";
function Profile() {
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const [d,setD] = useState('');
let a = [];
const [d2,setD2] = useState(a);
const [d3,setD3] = useState('');
  const contractAddress = process.env.REACT_APP_CONTRACT;
  const contract = new ethers.Contract(contractAddress, abi, signer);
  async function set(){
    var addr = await signer.getAddress();
   const data = await contract.daoMapping(addr);//add 0 in the updates contract
a = await contract.participants();
const data3 = await contract.currentProposalId(parseInt(data.id));

setD(data);
setD2(a);
setD3(data3);
  }

useEffect(()=>{
set();
})
  return (
    <div className="container2">
      <Header />
      <div className="c2">
        <h2>DAO Profile</h2>
    <p>
        <h2>Dao Name:{d.name}</h2>
        <h2>Description:{d.desc}</h2>
        <h2>Dao ID:{parseInt(d.id)}</h2>
        <h2>Dao Admin:{d.admin}</h2>
        <h2>Participants</h2>
        {
        d2.map(data=> <li>{data}</li>)
        
        }
        <h2>Proposals Created :{parseInt(d3)} </h2>

    </p>
      </div>

    </div>
  );
}
export default Profile;