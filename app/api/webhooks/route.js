import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { add_user, delete_user, update_user } from "../../../server/queries";

export async function POST(request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("Signing secret not found in .env!");
  }

  const webhook = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing Svix headers!", { status: 400 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  let event;

  try {
    event = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-signature": svix_signature,
      "svix-timestamp": svix_timestamp,
    });
  } catch (error) {
    console.error("Could not verify webhook", error);
    return new Response("Verification Error!", { status: 400 });
  }

  if (event.type === "user.created") {
    const { id, username, email_addresses, image_url } = event.data;
    const email_address = email_addresses[0].email_address;

    if (!id || !email_address) {
      return new Response("Missing data", { status: 400 });
    } else {
      try {
        await add_user(id, username, email_address, image_url);
      } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  } else if (event.type === "user.deleted") {
    const { id } = event.data;

    if (!id) {
      return new Response("Missing data", { status: 400 });
    } else {
      try {
        await delete_user(id);
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  } else if (event.type === "user.updated") {
    const { id, username, email_addresses } = event.data;
    const email_address = email_addresses[0].email_address;

    if (!id) {
      return new Response("Missing data", { status: 400 });
    } else {
      try {
        await update_user(); // check this thing
      } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  }

  return new Response("Webhook received and User entered in database!", {
    status: 200,
  });
}
