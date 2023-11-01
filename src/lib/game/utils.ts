import { nanoid } from "nanoid";
import { initialGameValues } from "./gameConfig";
import { URLS } from "../urls";
import client from "../supabase/client";

const generateGameId = () => {
	const typedArray = new Uint8Array(5);
	const randomValues = window.crypto.getRandomValues(typedArray);
	return randomValues.join("");
};

export const createNewGameSession = async () => {
	try {
		const gameId = generateGameId()
		const { error } = await client
			.from("sessions_table")
			.insert({ ...initialGameValues, id: gameId});
		if (error) throw new Error(error.message);
		const gameUrl = `${URLS.GAME}/${gameId}`;
		return gameUrl;
	} catch (e) {
		console.error(e);
		return null;
	}
};



