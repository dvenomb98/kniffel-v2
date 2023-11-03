import AccountPageLayout from "@/components/account/AccountPageLayout";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/Table";
import { getUserData } from "@/lib/server-utils";
import { URLS } from "@/lib/urls";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const GameHistoryPage: NextPage = async () => {
	const {
		userData: { gameHistory },
	} = await getUserData();

	return (
		<AccountPageLayout header="Game history">
			{gameHistory.length ? (
				<Table>
					<TableCaption>A list of your game history</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[200px] text-left">Game</TableHead>
							<TableHead>Score</TableHead>
							<TableHead>Opponent score</TableHead>
							<TableHead className="text-right">Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{gameHistory.map((history) => (
							<TableRow key={history.id}>
								<TableCell>
									<Link
										className="text-gray hover:text-default-color hover:underline ease-in-out transition-colors"
										href={URLS.GAME + `/${history.id}`}
									>
										View game
									</Link>
								</TableCell>
								<TableCell>{history.score}</TableCell>
								<TableCell className="text-gray">{history.opponentScore}</TableCell>
								<TableCell className="text-right">
									{history.won ? (
										<span className="text-success">WON</span>
									) : (
										<span className="text-error">LOST</span>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<h4 className="text-gray">No games played yet.</h4>
			)}
		</AccountPageLayout>
	);
};

export default GameHistoryPage;
