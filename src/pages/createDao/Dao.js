import { ethers } from "ethers";
import "../Home/style.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/Header/Header";


import abi from "../abi/abi.json";
function CreateDao() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
console.log("Address",process.env.REACT_APP_CONTRACT);
  const contractAddress = process.env.REACT_APP_CONTRACT;
  const contract = new ethers.Contract(contractAddress, abi, signer);
  async function Dao() {
    var name = document.getElementById("name").value;
    var desc = document.getElementById("desc").value;
    var addr = (document.getElementById("members").value).split(",");
    console.log("addr",addr);
     const tx = await contract.createDao(name, desc,addr);//add 0 in the updates contract
    console.log("Tx Hash", tx.hash); 
    var strr = "https://goerli.etherscan.io/tx/"+tx.hash;
    toast(<a href={strr}>Goerli Scan LInk</a>, {
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
        <h2>Create DAO</h2>
        <input type="text" id="name" placeholder="DAO Name"></input>
        <br />
        <input type="text" id="desc" placeholder="DAO Descripton"></input>
        <br />
        <textarea rows={5} cols ={70} id="members" placeholder="Member Address"></textarea>
        <br />
      </div>

      <button onClick={Dao}>Create Dao</button>
      <br />
    </div>
  );
}
export default CreateDao;