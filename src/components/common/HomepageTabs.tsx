import React, { FC, Suspense } from "react";
import CreateGameSession from "../game/CreateGameSession";
import Tabs from "../ui/Tabs";
import LeaderboardLayout from "./LeadboardLayout";
import LeaderboardSkeletons from "../skeletons/LeaderboardSkeletons";

enum Values {
	CREATE_GAME = "create_game",
	LEADERBOARDS = "leaderboards",
}

const tabs = [
	{
		value: Values.CREATE_GAME,
		label: "Create a new game",
		children: <CreateGameSession />,
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
