import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const cookieStore = cookies();
		const client = createClient(cookieStore);

		const formData = await request.formData();
		const user = await client.auth.getUser();
		const playerName = formData.get("playerName");
		const avatar = formData.get("avatar") as File;
		let newAvatarUrl;

		if (!!avatar) {
			const avatarPath = user.data.user?.id!;
			const { data, error } = await client.storage
				.from("avatars")
				.upload(avatarPath, avatar, { upsert: true });

			if (error) {
				throw new Error("Error happened while uploading file:" + error?.message);
			}

			const { data: url } = client.storage.from("avatars").getPublicUrl(data.path);
			newAvatarUrl = url.publicUrl;
		}

		const valuesToUpdate = {
			playerName,
			...(!!newAvatarUrl && { avatarUrl: newAvatarUrl }),
		};

		await client
			.from("users_table")
			.update(valuesToUpdate)
			.eq("userId", user.data.user?.id);

		return NextResponse.json({ message: "Success!" }, { status: 200 });
	} catch (e: any) {
		// Simplified error response using optional chaining.
		return NextResponse.json({ message: e.message }, { status: 500 });
	}
}
