import React from 'react'
import '../Home/style.css'
import Header from '../../components/Header/Header'
import bg from '../../assets/mail.png'
const Home2 = () => {
  return (
    <div className='container'>
        <Header />
        <img src={bg} alt="" />
        <h1>Mail proposals for your DAO community</h1>
    </div>
  )
}

export default Home2
