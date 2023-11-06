import Game from "@/components/game/Game";
import { getGameData } from "@/lib/game/server-utils/utils";
import { getUserData } from "@/lib/server-utils/userUtils";
import { NextPage } from "next";
import React from "react";

interface PageParams {
	params: { id: string };
}

export const dynamic = "force-dynamic";

const Page: NextPage<PageParams> = async ({ params }) => {
	const [userData, gameData] = await Promise.all([
		await getUserData(),
		await getGameData(params.id),
	]);

	const isPlayerOneConnected = !!gameData.playerOne.id;
	const isPlayerTwoConnected = !!gameData.playerTwo.id;
	const isNeitherPlayerUser =
		gameData.playerOne.id !== userData.userData.userId &&
		gameData.playerTwo.id !== userData.userData.userId;

	if (isPlayerOneConnected && isPlayerTwoConnected && isNeitherPlayerUser) {
		throw new Error("Sorry, you are not allowed to watch other players games.");
	}
	return <Game initialValues={gameData} userData={userData.userData} gameId={params.id} />;
};

export default Page;
