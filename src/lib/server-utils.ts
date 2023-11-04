import { cookies } from "next/headers";
import { createClient } from "./supabase/server";
import { getErrorMessage } from "./utils";
import { UserData } from "@/types/userTypes";
import { GameType } from "@/types/gameTypes";

export const wait = async (ms: number): Promise<void> =>
	new Promise<void>((res) => setTimeout(() => res(), ms));

export const getUserData = async () => {
	const cookiesStore = cookies();
	const client = createClient(cookiesStore);

	const {
		data: { user },
		error,
	} = await client.auth.getUser();

	if (error) {
		const errorM = getErrorMessage(error);
		throw new Error(errorM.message, { cause: errorM?.cause });
	}

	const { data: userData, error: dataError } = await client
		.from("users_table")
		.select()
		.eq("userId", user?.id);

	if (dataError) {
		const errorM = getErrorMessage(dataError);
		throw new Error(errorM.message, { cause: errorM });
	}

	return {
		user: user,
		userData: userData[0] as UserData,
	};
};

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

export const getLeaderBoardData = async () => {
	const cookiesStore = cookies();
	const client = createClient(cookiesStore);
	const { data, error } = await client.from("users_table").select();
	if (error) {
		const e = getErrorMessage(error);
		throw new Error(e.message, { cause: e.cause });
	}

	const usersData = data as UserData[];
	const publicInfo = usersData.map(({ statistics, playerName, avatarUrl, userId, ...rest }) => ({
		statistics,
		playerName,
		userId,
		avatarUrl,
	}));


	const sortedData = publicInfo.sort((a, b) => b.statistics.wins - a.statistics.wins);

	return sortedData.slice(0, 10);
};
