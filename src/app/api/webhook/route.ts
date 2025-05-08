import createUser from "@/lib/actions/user.actions";
import { WebhookEvent } from "@clerk/nextjs/server";
// import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
	// const svix_id = (await headers()).get("svix-id") ?? "";
	// const svix_timestamp = (await headers()).get("svix-timestamp") ?? "";
	// const svix_signature = (await headers()).get("svix-signature") ?? "";
	const svix_id = req.headers.get("svix-id") ?? "";
	const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
	const svix_signature = req.headers.get("svix-signature") ?? "";
	const payload = await req.json();
	const body = JSON.stringify(payload);

	const sivx = new Webhook(webhookSecret);

	let msg: WebhookEvent;

	try {
		msg = sivx.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return new Response("Bad Request", { status: 400 });
	}

	const eventType = msg.type;
	if (eventType === "user.created") {
		const { email_addresses, username, image_url, id } = msg.data;
		const user = createUser({
			clerkId: id,
			email: email_addresses[0].email_address,
			username: username!,
			name: username!,
			avatar: image_url,
		});
		return NextResponse.json({
			message: "Ok",
			user,
		});
	}
	// Rest

	return new Response("OK", { status: 200 });
}
