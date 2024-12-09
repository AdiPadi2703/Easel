import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageURL = searchParams.get("imageURL");
  const userID = searchParams.get("userID");

  var imageID = 0;
  var postID = 0;

  try {
    if (!imageURL || !userID)
      throw new Error("userID and imageURL names required");
    var image_result =
      await sql`INSERT INTO Images (image_url, user_id) VALUES (${imageURL}, ${userID}) RETURNING image_id;`;
    imageID = image_result.rows[0].image_id;
    var post_result =
      await sql`INSERT INTO Posts (user_id, image_id, likes, laughs, loves, dislikes) VALUES (${userID}, ${imageID}, ${0}, ${0}, ${0}, ${0}) RETURNING post_id;`;
    postID = post_result.rows[0].post_id;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const post = await sql`SELECT * FROM Posts WHERE post_id = ${postID};`;
  return NextResponse.json({ post }, { status: 200 });
}
