import React from "react";
import "./Signup.css";

function Signup() {
  return (

    <div className="signup-form">
      <h1>Sign Up</h1>
      <div className="signup-box">
        
        <form>
          <input name="username" placeholder="Username" />
          <input name="password" placeholder="Password" />
          <input name="reenter-password" placeholder="Re-enter Password" />
          <button type="submit">Enter</button>
        </form>

        <div>
          <h3>Or sign up with Google!</h3>
          <button className="GoogleAuth"></button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
