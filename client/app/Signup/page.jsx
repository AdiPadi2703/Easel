import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Signup from "../Components/SignUp/Signup";

function SignUp() {
  return (
    <div>
      <Navbar tab="signup" />
      <Signup />
    </div>
  );
}

export default SignUp;