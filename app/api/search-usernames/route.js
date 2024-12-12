import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  try {
    const usernames =
      await sql` SELECT username, SIMILARITY(username, ${query}) AS similarity
      FROM Users
      WHERE lower(username) % lower(${query})
      ORDER BY similarity DESC LIMIT 5;`;

    return NextResponse.json({ usernames }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
