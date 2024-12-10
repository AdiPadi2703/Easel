import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const auth_header = request.headers.get("Authorization");
    const userId = auth_header && auth_header.split(" ")[1];

    if (!userId) {
      return new NextResponse("User not authenticated!", { status: 401 });
    }

    const posts = await sql`SELECT * FROM Posts WHERE user_id = ${userId};`;
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
