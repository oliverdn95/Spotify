import React from "react";
import logoSpotify from "../assets/logo/spotify-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link className="header__link" to="/">
        <img src={logoSpotify} alt="Logo Spotify" />
      </Link>

      <Link className="header__link" to="/">
        <h1>Spotify</h1>
      </Link>
    </div>
  );
};

export default Header;
