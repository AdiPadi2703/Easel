import "server-only";
import { sql } from "@vercel/postgres";
import { del } from "@vercel/blob";
import { auth } from "@clerk/nextjs/server";
import { PiSwapLight } from "react-icons/pi";

/* 

  This file contains all of the database queries used. 

  This is mainly for security purposes. Some of the queries have user authentication done before querying. Some of the others may also
  have authentication handled in the files that call them. 

*/

export async function get_usernames(query: string) {
  const usernames =
    await sql` SELECT username, SIMILARITY(username, ${query}) AS similarity
      FROM Users
      WHERE lower(username) % lower(${query})
      ORDER BY similarity DESC LIMIT 5;`;

  return usernames;
}

export async function add_user(
  userId: string,
  username: string,
  email_address: string,
  user_avatar: string
) {
  await sql`INSERT INTO Users (user_id, username, user_email, user_avatar) VALUES (${userId}, ${username}, ${email_address}, ${user_avatar});`;
}

export async function delete_user(userId: string) {
  const image_url_query_result =
    await sql`SELECT image_url FROM Posts WHERE user_id = ${userId};`;
  const image_urls = image_url_query_result.rows;
  if (image_urls?.length > 0) {
    await del(image_urls.map((blob) => blob.image_url));
  }
  await sql`DELETE FROM Likes WHERE user_id = ${userId};`;
  await sql`DELETE FROM Comments WHERE user_id = ${userId};`;
  await sql`DELETE FROM Posts WHERE user_id = ${userId};`;
  await sql`DELETE FROM Users WHERE user_id = ${userId};`;
}

export async function update_user(
  userId: string,
  username: string,
  email_address: string
) {
  await sql`UPDATE Users SET username = ${username}, user_email = ${email_address} where user_id = ${userId};`;
}

export async function create_post(
  imageURL: string,
  post_description: string,
  timestamp: string
) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated!");
  }

  const post_result =
    await sql`INSERT INTO Posts (user_id, image_url,post_description, created_at) VALUES (${userId}, ${imageURL},${post_description}, ${timestamp}) RETURNING post_id;`;
  const postId = post_result.rows[0].post_id;
  return postId;
}

export async function get_reactions_with_post_id(postId: number) {
  const post = await sql`SELECT * FROM Likes WHERE post_id = ${postId};`;
  return post;
}

export async function get_all_images() {
  const images = await sql`SELECT post_id, image_url FROM Posts;`;
  return images;
}

export async function get_images_of_username(username: string) {
  const images =
    await sql`SELECT post_id, image_url FROM Posts NATURAL JOIN Users WHERE username = ${username};`;
  return images;
}

export async function create_comment(
  postId: number,
  userId: string,
  comment: string,
  time_of_comment: string
) {
  await sql`INSERT INTO Comments (post_id, user_id, comment, time_of_comment) VALUES (${postId},${userId},${comment},${time_of_comment})`;
}

export async function get_comments_with_post_id(postId: number) {
  const comments =
    await sql`SELECT username, comment, time_of_comment FROM Users NATURAL JOIN Comments WHERE post_id = ${postId} ORDER BY time_of_comment DESC;`;

  return comments;
}

export async function add_like(
  postId: number,
  userId: string,
  timestamp: string
) {
  await sql`INSERT INTO Likes (created_at, user_id, post_id) VALUES (${timestamp}, ${userId}, ${postId})`;
}

export async function remove_like(postId: number, userId: string) {
  await sql` DELETE FROM Likes WHERE user_id = ${userId} and post_id = ${postId};`;
}

export async function get_post_metadata(postId: number) {
  const response =
    await sql`SELECT user_id, username, user_avatar, post_description, created_at FROM Posts NATURAL JOIN Users WHERE post_id = ${postId};`;
  return response;
}

export async function delete_post(postId: number) {
  await sql`DELETE FROM Likes WHERE post_id = ${postId};`;
  await sql`DELETE FROM Comments WHERE post_id = ${postId};`;
  await sql`DELETE FROM Posts WHERE post_id = ${postId};`;
}
