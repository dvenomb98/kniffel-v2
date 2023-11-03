import React, { FC } from "react";
import BoardNav from "./BoardNav";
import BoardInner from "./BoardInner";
import BoardStatistics from "./BoardStatistics";

const Board: FC = () => {

	return (
		<div className="col-span-4 flex flex-col gap-5 border border-divider rounded-md p-5">
			<BoardNav />
			<BoardInner />
			<BoardStatistics />
		</div>
	);
};

export default Board;
