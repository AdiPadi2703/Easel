import React from "react";
import Post from "./Post";
import "./Posts.css";
import { FaCircle } from "react-icons/fa";
import { auth, currentUser } from "@clerk/nextjs/server";

async function Posts() {
  async function getPosts() {
    try {
      const { userId } = await auth();

      const response = await fetch(
        `https://easel-alpha.vercel.app/api/get-posts/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userId}`,
          },
          next: { revalidate: 300 },
        }
      );

      const response_json = await response.json();

      return response_json.posts.rows;
    } catch (error) {
      console.log("Failed to fetch posts!");
      return [];
    }
  }

  const posts = await getPosts();

  return (
    <div className="posts">
      <h1>Posts</h1>

      <div>
        {posts.map((post, index) => {
          return <Post key={index} src={post.image_url} />;
        })}
      </div>
    </div>
  );
}

export default Posts;
