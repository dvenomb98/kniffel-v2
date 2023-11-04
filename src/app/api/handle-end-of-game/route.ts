import { getUserData } from "@/lib/server-utils";
import { createClient } from "@/lib/supabase/server";
import { GameType } from "@/types/gameTypes";
import { cookies } from "next/headers";

export async function POST(request: Request) {
	try {
		const cookieStore = cookies();
		const { userData } = await getUserData();

		const body = await request.json();
		const gameValues = { ...body } as GameType;
		const client = createClient(cookieStore);

		// Check if the update has already been done to prevent duplicate updates.
		const alreadyUpdated = userData.gameHistory.some((history) => history.id === gameValues.id);
		if (alreadyUpdated) {
			return new Response(JSON.stringify({ message: "User already updated!" }), { status: 409 });
		}

		const playerData =
			userData.userId === gameValues.playerOne.id ? gameValues.playerOne : gameValues.playerTwo;
		const otherPlayerData =
			userData.userId !== gameValues.playerOne.id ? gameValues.playerOne : gameValues.playerTwo;
		const isWinner = userData.userId === gameValues.winner;

		// Prepare updates for the user statistics.
		const statsUpdate = {
			wins: userData.statistics.wins + (isWinner ? 1 : 0),
			losts: userData.statistics.losts + (isWinner ? 0 : 1),
		};

		const historyUpdate = [
			...userData.gameHistory,
			{
				id: gameValues.id,
				won: userData.userId === gameValues.winner,
				score: playerData.final_score,
				opponentId: otherPlayerData.id,
				opponentName: otherPlayerData.name,
				opponentScore: otherPlayerData.final_score,
				createdAt: gameValues?.created_at

			},
		];

		// Update the user's statistics.
		const { error: userUpdateError } = await client
			.from("users_table")
			.update({ statistics: statsUpdate, gameHistory: historyUpdate })
			.eq("userId", userData.userId);

		if (userUpdateError) {
			throw new Error(userUpdateError.message);
		}

		return new Response(JSON.stringify({ message: "User data updated successfully" }), {
			status: 200,
		});
	} catch (e: any) {
		console.log(e);
		// Simplified error response using optional chaining.
		return new Response(JSON.stringify({ message: e?.message || "Unknown Error occurred" }), {
			status: 500,
		});
	}
}
