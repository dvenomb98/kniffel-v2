"use client";
import { useGameContext } from "@/providers/GameProvider";
import React from "react";
import GameNav from "./inner/GameNav";
import Board from "./inner/Board";

const InnerGame = () => {
	const { gameValues } = useGameContext();

	return (
		<section className="overflow-x-auto w-full">
			<div className="grid grid-cols-6 gap-2 min-w-[900px] ">
				<GameNav />
				<Board />
				<div className="col-span-2 border h-[600px] bg-yellow-500 w-full" />
			</div>
      	<pre className='overflow-auto'>{JSON.stringify(gameValues, null, 4)}</pre>
		</section>
	);
};

export default InnerGame;
