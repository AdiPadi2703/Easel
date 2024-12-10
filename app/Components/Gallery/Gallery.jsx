"use client";
import React from "react";
import { IoClose } from "react-icons/io5";
import "./Gallery.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

function Gallery(props) {
  const [curr_image, setCurrImage] = React.useState("");
  const [show_prompt, setShowPrompt] = React.useState(false);
  const [view_image, setViewImage] = React.useState(false);
  const images = props.images;

  function togglePrompt() {
    setShowPrompt(!show_prompt);
  }

  function toggleView() {
    if (show_prompt) {
      setShowPrompt(!show_prompt);
    }
    setViewImage(!view_image);
  }

  function updateCurrImage(event) {
    const image = event.target.currentSrc;
    setCurrImage(image);
    togglePrompt();
  }

  return (
    <div className="gallery-box">
      <div className="gallery-heading">
        <h1>Gallery</h1>
      </div>
      <div className="gallery-images">
        <ul>
          {images.map((image, index) => {
            return (
              <li key={index}>
                <img
                  src={image.image_url}
                  onClick={updateCurrImage}
                  draggable="false"
                />
              </li>
            );
          })}
        </ul>
      </div>
      {show_prompt ? (
        <div className="overlay-prompt">
          <div className="prompt-box">
            <button onClick={togglePrompt} className="prompt-exit-button">
              <IoClose style={{ fontSize: "30" }} />
            </button>
            <button className="prompt-button" onClick={toggleView}>
              View Image
            </button>
            <SignedIn>
              <button className="prompt-button">View Post</button>
            </SignedIn>
            <SignedOut>
              <button className="prompt-button">
                <Link style={{ color: "black" }} href="/Login">
                  Login to view posts!
                </Link>
              </button>
            </SignedOut>
          </div>
        </div>
      ) : null}
      {view_image ? (
        <div className="overlay-image">
          <button onClick={toggleView} className="view-exit-button">
            <IoClose style={{ fontSize: "30" }} />
          </button>
          <div className="view-image">
            <img src={curr_image} draggable={false} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Gallery;
