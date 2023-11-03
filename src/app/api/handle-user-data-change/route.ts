import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const cookieStore = cookies();
		const client = createClient(cookieStore);

		const body = await request.json();
		const user = await client.auth.getUser();

		if (typeof body !== "string") {
			throw new Error("Value must be string");
		}

		await client
			.from("users_table")
			.update({ playerName: body })
			.eq("userId", user.data.user?.id);

		return NextResponse.json({ message: "Success!" }, { status: 200 });
	} catch (e: any) {
		// Simplified error response using optional chaining.
		return NextResponse.json({ message: e.message }, { status: 500 });
	}
}
