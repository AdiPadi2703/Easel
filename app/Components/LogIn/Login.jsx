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
            <Clerk.Connection name="google">
              <Clerk.Icon className="auth-icon" />
            </Clerk.Connection>

            {/* <Clerk.Field name="identifier">
              <Clerk.Label>Email</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError />
            </Clerk.Field>

            <SignIn.Action submit>Continue</SignIn.Action> */}
          </SignIn.Step>

          {/* check docs for multifactor authentication additions // check docs for
        password support */}
          <button>
            <Link className="ref-link" href="/Signup">
              You new? Sign up here!
            </Link>
          </button>
        </div>
      </SignIn.Root>
    </div>
  );
}
