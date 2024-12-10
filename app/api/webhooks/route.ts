import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request : Request) {
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

  let event: WebhookEvent;

  try {
    event = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-signature": svix_signature,
      "svix-timestamp": svix_timestamp,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Could not verify webhook", error);
    return new Response("Verification Error!", { status: 400 });
  }

  if (event.type === "user.created") {
    const { id, username, email_addresses } = event.data;
    const email_address = email_addresses[0].email_address;

    if (!id || !email_address) {
      return new Response("Missing data", { status: 400 });
    } else {
      try {
        await sql`INSERT INTO Users (user_id, username, user_email) VALUES (${id}, ${username}, ${email_address});`;
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
        await sql`DELETE FROM Comments WHERE user_id = ${id};`;
        await sql`DELETE FROM Posts WHERE user_id = ${id};`;
        await sql`DELETE FROM Users WHERE user_id = ${id};`;
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
        await sql`UPDATE Users SET username = ${username}, user_email = ${email_address} where user_id = ${id};`;
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
