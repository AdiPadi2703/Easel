"use client";

import React from "react";
import "./Signup.css";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

export default function Signup() {
  return (
    <div className="signup-form">
      <SignUp.Root>
        <h1>Sign Up</h1>
        <div className="signup-box">
          <SignUp.Step name="start">
            <Clerk.Field name="username">
              <Clerk.Label>Username</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError style={{ color: "red" }} />
            </Clerk.Field>

            <Clerk.Field name="emailAddress">
              <Clerk.Label>Email</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError style={{ color: "red" }} />
            </Clerk.Field>

            <Clerk.Field name="password">
              <Clerk.Label>Password</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError style={{ color: "red" }} />
            </Clerk.Field>

            <SignUp.Captcha />

            <SignUp.Action submit>Sign up</SignUp.Action>

            <h3 style={{ fontSize: "15px", fontWeight: "400" }}>Or</h3>

            <Clerk.Connection className="oauth-box" name="google">
              <Clerk.Icon className="oauth-icon" />
            </Clerk.Connection>
          </SignUp.Step>

          <SignUp.Step name="continue">
            <h3 style={{ color: "red" }}>Fill in the missing fields</h3>

            <Clerk.Field name="username">
              <Clerk.Label>Username</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError style={{ color: "red" }} />
            </Clerk.Field>

            <Clerk.Field name="emailAddress">
              <Clerk.Label>Email</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError style={{ color: "red" }} />
            </Clerk.Field>

            <Clerk.Field name="password">
              <Clerk.Label>Password</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError style={{ color: "red" }} />
            </Clerk.Field>

            <SignUp.Action submit>Continue</SignUp.Action>
          </SignUp.Step>

          <SignUp.Step name="verifications">
            <SignUp.Strategy name="email_code">
              <h3 style={{ color: "#f2f0ef" }}>Check your email</h3>

              <Clerk.Field name="code">
                <Clerk.Label>Email Code</Clerk.Label>
                <Clerk.Input />
                <Clerk.FieldError style={{ color: "red" }} />
              </Clerk.Field>

              <SignUp.Action submit>Verify</SignUp.Action>
            </SignUp.Strategy>
          </SignUp.Step>
        </div>
      </SignUp.Root>
    </div>
  );
}
