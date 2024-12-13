import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Gallery from "../Components/Gallery/Gallery";

async function GalleryPage(props) {
  async function getImages() {
    let response = [];

    try {
      const url = props.username
        ? `https://easel-alpha.vercel.app/api/get-images-username?username=${props.username}`
        : `https://easel-alpha.vercel.app/api/get-all-images`;

      response = await fetch(url, {
        method: "GET",
        next: {
          revalidate: 300,
        },
      });
    } catch (error) {
      console.error(error.message);
    }

    const response_json = await response.json();

    if (response_json?.images?.rows?.length > 0) {
      return response_json.images?.rows;
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
