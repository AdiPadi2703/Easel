import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Gallery from "../Components/Gallery/Gallery";
import { sql } from "@vercel/postgres";

async function GalleryPage(props) {
  async function getImages() {
    let response = [];

    try {
      if (props.username) {
        response =
          await sql`SELECT image_url FROM Posts NATURAL JOIN Users WHERE username = ${props.username}; `;
      } else {
        response = await sql`SELECT image_url from Posts;`;
      }
    } catch (error) {
      console.error(error.message);
    }

    if (response?.rows?.length > 0) {
      return response.rows;
    } else {
      return [];
    }
  }

  const images = await getImages();

  return (
    <div>
      <Navbar tab="gallery" />
      <Gallery images={images} />
    </div>
  );
}

export default GalleryPage;
