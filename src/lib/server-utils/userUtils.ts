import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { getErrorMessage } from "../utils";
import { GameHistory, UserData } from "@/types/userTypes";

export const getScore = async (gameHistory: GameHistory[]) => {
	if (!gameHistory.length) {
		return {
			highest: 0,
			lowest: 0,
		};
	}
	const scores = gameHistory.map((score) => score.score);
	const highest = Math.max(...scores);
	const lowest = Math.min(...scores);

	return {
		highest,
		lowest,
	};
};

export const getUserData = async (gameHistory?: boolean) => {
	const cookiesStore = cookies();
	const client = createClient(cookiesStore);

	let selectFields = "userId, email, playerName, statistics, avatarUrl";

	if (gameHistory) {
		selectFields += ", gameHistory";
	}

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
		.select(selectFields)
		.eq("userId", user?.id);

	if (dataError) {
		const errorM = getErrorMessage(dataError);
		throw new Error(errorM.message, { cause: errorM });
	}

	// Check if the userData is actually an array with at least one item
	if (!Array.isArray(userData) || !userData.length) {
		throw new Error("User data not found or is in an unexpected format.");
	}

	// Now we can safely assert that the first item is of type UserData because we've checked the array
	const userObj = userData[0];
	if (!userObj || typeof userObj === "string") {
		throw new Error("User data is not in the expected format.");
	}

	return {
		user: user,
		userData: userObj as UserData,
	};
};
