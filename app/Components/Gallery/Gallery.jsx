"use client";
import React from "react";
import { IoClose } from "react-icons/io5";
import "./Gallery.css";
import Searchbar from "../Searchbar/Searchbar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { convert_to_UUID } from "../../../server/encoding_utils";
import GalleryImages from "./GalleryImages";

export default function Gallery(props) {
  const [curr_image, setCurrImage] = React.useState("");
  const [show_prompt, setShowPrompt] = React.useState(false);
  const [view_image, setViewImage] = React.useState(false);
  const [isLoading, startTransition] = React.useTransition();
  const router = useRouter();
  const images = props.images;

  function redirectHandler(query) {
    startTransition(() => {
      router.push(
        `/Gallery/post?postId=${query.post_id}&imageURL=${query.image_url}`
      );
    });
  }

  function togglePrompt() {
    setShowPrompt(!show_prompt);
  }

  function toggleView() {
    if (show_prompt) {
      setShowPrompt(!show_prompt);
    }
    setViewImage(!view_image);
  }

  async function updateCurrImage(image) {
    const uuid = await convert_to_UUID(image.post_id);
    setCurrImage({
      post_id: uuid,
      image_url: image.image_url,
    });
    togglePrompt();
  }

  return (
    <div className="gallery-box">
      <div className="gallery-heading">
        <h1>Gallery</h1>
      </div>
      <Searchbar />
      <GalleryImages images={images} image_on_click={updateCurrImage} />
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
              <button
                className="prompt-button"
                onClick={() => redirectHandler(curr_image)}
              >
                View Post
              </button>
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
            <img src={curr_image.image_url} draggable="false" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
