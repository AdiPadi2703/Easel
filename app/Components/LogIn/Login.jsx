"use client";

import React from "react";
import "./Login.css";
import Link from "next/link";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

export default function Login() {
  return (
    <div className="login-form">
      <SignIn.Root>
        <h1>Log In</h1>
        <div className="login-box">
          <SignIn.Step name="start">
            <Clerk.Field name="identifier">
              <Clerk.Label>Email or Username</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError style={{ color: "red" }} />
            </Clerk.Field>

            <SignIn.Action submit>Continue</SignIn.Action>

            <h3 style={{ fontSize: "15px", fontWeight: "400" }}>Or</h3>

            <Clerk.Connection className="oauth-box" name="google">
              <Clerk.Icon className="oauth-icon" />
            </Clerk.Connection>
          </SignIn.Step>

          <SignIn.Step name="verifications">
            <SignIn.Strategy name="password">
              <h3 style={{ color: "#f2f0ef" }}>Enter your password</h3>

              <Clerk.Field name="password">
                <Clerk.Label>Password</Clerk.Label>
                <Clerk.Input />
                <Clerk.FieldError style={{ color: "red" }} />
              </Clerk.Field>

              <SignIn.Action submit>Continue</SignIn.Action>
              <SignIn.Action navigate="forgot-password">
                Forgot password?
              </SignIn.Action>
            </SignIn.Strategy>

            <SignIn.Strategy name="reset_password_email_code">
              <h3 style={{ color: "#f2f0ef" }}>Check your email</h3>
              <p style={({ color: "#f2f0ef" }, { paddingBottom: "20px" })}>
                We sent a code to <SignIn.SafeIdentifier />.
              </p>

              <Clerk.Field name="code">
                <Clerk.Label>Email code</Clerk.Label>
                <Clerk.Input />
                <Clerk.FieldError style={{ color: "red" }} />
              </Clerk.Field>

              <SignIn.Action submit>Continue</SignIn.Action>
            </SignIn.Strategy>
          </SignIn.Step>

          <SignIn.Step name="forgot-password">
            <h3 style={{ color: "#f2f0ef" }}>Forgot your password?</h3>

            <SignIn.SupportedStrategy name="reset_password_email_code">
              Reset password
            </SignIn.SupportedStrategy>

            <SignIn.Action navigate="previous">Go back</SignIn.Action>
          </SignIn.Step>

          <SignIn.Step name="reset-password">
            <h3 style={{ color: "#f2f0ef" }}>Reset your password</h3>

            <Clerk.Field name="password">
              <Clerk.Label>New password</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError style={{ color: "red" }} />
            </Clerk.Field>

            <Clerk.Field name="confirmPassword">
              <Clerk.Label>Confirm password</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError style={{ color: "red" }} />
            </Clerk.Field>

            <SignIn.Action submit>Reset password</SignIn.Action>
          </SignIn.Step>

          <Link className="ref-link" href="/Signup">
            <button>You new? Sign up here!</button>
          </Link>
        </div>
      </SignIn.Root>
    </div>
  );
}
