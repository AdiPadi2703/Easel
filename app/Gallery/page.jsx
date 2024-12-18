import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Gallery from "../Components/Gallery/Gallery";
import { unstable_cache } from "next/cache";
import { get_all_images, get_images_of_username } from "../../server/queries";

export default async function GalleryPage(props) {
  let response = [];

  if (props.username) {
    response = unstable_cache(
      async () => {
        return get_images_of_username(props.username);
      },
      [props.username],
      {
        tags: [props.username],
        revalidate: 300,
      }
    );
  } else {
    response = unstable_cache(
      async () => {
        return get_all_images();
      },
      ["all"],
      {
        tags: ["all"],
        revalidate: 300,
      }
    );
  }

  response = await response();
  const images = response.rows;
  const metadata = {
    has_data: props.username ? true : false,
    username: props.username,
    user_avatar: props.avatar,
    total_posts: images.length,
  };

  return (
    <div>
      <Navbar tab="gallery" />
      <Gallery images={images} metadata={metadata} />
    </div>
  );
}
