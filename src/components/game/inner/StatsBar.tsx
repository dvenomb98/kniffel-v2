import React, { FC } from "react";
import UpperLayerScore from "./UpperLayerScore";
import BottomLayerScore from "./BottomLayerScore";
import { useGameContext } from "@/providers/GameProvider";
import { GameState, Player } from "@/types/gameTypes";
import { cn } from "@/lib/utils";

interface StatsBarProps {
	currentPlayer: Player;
	inView?: boolean;
}

const StatsBar: FC<StatsBarProps> = ({ currentPlayer, inView }) => {
	const { gameValues } = useGameContext();
	const isWinner = gameValues?.winner === currentPlayer.id;
	const gameEnded = gameValues!.gameState === GameState.FINISHED;

	return (
		<div
			className={cn(
				"flex flex-col gap-2 p-2 border justify-between rounded-md col-span-2 border-divider",
				isWinner && "border-success",
				gameEnded && "w-[400px]",
				!isWinner && gameEnded && "border-error"
			)}
		>
			{!inView && (
				<div className="text-gray flex">
					<p className="flex gap-2">
						Player: <span className="text-default-color">{currentPlayer.name}</span>
					</p>
				</div>
			)}
			{!!gameEnded && !!currentPlayer.final_score && (
				<div>
					<p className="flex gap-2 text-gray">
						Bonus score:{" "}
						<span className="text-default-color">{currentPlayer.bonus_score || 0}</span>
					</p>
					<p className="flex gap-2 text-gray">
						Final score: <span className="text-default-color">{currentPlayer.final_score}</span>
					</p>
					<p className={cn(isWinner ? "text-success" : "text-error")}>
						{isWinner ? "Winner" : "Loser"}
					</p>
				</div>
			)}

			<div className="flex flex-col gap-4">
				<UpperLayerScore inView={inView} currentPlayer={currentPlayer} />
				<BottomLayerScore inView={inView}currentPlayer={currentPlayer} />
			</div>
		</div>
	);
};

export default StatsBar;
