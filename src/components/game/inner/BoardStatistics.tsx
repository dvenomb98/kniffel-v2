import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/Sheet";
import { useGameContext } from "@/providers/GameProvider";
import { useToggle } from "react-use";
import React, { FC, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import StatsBar from "./StatsBar";
import { GameState } from "@/types/gameTypes";
import { BarChart } from "lucide-react";

const BoardStatistics: FC = () => {
	const [open, toggle] = useToggle(false);
	const { onMove, gameValues, userData } = useGameContext();
	const playerData =
		userData?.userId === gameValues?.playerOne?.id ? gameValues?.playerOne : gameValues?.playerTwo;

	useEffect(() => {
		if (onMove && open) toggle();
	}, [onMove]);

	if (gameValues?.gameState !== GameState.IN_PROGRESS) return null;
	return (
		<Sheet onOpenChange={toggle} open={open}>
			<SheetTrigger asChild>
				<Button className="w-fit" disabled={onMove} onClick={toggle} variant={"ghost"}>
					<BarChart className="w-5 h-5 mr-1" />
					View your statistics
				</Button>
			</SheetTrigger>

			<SheetContent className="lg:w-[400px] overflow-y-scroll">
				<SheetHeader>
					<SheetTitle className="mb-5">{playerData!.name}</SheetTitle>
				</SheetHeader>
				<StatsBar inView currentPlayer={playerData!} />
			</SheetContent>
		</Sheet>
	);
};

export default BoardStatistics;
