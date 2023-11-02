"use client";
import { useGameContext } from "@/providers/GameProvider";
import React from "react";
import GameNav from "./inner/GameNav";
import Board from "./inner/Board";
import StatsBar from "./inner/StatsBar";
import InnerGameLayout from "./inner/InnerGameLayout";
import { GameState } from "@/types/gameTypes";
import { Skeleton } from "../ui/Skeleton";

const InnerGame = () => {
	const { gameValues, currentPlayer } = useGameContext();
	const { gameState } = gameValues!;

	return (
		<section className="overflow-x-auto w-full">
			{gameState === GameState.NOT_STARTED && (
				<InnerGameLayout>
					<GameNav />
					<Skeleton className="col-span-4 h-[800px]" />
					<Skeleton className="col-span-2 h-[800px]" />
				</InnerGameLayout>
			)}
			{gameState === GameState.IN_PROGRESS && (
				<InnerGameLayout>
					<GameNav />
					<Board />
					<StatsBar currentPlayer={currentPlayer} />
				</InnerGameLayout>
			)}
			{gameState === GameState.FINISHED && (
				<div className="flex justify-around w-full">
					<StatsBar currentPlayer={gameValues?.playerOne!} />
					<StatsBar currentPlayer={gameValues?.playerTwo!} />
				</div>
			)}
			<pre className="overflow-auto">{JSON.stringify(gameValues, null, 4)}</pre>
		</section>
	);
};

export default InnerGame;
