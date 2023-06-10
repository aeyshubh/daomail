import React from 'react'
import '../Home/style.css'
import Header from '../../components/Header/Header'
import bg from '../../assets/mail.png'
const Home2 = () => {
  return (
    <div className='container'>
        <Header />
        <img src={bg} alt="" />
        <h1>All in one DAO tool for VERSE Holders</h1>
    </div>
  )
}

export default Home2
