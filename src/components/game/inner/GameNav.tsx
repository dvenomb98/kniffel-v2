"use client";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import { useGameContext } from "@/providers/GameProvider";
import { GameState } from "@/types/gameTypes";
import { Crown, HeartCrack, HelpCircleIcon, Loader2, MedalIcon, PersonStandingIcon, RocketIcon } from "lucide-react";
import React, { FC } from "react";

const navClass = "col-span-6 p-5 border border-divider rounded-md";

const GameNav: FC = () => {
	const { userData, otherPlayer, gameValues, onMove } = useGameContext();
	const isWinner = userData?.userId === gameValues?.winner;

	return (
		<div className={cn("flex justify-around items-center", navClass)}>
			<div>
				<p className="text-gray">Connected as:</p>
				<p className="font-bold leading-none">{userData?.playerName}</p>
			</div>
			{gameValues?.gameState === GameState.NOT_STARTED && (
				<div className="items-center flex-col flex">
					<HelpCircleIcon className="w-6 h-6 text-primary" />
					<p className="text-primary">Versus</p>
				</div>
			)}
			{gameValues?.gameState === GameState.IN_PROGRESS && (
				<>
					{onMove ? (
						<div className="items-center flex-col flex">
							<RocketIcon className="w-6 h-6 text-primary" />
							<p className="text-primary">Your turn</p>
						</div>
					) : (
						<div className="items-center flex-col flex">
							<PersonStandingIcon className="w-6 h-6 text-primary" />
							<p className="text-primary">Opponent turn</p>
						</div>
					)}
				</>
			)}
			{gameValues?.gameState === GameState.FINISHED && (
				<div className="items-center flex-col flex">
					{isWinner ? (
						<>
							<Crown className="w-6 h-6 text-success" />
							<p className="text-success">You won!</p>
						</>
					) : (
						<>
							<HeartCrack className="w-6 h-6 text-error" />
							<p className="text-error">You lost!</p>
						</>
					)}
				</div>
			)}

			{otherPlayer?.id ? (
				<div>
					<p className="text-gray">Opponent</p>
					<p className="font-bold leading-none">{otherPlayer?.name}</p>
				</div>
			) : (
				<div className="flex gap-2 items-center">
					<Loader2 className="animate-spin w-6 h-6 text-gray" />
					<p className="text-gray leading-none">Waiting <br /> for other player...</p>
				</div>
			)}
		</div>
	);
};

export default GameNav;
