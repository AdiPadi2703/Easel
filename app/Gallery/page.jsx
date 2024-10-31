import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Gallery from "../Components/Gallery/Gallery";

function GalleryPage() {
  return (
    <div>
      <Navbar tab="gallery" />
      <Gallery />
    </div>
  );
}

export default GalleryPage;