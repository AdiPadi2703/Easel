import { NextResponse } from "next/server";
import { get_usernames } from "../../../server/queries";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  try {
    const usernames = await get_usernames(query);

    return NextResponse.json({ usernames }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
