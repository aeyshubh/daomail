import {React,useState} from 'react'
import './style.css'
const DAOList = () => {
const[dao,selectedDao] = useState('');

function setDao(){
  selectedDao(document.getElementById("a1").value);
}
  return (
    <div className='dao_list' id="style-4">
      <div className='daos' onClick={setDao} value="bankless" id="a1">Bankless</div>
      <div className='daos'>Push DAO</div>
      <div className='daos'>Developer DAO</div>
      <div className='daos'>Her DAO</div>
      <div className='daos'>Superteam DAO</div>
      <div className='daos'>Gujju DAO</div>
    </div>
  )
}

export default DAOList
