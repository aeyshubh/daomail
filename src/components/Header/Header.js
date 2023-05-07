import React, { useEffect, useContext } from "react";
import "./headerStyle.css";
import logo from "../../assets/logo3.png";
import { Link } from "react-router-dom";
import AOS from "aos";
import Auth from "../../context/Auth";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {

  const { address } = useContext(Auth)

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="header">
        <img
          src={logo}
          alt=""
          data-aos="fade-right"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="200"
        />

      <div className="nav">
        <ul>
          <li>
            <Link to="/">
              <p className="btn from-top">Home</p>
            </Link>
          </li>
          <li>
            <Link to="/group_chat">
              <p className="btn from-top">Group Chat</p>
            </Link>
          </li>
          <li>
            <Link to="/send_mail">
              <p className="btn from-top">Create Proposal</p>
            </Link>
          </li>
        </ul>
      </div>

      <ConnectButton accountStatus="avatar" chainStatus="none" showBalance={false} /> 
     
    </div>
  );
};

export default Header;
