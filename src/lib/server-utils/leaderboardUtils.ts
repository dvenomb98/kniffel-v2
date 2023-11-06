import { cookies } from "next/headers";
import { UserData } from "@/types/userTypes";
import { createClient } from "../supabase/server";
import { getErrorMessage } from "../utils";

export const getLeaderBoardData = 
	async () => {
		const cookiesStore = cookies();
		const client = createClient(cookiesStore);
		const { data, error } = await client
			.from("users_table")
			.select("statistics, playerName, avatarUrl, userId")
			.neq("statistics->wins", 0)
		if (error) {
			const e = getErrorMessage(error);
			throw new Error(e.message, { cause: e.cause });
		}

		const usersData = data as UserData[];
		const publicInfo = usersData.map(({ statistics, playerName, avatarUrl, userId }) => ({
			statistics,
			playerName,
			userId,
			avatarUrl,
		}));

		const sortedData = publicInfo.sort((a, b) => b.statistics.wins - a.statistics.wins);

		return sortedData.slice(0, 10);
	}

