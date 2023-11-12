"use client";
import Avatar from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import { useGameContext } from "@/providers/GameProvider";
import { GameState } from "@/types/gameTypes";
import {
	Crown,
	HeartCrack,
	Loader2,
	PersonStandingIcon,
	RocketIcon,
} from "lucide-react";
import React, { FC } from "react";

const navClass = "col-span-6 p-5 border border-divider rounded-md";

const GameNav: FC = () => {
	const { userData, otherPlayer, gameValues, onMove } = useGameContext();
	const isWinner = userData?.userId === gameValues?.winner;

	return (
		<div className={cn("flex justify-around items-center", navClass)}>
			<div className="flex items-center gap-3">
				<Avatar src={userData?.avatarUrl || null} alt={userData?.playerName || ""} />
				<div>
					<p className="text-gray leading-none">Connected as:</p>
					<p className="font-bold">{userData?.playerName}</p>
				</div>
			</div>
			{gameValues?.gameState === GameState.NOT_STARTED && (
				<div className="items-center flex-col flex">
					<Loader2 className="animate-spin w-6 h-6 text-primary" />
					<p className="text-primary">Waiting for other player...</p>
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
				<div className="flex items-center gap-3">
					<Avatar src={otherPlayer.avatarUrl} alt={otherPlayer.name} />
					<div>
						<p className="text-gray leading-none">Opponent</p>
						<p className="font-bold">{otherPlayer?.name}</p>
					</div>
				</div>
			) : (
				<div className="flex gap-3 items-center">
					<Skeleton className="w-10 h-10 rounded-full" />
					<div className="flex flex-col gap-1">
						<Skeleton className="w-36 h-5" />
						<Skeleton className="w-36 h-5" />
					</div>
				</div>
			)}
		</div>
	);
};

export default GameNav;
