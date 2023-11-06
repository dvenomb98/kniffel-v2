import React, { FC, Suspense } from "react";
import Tabs from "../ui/Tabs";
import LeaderboardLayout from "./LeadboardLayout";
import LeaderboardSkeletons from "../skeletons/LeaderboardSkeletons";
import UnfinishedGames from "../game/UnfinishedGames";
import CurrentGamesSkeletons from "../skeletons/CurrentGamesSkeletons";

enum Values {
	YOUR_GAMES = "your-games",
	LEADERBOARDS = "leaderboards",
}

const tabs = [
	{
		value: Values.YOUR_GAMES,
		label: "Your current games",
		children: (
			<Suspense fallback={<CurrentGamesSkeletons />}>
				<UnfinishedGames />
			</Suspense>
		),
	},
	{
		value: Values.LEADERBOARDS,
		label: "View leaderboards",
		children: (
			<Suspense fallback={<LeaderboardSkeletons />}>
				<LeaderboardLayout />
			</Suspense>
		),
	},
];

const HomepageTabs: FC = () => {
	return <Tabs desktopFullWidth tabs={tabs} />;
};

export default HomepageTabs;
