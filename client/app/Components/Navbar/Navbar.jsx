'use client'
import React from "react";
import { FaBars } from "react-icons/fa6";
import "./Navbar.css";
import Link from "next/link";

function Navbar(props) {
  const [isClicked, setClicked] = React.useState(false);

  function toggleHamburger() {
    setClicked(!isClicked);
  }

  return (
    <header>
      <div className="navbar">
        <nav>
          <Link className="logo" href="/">
            Easel
          </Link>

          <ul className={isClicked ? "nav-links active" : "nav-links"}>
            <li>
              <Link className={props.tab === "home" ? "active" : null} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className={props.tab === "posts" ? "active" : null}
                href="/Posts"
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                className={props.tab === "gallery" ? "active" : null}
                href="/Gallery"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                className={props.tab === "signup" ? "active" : null}
                href="/Signup"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                className={props.tab === "login" ? "active" : null}
                href="/Login"
              >
                Log In
              </Link>
            </li>
          </ul>
          <div className="icon" onClick={toggleHamburger}>
            <FaBars />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
