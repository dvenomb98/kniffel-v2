import { initialGameValues } from "./gameConfig";
import { API_URLS, URLS } from "../urls";
import client from "../supabase/client";
import { GameType } from "@/types/gameTypes";
import isEqual from "lodash.isequal";

const baseUrl = process.env.NEXT_PUBLIC_MAIN_URL

const generateGameId = () => {
	const typedArray = new Uint8Array(5);
	const randomValues = window.crypto.getRandomValues(typedArray);
	return randomValues.join("");
};

export const createNewGameSession = async () => {
	try {
		const gameId = generateGameId();
		const { error } = await client
			.from("sessions_table")
			.insert({ ...initialGameValues, id: gameId });
		if (error) throw new Error(error.message);
		const gameUrl = `${URLS.GAME}/${gameId}`;
		return gameUrl;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const areGamesEqual = (game1: GameType, game2: GameType) => {
	return isEqual(game1, game2);
};

export const handleEndOfGame = async (values: GameType) => {
	const response = await fetch(`${baseUrl}${API_URLS.HANDLE_END_GAME}`, {
		body: JSON.stringify(values),
		method: "POST",
	});
	return response.ok;
};
