"use client";
import React from "react";
import "./Home.css";
import About from "../About/About";
import { FaChevronDown } from "react-icons/fa";

function Home() {
  const about = React.useRef(null);

  const scrollToAbout = (elementReference) => {
    window.scrollTo({
      top: elementReference.current.offsetTop,
      behaviour: "smooth",
    });
  };

  return (
    <div className="home-page">
      <div className="welcome-block">
        <h1>Welcome</h1>
      </div>
      <div className="chevron">
        <button
          onClick={() => {
            scrollToAbout(about);
          }}
          className="chevron-button"
        >
          Click Me
          <FaChevronDown />
        </button>
      </div>
      <div ref={about}>
        <About />
      </div>
    </div>
  );
}

export default Home;
