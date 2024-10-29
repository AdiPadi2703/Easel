import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Login from "../Components/LogIn/Login";

function LogIn() {
  return (
    <div>
      <Navbar tab="login" />
      <Login />
    </div>
  );
}

export default LogIn;