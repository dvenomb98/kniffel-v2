"use client"
import { Button } from "@/components/ui/Button";
import { ActionTypes } from "@/lib/game/reducer";
import { useGameContext } from "@/providers/GameProvider";
import React, { FC } from "react";

const BoardNav: FC = () => {
	const { gameValues, dispatch, onMove, isDebouncing } = useGameContext();
	const {  rollsLeft, round } = gameValues!;
	return (
		<div className="flex items-center justify-between w-full">
			<Button
				onClick={() => dispatch({ type: ActionTypes.ROLL_DICE })}
				variant="outline"
				className="min-w-[200px]"
				loading={isDebouncing}
				size="lg"
				disabled={!gameValues?.rollsLeft || !onMove || isDebouncing}
			>
				{onMove ? "Roll dices" : "Opponent turn"}
			</Button>
			<p className="text-gray">
				Rolls left: <span className="text-default-color">{rollsLeft}</span>
			</p>
			<p className="text-gray">
				Round: <span className="text-default-color">{round}/26</span>
			</p>
		</div>
	);
};

export default BoardNav;
