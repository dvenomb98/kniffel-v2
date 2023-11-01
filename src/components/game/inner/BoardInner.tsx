import React, { FC } from "react";
import SingleDie from "./SingleDie";
import { useGameContext } from "@/providers/GameProvider";
import { ActionTypes } from "@/lib/game/reducer";

const BoardInner: FC = () => {
	const { gameValues, dispatch } = useGameContext();
	const { boardValues } = gameValues!;

	const holdDie = (id: string) => {
		dispatch({ type: ActionTypes.HOLD_DIE, payload: id });
	};

	return (
		<div className="grid grid-cols-3 grid-rows-2 w-fit gap-4">
			{boardValues.map((value) => (
				<SingleDie key={value.id} die={value} holdDie={() => holdDie(value.id)} />
			))}
		</div>
	);
};

export default BoardInner;
