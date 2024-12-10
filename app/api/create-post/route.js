import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageURL = searchParams.get("imageURL");

  var postId = 0;

  try {
    if (!imageURL) {
      throw new Error("imageURL is required");
    }

    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated!");
    }

    var post_result =
      await sql`INSERT INTO Posts (user_id, image_url, likes, laughs, loves, dislikes) VALUES (${userId}, ${imageURL}, ${0}, ${0}, ${0}, ${0}) RETURNING post_id;`;
    postId = post_result.rows[0].post_id;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const post = await sql`SELECT * FROM Posts WHERE post_id = ${postId};`;
  return NextResponse.json({ post }, { status: 200 });
}
