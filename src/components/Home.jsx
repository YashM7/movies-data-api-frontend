import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx"
import Hero from "./Hero.jsx";
import Footer from "./Footer.jsx";

function Home(){
  return (
      <div>
        <Navbar />
        <Hero />
        <Footer />
      </div>
  )
}

export default Home;