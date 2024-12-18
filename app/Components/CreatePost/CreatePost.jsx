import React from "react";
import Dropzone from "./Dropzone";
import "./CreatePost.css";

function CreatePost() {
  async function formHandler() {
    "use server";
  }

  return (
    <div className="create-post-container">
      <h1>Create Post</h1>
      <div className="create-post-box">
        <Dropzone />
      </div>
    </div>
  );
}

export default CreatePost;
