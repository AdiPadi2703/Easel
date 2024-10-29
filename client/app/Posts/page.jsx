import React from "react";
import Posts from "../Components/Posts/Posts";
import Navbar from "../Components/Navbar/Navbar";

function PostsPage() {
  return (
    <div>
      <Navbar tab="posts" />
      <Posts />
    </div>
  );
}

export default PostsPage;