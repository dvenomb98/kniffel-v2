"use client";
import { useGameContext } from "@/providers/GameProvider";
import React, { FC, useMemo } from "react";

const GameNav: FC = () => {
	const { userData, gameValues, otherPlayer } = useGameContext();

	return (
		<div className="col-span-6 flex justify-around items-center p-5 border border-divider rounded-md shadow-lg dark:shadow-secondary-dark/50">
			<div>
				<p className="text-gray">Connected as:</p>
				<p className="font-bold leading-none">{userData?.playerName}</p>
			</div>

			<h2 className="h2 text-primary">VS</h2>

			<div>
				<p className="text-gray">{otherPlayer?.id ? "Opponent connected" : "Not connected yet"} </p>
				<p className="font-bold leading-none">{otherPlayer?.name}</p>
			</div>
		</div>
	);
};

export default GameNav;
