import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Login from "../../Components/LogIn/Login";

export default function LogIn() {
  return (
    <div>
      <Navbar tab="login" />
      <Login />
    </div>
  );
}
