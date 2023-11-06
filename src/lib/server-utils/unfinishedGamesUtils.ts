import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";

import { createClient } from "../supabase/server";
import { GameType } from "@/types/gameTypes";

export type UnfinishedGame = Pick<GameType, "id" | "gameState">

export const getUnfinishedGames = unstable_cache(
	async () => {
		const cookiesStore = cookies();
		const client = createClient(cookiesStore);
		const { data: user, error } = await client.auth.getUser();

		if (error) return null;

		const { data, error: dataError } = await client
			.from("sessions_table")
			.select("winner, playerOne, playerTwo, id, gameState")
			.is("winner", null)
			.or(`playerOne->>id.eq.${user.user.id}, playerTwo->>id.eq.${user.user.id}`)
			.returns<UnfinishedGame[]>()

		if (dataError) return null;

		if (!data.length) return null;

		return data
	},
	["unfinished-games-data"],
	{ revalidate: 60 }
)
