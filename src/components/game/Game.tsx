"use client";
import client from "@/lib/supabase/client";
import { GameProvider } from "@/providers/GameProvider";
import { GameState, GameType } from "@/types/gameTypes";
import React, { FC, useEffect, useState } from "react";
import InnerGame from "./InnerGame";
import { UserData } from "@/types/userTypes";
import { handleEndOfGame } from "@/lib/game/utils";

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
		}
	}, [initialValues]);

	useEffect(() => {
		const subscription = client
		  .channel("public:sessions_table")
		  .on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "sessions_table", filter: `id=eq.${gameId}` },
			async (payload) => {
			  console.log(payload, "PAYLOAD RECEIVED");
			  const newPayload = payload.new as GameType;
	  
			  setGame(newPayload);
	  
			  // Check if the game state is FINISHED and there's a winner
			  if (newPayload.gameState === GameState.FINISHED && newPayload.winner) {
				const isWinner = newPayload.winner === userId;
				const shouldUpdateWinner = isWinner && !newPayload.updates.winner;
				const shouldUpdateLoser = !isWinner && !newPayload.updates.loser;
	  
				if (shouldUpdateWinner || shouldUpdateLoser) {
				  await handleEndOfGame(newPayload);
				}
			  }
			}
		  )
		  .subscribe();
	  
		return () => {
		  subscription.unsubscribe(); // This might vary depending on the client's implementation
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
