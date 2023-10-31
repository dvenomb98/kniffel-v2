import React, { FC } from "react";
import CreateGameSession from "../game/CreateGameSession";
import Leaderboards from "./Leaderboards";
import Tabs from "../ui/Tabs";

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
		children: <Leaderboards />,
	},
];

const HomepageTabs: FC = () => {
	return <Tabs desktopFullWidth tabs={tabs} />;
};

export default HomepageTabs;
