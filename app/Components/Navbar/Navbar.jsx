import React from "react";
import { MdLogin } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";

import "./Navbar.css";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <Link href="/">
            <div className="link-item">
              <div className="link-text">Easel</div>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className={props.tab === "home" ? "active" : null} href="/">
            <div className="link-item">
              <FaHome className="icon" />
              <div className="link-text">Home</div>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={props.tab === "posts" ? "active" : null}
            href="/Posts"
          >
            <div className="link-item">
              <FaRegComment className="icon" />
              <div className="link-text">Posts</div>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={props.tab === "gallery" ? "active" : null}
            href="/Gallery"
          >
            <div className="link-item">
              <GrGallery className="icon" />
              <div className="link-text">Gallery</div>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <SignedOut>
            <Link
              className={props.tab === "login" ? "active" : null}
              href="/Login"
            >
              <div className="link-item">
                <MdLogin className="icon" />
                <div className="link-text">Log In</div>
              </div>
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="link-item">
              <div className="user-icon">
                <UserButton />
              </div>
              <div className="link-text">User</div>
            </div>
          </SignedIn>
        </li>
        <SignedOut>
          <li className="nav-item">
            <Link
              className={props.tab === "signup" ? "active" : null}
              href="/Signup"
            >
              <div className="link-item">
                <FaFilePen className="icon" />
                <div className="link-text">Sign Up</div>
              </div>
            </Link>
          </li>
        </SignedOut>
        <li className="nav-item">
          <Link
            className={props.tab === "admin" ? "active" : null}
            href="/Admin"
          >
            <div className="link-item">
              <FaUserCircle className="icon" />
              <div className="link-text">Admin</div>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
