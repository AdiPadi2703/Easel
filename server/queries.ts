import "server-only";
import { sql } from "@vercel/postgres";
import { del } from "@vercel/blob";
import { auth } from "@clerk/nextjs/server";

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
  id: string,
  username: string,
  email_address: string
) {
  await sql`INSERT INTO Users (user_id, username, user_email) VALUES (${id}, ${username}, ${email_address});`;
}

export async function delete_user(id: string) {
  const image_url_query_result =
    await sql`SELECT image_url FROM Posts WHERE user_id = ${id};`;
  const image_urls = image_url_query_result.rows;
  if (image_urls?.length > 0) {
    await del(image_urls.map((blob) => blob.image_url));
  }
  await sql`DELETE FROM Comments WHERE user_id = ${id};`;
  await sql`DELETE FROM Posts WHERE user_id = ${id};`;
  await sql`DELETE FROM Users WHERE user_id = ${id};`;
}

export async function update_user(
  id: string,
  username: string,
  email_address: string
) {
  await sql`UPDATE Users SET username = ${username}, user_email = ${email_address} where user_id = ${id};`;
}

export async function create_post(imageURL: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated!");
  }

  const post_result =
    await sql`INSERT INTO Posts (user_id, image_url, likes, laughs, loves, dislikes) VALUES (${userId}, ${imageURL}, ${0}, ${0}, ${0}, ${0}) RETURNING post_id;`;
  const postId = post_result.rows[0].post_id;
  return postId;
}

export async function get_post_with_post_id(postId: number) {
  const post =
    await sql`SELECT image_url, likes, laughs, loves, dislikes FROM Posts WHERE post_id = ${postId};`;
  return post;
}

export async function get_posts_with_user_id(userId: string) {
  const posts = await sql`SELECT * FROM Posts WHERE user_id = ${userId};`;
  return posts;
}

export async function get_all_images() {
  const images = await sql`SELECT image_url FROM Posts;`;
  return images;
}

export async function get_images_of_username(username: string) {
  const images =
    await sql`SELECT image_url FROM Posts NATURAL JOIN Users WHERE username = ${username};`;
  return images;
}
