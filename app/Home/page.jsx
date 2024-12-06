import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Components/Home/Home";

function HomePage(props) {
  return (
    <div>
      <Navbar tab="home" />
      <Home />
    </div>
  );
}

export default HomePage;
