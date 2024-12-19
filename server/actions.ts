"use server";
import { auth } from "@clerk/nextjs/server";
import {
  add_like,
  create_comment,
  create_post,
  delete_post,
  remove_like,
} from "./queries";
import { convert_from_UUID, convert_to_UUID } from "./encoding_utils";
import { unstable_cache } from "next/cache";
import { get_usernames } from "./queries";

export async function create_post_action(
  image_url: string,
  post_description: string,
  timestamp: string
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated!");
  }

  try {
    const postId = await create_post(image_url, post_description, timestamp);
    const UUID_postId = await convert_to_UUID(postId);
    return UUID_postId;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function add_comment_action(
  postId: string,
  comment: string,
  time_of_comment: string
) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated!");
  }

  const decoded_postId = await convert_from_UUID(postId);

  try {
    await create_comment(decoded_postId, userId, comment, time_of_comment);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function search_fetch_action(username: string) {
  const response = unstable_cache(
    async () => {
      return get_usernames(username);
    },
    [username],
    {
      revalidate: 30,
      tags: [username],
    }
  );

  const searches = await response();
  return searches.rows;
}

export async function add_like_action(postId: string, timestamp: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated!");
  }

  const decoded_postId = await convert_from_UUID(postId);

  try {
    await add_like(decoded_postId, userId, timestamp);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function remove_like_action(postId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated!");
  }

  const decoded_postId = await convert_from_UUID(postId);

  try {
    await remove_like(decoded_postId, userId);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function delete_post_action(postId: string, imageURL: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated!");
  }

  const decoded_postId = await convert_from_UUID(postId);

  try {
    await delete_post(decoded_postId, imageURL);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
