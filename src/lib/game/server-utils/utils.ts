import { createClient } from "@/lib/supabase/server";
import { getErrorMessage } from "@/lib/utils";
import { GameType } from "@/types/gameTypes";
import { cookies } from "next/headers";

export const getGameData = async (gameId: string) => {
	const cookiesStore = cookies();
	const client = createClient(cookiesStore);

	const { data, error } = await client.from("sessions_table").select().eq("id", gameId);

	if (error) {
		const errorM = getErrorMessage(error);
		throw new Error(errorM.message, { cause: errorM?.cause });
	}

	if (!data[0]) throw new Error("Game not found!");

	return data[0] as GameType;
};