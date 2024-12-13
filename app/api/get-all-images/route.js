import { NextResponse } from "next/server";
import { get_all_images } from "../../../server/queries";

export async function GET(request) {
  try {
    const images = await get_all_images();
    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
