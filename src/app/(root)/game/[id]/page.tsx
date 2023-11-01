import Game from "@/components/game/Game";
import { getGameData, getUserData } from "@/lib/server-utils";
import { NextPage } from "next";
import React from "react";

interface PageParams {
	params: { id: string };
}

export const dynamic = "force-dynamic"

const Page: NextPage<PageParams> = async ({ params }) => {
	const [userData, gameData] = await Promise.all([await getUserData(), await getGameData(params.id)])

	return <Game initialValues={gameData} userData={userData.userData} gameId={params.id} />;
};

export default Page;
