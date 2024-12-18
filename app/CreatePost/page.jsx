import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import CreatePost from "../Components/CreatePost/CreatePost";

function CreatePage() {
  return (
    <div>
      <Navbar tab="create" />
      <CreatePost />
    </div>
  );
}

export default CreatePage;
