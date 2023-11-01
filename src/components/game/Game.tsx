"use client";
import client from "@/lib/supabase/client";
import { GameProvider } from "@/providers/GameProvider";
import { GameState, GameType } from "@/types/gameTypes";
import React, { FC, useEffect, useState } from "react";
import InnerGame from "./InnerGame";
import { UserData } from "@/types/userTypes";

interface GameProps {
	userData: UserData;
	gameId: string;
	initialValues: GameType;
}

const Game: FC<GameProps> = ({ userData, gameId, initialValues }) => {
	const [game, setGame] = useState<GameType | null>(null);
	const { userId } = userData;

	useEffect(() => {
		// Setting initial values
		if (!game && !!initialValues) {
			let gameData = initialValues;

			const { playerOne, playerTwo, gameState } = gameData;
			// Checking for both players
			if (!playerOne.id) {
				gameData.playerOne.id = userId;
				gameData.playerOne.name = userData.playerName;
			} else if (!!playerOne.id && !playerTwo.id && playerOne.id !== userId) {
				gameData.playerTwo.id = userId;
				gameData.playerTwo.name = userData.playerName;
			}
			// Logic for starting game
			if (playerOne.id && playerTwo.id && gameState === GameState.NOT_STARTED) {
				gameData.gameState = GameState.IN_PROGRESS;
			}

			setGame(gameData);
			console.log(gameData);
		}
	}, [initialValues]);

	useEffect(() => {
		const subscription = client
			.channel("public:sessions_table")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "sessions_table", filter: `id=eq.${gameId}` },
				(payload) => {
					console.log(payload, "PAYLOAD RECIEVED");
					setGame(payload.new as GameType);
				}
			)
			.subscribe();
		return () => {
			client.removeChannel(subscription);
		};
	}, [gameId, userId]);

	return (
		!!game && (
			<GameProvider parentGameValues={game} gameId={gameId} userData={userData}>
				<InnerGame />
			</GameProvider>
		)
	);
};

export default Game;
