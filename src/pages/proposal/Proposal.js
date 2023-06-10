import { ethers } from "ethers";
import "../Home/style.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Home/style.css"
import Header from "../../components/Header/Header";
import { Select } from '@chakra-ui/select'

import abi from "../abi/abi.json";
function Proposal() {
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
console.log("Address",process.env.REACT_APP_CONTRACT);
  const contractAddress = process.env.REACT_APP_CONTRACT;
  const contract = new ethers.Contract(contractAddress, abi, signer);
  async function set(){
    var id = parseInt(document.getElementById("sel").value);
    var name = document.getElementById("name").value;
    var desc = document.getElementById("desc").value;
    var date = parseInt(document.getElementById("date").value);
    var address = document.getElementById("address").value;
    var amt = document.getElementById("amt").value;
    const tx = await contract.createProposal(id,name,desc,date,address,amt);//add 0 in the updates contract
    console.log("Tx Hash", tx.hash); 
    var strr = "https://goerli.etherscan.io/tx/"+tx.hash;
    toast(<a href={strr}>Goerli Scan Link </a>, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "white",
      });
  }
  return (
    <div className="container2">
      <Header />
      <div className="c2">
        <h2>Create Proposal</h2>
        <div class = "bb3">
        <Select placeholder='Select option' id ="sel">
          <option value='0'>Developer Dao</option>
          <option value='1'>Lear Web3 DAO</option>
          <option value='2'>Tornado Cash DAO</option>
        </Select>
        </div>
        <input type="text" id="name" placeholder="Proposal Name"></input>
        <br />
        <input type="text" id="desc" placeholder="Proposal Description"></input>
        <br />
        <input type="number" id="date" placeholder="Ending Date"></input>
        <br />
        <input type="text" id="address" placeholder="Receiver's Address"></input>
        <br />
        
        <input type="number" id="amt" placeholder="Amount to Transfer"></input>
        <br />
        <button onClick={set}>Create Proposal</button>
        <br />
      </div>

    </div>
  );
}
export default Proposal;