import { useGameContext } from "@/providers/GameProvider";

import React, { FC } from "react";
import BoardNav from "./BoardNav";
import BoardInner from "./BoardInner";

const Board: FC = () => {
	const { gameValues } = useGameContext();

	return (
		<div className="col-span-4 flex flex-col gap-5 border border-divider rounded-md p-5">
			<BoardNav />
			<BoardInner />
		</div>
	);
};

export default Board;
