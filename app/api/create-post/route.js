import { NextResponse } from "next/server";
import { create_post, get_post_with_post_id } from "../../../server/queries";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageURL = searchParams.get("imageURL");

  if (!imageURL) {
    throw new Error("Image url is required!");
  }

  let postId = 0;

  try {
    postId = await create_post(imageURL);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const post = await get_post_with_post_id(postId);
  return NextResponse.json({ post }, { status: 200 });
}
