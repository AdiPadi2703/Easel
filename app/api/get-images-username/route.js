import { NextResponse } from "next/server";
import { get_images_of_username } from "../../../server/queries";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  console.log(username);

  if (!username) {
    throw new Error("Username is required!");
  }

  try {
    const images = await get_images_of_username(username);
    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
