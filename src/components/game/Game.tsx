"use client";
import client from "@/lib/supabase/client";
import { GameProvider } from "@/providers/GameProvider";
import { GameType } from "@/types/gameTypes";
import React, { FC, useEffect, useState } from "react";
import InnerGame from "./InnerGame";
import { UserData } from "@/types/userTypes";
import { areGamesEqual } from "@/lib/game/utils";

interface GameProps {
	userData: UserData;
	gameId: string;
	initialValues: GameType;
}

const Game: FC<GameProps> = ({ userData, gameId, initialValues }) => {
	const [game, setGame] = useState<GameType>(initialValues);
	const { userId } = userData;

	useEffect(() => {
		const subscription = client
			.channel("public:sessions_table")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "sessions_table", filter: `id=eq.${gameId}` },
				async (payload) => {
					console.log(payload, "PAYLOAD RECEIVED");

					const newPayload = { ...payload.new } as GameType;

					if (areGamesEqual(game, newPayload)) return;
					setGame(newPayload);
				}
			)
			.subscribe();

		return () => {
			subscription.unsubscribe(); // This might vary depending on the client's implementation
		};
	}, [gameId, userId, game]);

	return (
		!!game && (
			<GameProvider parentGameValues={game} gameId={gameId} userData={userData}>
				<InnerGame />
			</GameProvider>
		)
	);
};

export default Game;
