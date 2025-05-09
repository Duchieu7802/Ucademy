import createUser from "@/lib/actions/user.actions";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
	const headersList = await headers();
	const svix_id = headersList.get("svix-id") ?? "";
	const svix_timestamp = headersList.get("svix-timestamp") ?? "";
	const svix_signature = headersList.get("svix-signature") ?? "";
	if (!process.env.WEBHOOK_SECRET) {
		throw new Error("WEBHOOK_SECRET is not set");
	}
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Bad Request", { status: 400 });
	}
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
		console.log(msg.data);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return new Response("Bad Request", { status: 400 });
	}

	const eventType = msg.type;
	if (eventType === "user.created") {
		try {
			const { email_addresses, username, image_url, id } = msg.data;
			console.log("Data gửi vào createUser:", {
				clerkId: id,
				email: email_addresses[0].email_address,
				username: username!,
				name: username!,
				avatar: image_url,
			});
			const user = await createUser({
				clerkId: id,
				email: email_addresses[0].email_address,
				username: username!,
				name: username!,
				avatar: image_url,
			});
			return NextResponse.json({
				message: "Ok",
				user: user,
				msg,
			});
		} catch (error) {
			console.error("Lỗi khi tạo user:", error);
			return NextResponse.json({ error: "Tạo user thất bại" }, { status: 500 });
		}
	}
	// Rest

	return new Response("OK", { status: 200 });
}
