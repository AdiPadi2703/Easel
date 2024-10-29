import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-form">
      <h1>Login</h1>
      <div className="login-box">
      <form>
        <input name="username" placeholder="Username" />
        <input name="password" placeholder="Password" />
        <button type="submit">Enter</button>
      </form>

      <div>
        <h3>Or sign in with Google!</h3>
        <button className="GoogleAuth"></button>
      </div>
      </div>
    </div>
  );
}

export default Login;
