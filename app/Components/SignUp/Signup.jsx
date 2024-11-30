"use client";

import React from "react";
import "./Signup.css";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

export default function Signup() {
  return (
    // <div className="signup-form">
    //   <h1>Sign Up</h1>
    //   <div className="signup-box">
    //     <form>
    //       <input name="username" placeholder="Username" />
    //       <input name="password" placeholder="Password" />
    //       <input name="reenter-password" placeholder="Re-enter Password" />
    //       <button type="submit">Enter</button>
    //     </form>

    //     <div>
    //       <h3>Or sign up with Google!</h3>
    //       <button className="GoogleAuth"></button>
    //     </div>
    //   </div>
    // </div>
    <div className="signup-form">
      <SignUp.Root>
        <h1>Sign Up</h1>
        <div className="signup-box">
          <SignUp.Step name="start">
            <Clerk.Field name="username">
              <Clerk.Label>Username</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError />
            </Clerk.Field>

            <Clerk.Field name="password">
              <Clerk.Label>Password</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError />
            </Clerk.Field>

            <SignUp.Action submit>Sign up</SignUp.Action>

            <Clerk.Connection name="google">
              <Clerk.Icon className="auth-icon" />
            </Clerk.Connection>
          </SignUp.Step>
        </div>
      </SignUp.Root>
    </div>
  );
}
