import React from "react";
import logo from "../Logo/logo.png";
import "../App.css"

function Navbar() {
    return (
        <header>
      <div className="netflixLogo">
        <a id="logo" href="/#home"><img src={logo} alt="Logo Image" /></a>
      </div>      
      <nav className="main-nav">                
        <a href="/#home">Home</a>
        <a href="/#tvShows">TV Shows</a>
        <a href="/#movies">Movies</a>
        <a href="/#anime">Anime</a>
        <a href="/#originals">Originals</a>
        <a href="/watchlist">Watchlist</a>   
      </nav>    
    </header>
    )
}

export default Navbar;