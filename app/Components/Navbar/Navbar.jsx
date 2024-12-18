import React from "react";
import { MdLogin } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { RiAddBoxFill } from "react-icons/ri";
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
            <Link
              className={props.tab === "login" ? "active" : null}
              href="/Login"
            >
              <div className="link-item">
                <div className="user-icon">
                  <UserButton />
                </div>
                <div className="link-text" style={{ paddingLeft: "5px" }}>
                  Profile
                </div>
              </div>
            </Link>
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

        <SignedIn>
          <li className="nav-item">
            <Link
              className={props.tab === "create" ? "active" : null}
              href="/CreatePost"
            >
              <div className="link-item">
                <RiAddBoxFill className="icon" />
                <div className="link-text" style={{ paddingLeft: "1px" }}>
                  Post
                </div>
              </div>
            </Link>
          </li>
        </SignedIn>
      </ul>
    </nav>
  );
}

export default Navbar;
