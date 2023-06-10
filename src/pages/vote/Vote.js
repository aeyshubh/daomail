import { Select } from '@chakra-ui/select'
import { ethers } from "ethers";
import { useState,useEffect } from 'react';
import "../Home/style.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import abi from "../abi/abi.json";
import "../Home/style.css"
import Header from "../../components/Header/Header";
function Vote() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let arr = [];
  let z =0 ;
  const [users, setUsers] = useState(arr);
const [t,sett] = useState('');
  const contractAddress = process.env.REACT_APP_CONTRACT;
  const contract = new ethers.Contract(contractAddress, abi, signer);

  async function set() {
    var id = 0;
    var currentProposalId = await contract.currentProposalId(id);
z = currentProposalId-1;
    for (var i = 0; i < currentProposalId; i++) {
      var temp = parseInt(id);
      var data = await contract.daoProposalMapping(temp,i);
      console.log("data",data);
      arr.push({ id: i, name: data.pName, description: data.desc, yesVotes: data.yes, noVotes: data.no, abstain: data.abstain, ending_Time: data.end, amount: data.amt, status: data.sts });
    }
console.log(arr);
setUsers(arr);
console.log("valuee",users);
sett("done");
}
useEffect(() => {
  set()
}, [])
const renderUsers = () => {
  if(users.length != 0){
  return users.map((user) => {
      console.log("ID",user.id);
      return <tr key={user.id} >
          <td style={{ padding: '10px', border: '1px solid black' }}>{parseInt(user.id)}</td>
          <td style={{ padding: '10px', border: '1px solid black' }}>{user.name}</td>
          <td style={{ padding: '10px', border: '1px solid black' }}>{user.description}</td>
          <td style={{ padding: '10px', border: '1px solid black' }}>{parseInt(user.yesVotes)}</td>
          <td style={{ padding: '10px', border: '1px solid black' }}>{parseInt(user.noVotes)}</td>
          <td style={{ padding: '10px', border: '1px solid black' }}>{parseInt(user.abstain)}</td>
          <td style={{ padding: '10px', border: '1px solid black' }}>{parseInt(user.ending_Time)}</td>
          <td style={{ padding: '10px', border: '1px solid black' }}>{ethers.utils.formatEther(user.amount)}</td>
          <td style={{ padding: '10px', border: '1px solid black' }}>{user.status}</td>
      </tr  >
  })
}
}
const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1)
}


const renderHeader = () => {
  if(users.length != 0){
  console.log("Users",users);
      return <tr>
      {Object.keys(users[0]).map(key => <th>{capitalize(key)}</th>)}
    </tr>
  }

}
async function set2(){
  var daoId = parseInt(document.getElementById("sel").value);
  var res = parseInt(document.getElementById("sel2").value);
  var token = "0x37D4203FaE62CCd7b1a78Ef58A5515021ED8FD84"; // Verse Token
  var tx = await contract.voteProposal(res,daoId,token,{gasLimit:300000});
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
const renderTable = () => {
  return (
    <div className="container2">
      <Header />
      <div className="c2">
        <h2>Vote for a Proposal</h2>
<br/>
    <table>
      {renderHeader()}
      <tbody>
        {renderUsers()}
      </tbody>
    </table>
    <h2>Per Vote 10 Verse Tokens</h2>
    <div class = "bb">
    <Select placeholder='Select DAO' id ="sel">
          <option value='0'>Developer Dao</option>
          <option value='1'>Lear Web3 DAO</option>
          <option value='2'>Tornado Cash DAO</option>
        </Select>
        <Select placeholder='Select Vote' id ="sel2">
          <option value='1'>Yes</option>
          <option value='2'>N0</option>
          <option value='3'>Abstain</option>
        </Select>

        <button onClick={set2} id="rr">Vote</button>
        </div>
    </div>
    </div>
  )
}

return (
  <div style={{ margin: '5000  px' }}>
     {renderTable()}
  </div>

);
}
export default Vote;