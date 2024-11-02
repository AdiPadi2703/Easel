import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageURL = searchParams.get("imageURL");
  const userID = searchParams.get("userID");

  try {
    if (!imageURL || !userID)
      throw new Error("userID and imageURL names required");
    await sql`INSERT INTO Images (image_url, user_id) VALUES (${imageURL}, ${userID});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const images = await sql`SELECT * FROM Images;`;
  return NextResponse.json({ images }, { status: 200 });
}
