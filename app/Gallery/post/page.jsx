import Navbar from "../../Components/Navbar/Navbar";
import Post from "./Post";
import { convert_from_UUID } from "../../../server/encoding_utils";
import { auth } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";
import {
  get_comments_with_post_id,
  get_post_metadata,
  get_reactions_with_post_id,
} from "../../../server/queries";

export default async function Page({ searchParams }) {
  const { userId } = await auth();
  const { postId, imageURL } = await searchParams;

  async function getPostMetadata() {
    let result = [];

    if (!userId) {
      throw new Error("User not authenticated!");
    }

    if (!postId) {
      throw new Error("Post Id is required!");
    }

    const decoded_postId = await convert_from_UUID(postId);

    try {
      const response = unstable_cache(
        async () => get_post_metadata(decoded_postId),
        [`metadata:${decoded_postId}`],
        { revalidate: 30, tags: [`metadata:${decoded_postId}`] }
      );
      result = await response();
    } catch (error) {
      throw new Error(error.message);
    }

    if (result?.rows?.length > 0) {
      return result.rows[0];
    } else {
      return {};
    }
  }

  async function getPostReactions() {
    let result = [];

    if (!userId) {
      throw new Error("User not authenticated!");
    }

    if (!postId) {
      throw new Error("Post Id is required!");
    }

    const decoded_postId = await convert_from_UUID(postId);

    try {
      const response = unstable_cache(
        async () => {
          return get_reactions_with_post_id(decoded_postId);
        },
        [`reactions:${postId}`],
        { tags: [`reactions:${postId}`], revalidate: 10 }
      );
      result = await response();
    } catch (error) {
      throw new Error(error.message);
    }

    if (result?.rows?.length > 0) {
      return result.rows;
    } else {
      return [];
    }
  }

  async function getComments() {
    let result = [];

    if (!userId) {
      throw new Error("User not authenticated!");
    }

    if (!postId) {
      throw new Error("Post Id is required!");
    }

    const decoded_postId = await convert_from_UUID(postId);

    try {
      const response = unstable_cache(
        async () => {
          return get_comments_with_post_id(decoded_postId);
        },
        [`${postId}-comments`],
        { revalidate: 10, tags: [`${postId}-comments`] }
      );
      result = await response();
    } catch (error) {
      throw new Error(error.message);
    }

    if (result?.rows?.length > 0) {
      return result.rows;
    } else {
      return [];
    }
  }

  const post_metadata = await getPostMetadata();
  const reactions = await getPostReactions();
  const comments = await getComments();

  return (
    <div>
      <Navbar tab="gallery" />
      <Post
        postId={postId}
        src={imageURL}
        metadata={post_metadata}
        reactions={reactions}
        comments={comments}
      />
    </div>
  );
}
