import React from "react";
import { Link } from "react-router-dom";
import logo from "../Logo/logo.png";
import "../App.css";

function Navbar() {
  return (
    <header>
      <div className="netflixLogo">
        <Link id="logo" to="/">
          <img src={logo} alt="Logo Image" />
        </Link>
      </div>

      <nav className="main-nav">
        <Link to="/">Home</Link>
        <a href="/#tvShows">TV Shows</a>
        <a href="/#movies">Movies</a>
        <a href="/#anime">Anime</a>
        <a href="/#originals">Originals</a>
        <Link to="/watchlist">Watchlist</Link>
      </nav>
    </header>
  );
}

export default Navbar;
