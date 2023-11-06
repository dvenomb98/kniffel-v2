import { UnfinishedGame, getUnfinishedGames } from "@/lib/server-utils/unfinishedGamesUtils";
import { FC } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/Table";
import { GameState } from "@/types/gameTypes";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { URLS } from "@/lib/urls";
import Link from "next/link";

const statusToString = {
	[GameState.NOT_STARTED]: "Not started",
	[GameState.IN_PROGRESS]: "In progress",
	[GameState.FINISHED]: "Finished",
};

const UnfinishedGames: FC = async () => {
	const unfinishedGames = (await getUnfinishedGames()) as UnfinishedGame[] | null;

	if (!unfinishedGames?.length) return <p className="text-gray py-5">You dont have any current games</p>;

	return (
		<Table className="py-5">
			<TableCaption>A list of your current games</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[200px] text-left">Game</TableHead>
					<TableHead>ID</TableHead>
					<TableHead className="text-right">Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{unfinishedGames?.map((game) => (
					<TableRow key={game.id}>
						<TableCell >
							<Link className="text-gray text-default-color underline ease-in-out transition-colors" href={URLS.GAME + `/${game.id}`}>
							Click to continue
							</Link>
						</TableCell>
						<TableCell>
							{game.id}
						</TableCell>
						<TableCell
							className={cn(
								"text-right inline-flex items-center gap-2 w-full justify-end",
								GameState.IN_PROGRESS === game.gameState && "text-warning"
							)}
						>
							{GameState.IN_PROGRESS === game.gameState && <AlertTriangle className="w-5 h-5" />}
							<span>{statusToString[game.gameState]}</span>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default UnfinishedGames;
