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
            <Link to="/profile">
              <p className="btn from-top">Dao Profile</p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <p className="btn from-top">Home</p>
            </Link>
          </li>
          <li>
            <Link to="/createDao">
              <p className="btn from-top">Create DAO</p>
            </Link>
          </li>
          <li>
            <Link to="/createProposal">
              <p className="btn from-top">Proposal</p>
            </Link>
          </li>
          <li>
            <Link to="/send_mail">
              <p className="btn from-top">Summary</p>
            </Link>
          </li>

          <li>
            <Link to="/vote">
              <p className="btn from-top">Vote</p>
            </Link>
          </li>

        </ul>

      </div>
      <div class="b2">
      <ConnectButton accountStatus="avatar" chainStatus="none" showBalance={false} /> 
      </div>

    </div>
  );
};

export default Header;
