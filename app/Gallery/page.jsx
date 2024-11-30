import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Gallery from "../Components/Gallery/Gallery";

async function GalleryPage() {
  async function getImages() {
    const response = await fetch(
      `https://easel-alpha.vercel.app/api/get-images/`,
      {
        method: "GET",
        next: { revalidate: 3600 },
      }
    );
    const response_json = await response.json();
    return response_json.images.rows;
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
