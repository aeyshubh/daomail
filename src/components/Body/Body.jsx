import React from 'react'
import './style.css'
import DAOList from '../DAOList/DAOList'
import MailList from '../Mails/MailList'
const Body = () => {
  return (
    <div className='body'>
      {/* <DAOList /> */}
      <MailList />
    </div>
  )
}

export default Body
