import { baseUrl } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import { AUTH_URLS } from "@/lib/urls";
import { UserData } from "@/types/userTypes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const cookieStore = cookies();
		const client = createClient(cookieStore);
		const body = await request.json();
		const { email, password, data } = body;

		const { data: signUpData, error } = await client.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: baseUrl + AUTH_URLS.CALLBACK,
			},
		});

		if (error || !signUpData.user) throw new Error(error?.message || "Sign up data not found.");

		if (!signUpData.user?.identities?.length) {
			return NextResponse.json({ message: "Email already exists!" }, { status: 429 });
		}

		const valuesToInsert = {
			email: signUpData.user.email,
			userId: signUpData.user.id,
			playerName: data.playerName,
			statistics: {
				wins: 0,
				losts: 0,
			},
			gameHistory: [],
			avatarUrl: null
		} as UserData;

		const { error: insertError } = await client.from("users_table").insert([valuesToInsert]);

		if (insertError) throw new Error(insertError?.message || "Insert error happened.");

		return NextResponse.json({ message: "Success!" }, { status: 200 });
	} catch (e: any) {
		// Simplified error response using optional chaining.
		return NextResponse.json({ message: e.message || "Unkown error" }, { status: 500 });
	}
}
