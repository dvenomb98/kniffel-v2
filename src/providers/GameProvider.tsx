"use client";
import { initialPlayerOneStats } from "@/lib/game/gameConfig";
import { Action, ActionTypes, gameReducer } from "@/lib/game/reducer";
import { GameState, GameType, Player, PlayerTurn } from "@/types/gameTypes";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useState,
} from "react";
import debounce from "lodash.debounce";
import client from "@/lib/supabase/client";
import { UserData } from "@/types/userTypes";
import { areGamesEqual, handleEndOfGame } from "@/lib/game/utils";

interface GameProviderProps {
	children: ReactNode;
	parentGameValues: GameType;
	gameId: string;
	userData: UserData | null;
}

// Create the context
export const GameContext = createContext<{
	gameValues: GameType | null;
	dispatch: React.Dispatch<Action>;
	currentPlayer: Player;
	onMove: boolean;
	isDebouncing: boolean;
	userData: UserData | null;
	otherPlayer: Player | null;
}>({
	gameValues: null,
	dispatch: () => {},
	currentPlayer: initialPlayerOneStats,
	onMove: false,
	isDebouncing: false,
	userData: null,
	otherPlayer: null,
});

// Create a provider wrapper component
export const GameProvider = ({
	children,
	parentGameValues,
	gameId,
	userData,
}: GameProviderProps) => {
	const [gameValues, dispatch] = useReducer(gameReducer, parentGameValues);
	const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

	useEffect(() => {
		const { playerOne, playerTwo, gameState } = parentGameValues;
		if (!playerOne.id) {
			const payload = {
				...parentGameValues,
				playerOne: {
					...parentGameValues.playerOne,
					name: userData?.playerName!,
					id: userData?.userId!,
					avatarUrl: userData?.avatarUrl || null
				},
			};
			dispatch({ type: ActionTypes.UPDATE_SESSION_VALUES, payload });
			return;
		}

		if (!!playerOne.id && !playerTwo.id && playerOne.id !== userData!.userId) {
			const payload = {
				...parentGameValues,
				playerTwo: {
					...parentGameValues.playerTwo,
					name: userData?.playerName!,
					id: userData?.userId!,
					avatarUrl: userData?.avatarUrl || null
				},
			};
			dispatch({ type: ActionTypes.UPDATE_SESSION_VALUES, payload });
			return;
		}

		if (playerOne.id && playerTwo.id && gameState === GameState.NOT_STARTED) {
			const payload = { ...parentGameValues, gameState: GameState.IN_PROGRESS };
			dispatch({ type: ActionTypes.UPDATE_SESSION_VALUES, payload });
			return;
		}

		dispatch({ type: ActionTypes.UPDATE_SESSION_VALUES, payload: parentGameValues });
	}, [parentGameValues]);

	useEffect(() => {
		const debouncedUpdate = debounce(async () => {
			await client.from("sessions_table").update(gameValues).eq("id", gameId);
			setIsDebouncing(false);
		}, 300);

		if (areGamesEqual(gameValues, parentGameValues) || isDebouncing) return;
		console.log("debounce would happen");
		setIsDebouncing(true);
		debouncedUpdate();
	}, [gameValues, gameId]);

	useEffect(() => {
		const postEndGame = async () => {
			await handleEndOfGame(gameValues);
		};
		if (gameValues?.gameState !== GameState.FINISHED) return;
		// Listen to end of game and update player score + determine winner
		if (!gameValues.winner) {
			dispatch({ type: ActionTypes.CALCULATE_SCORE });
			return
		}
		// Check if the game state is FINISHED and there's a winner
		if (gameValues.winner) {
			postEndGame();
		}
	}, [gameValues]);

	const currentPlayer = useMemo(
		() =>
			gameValues.playerTurn === PlayerTurn.PLAYER_ONE ? gameValues.playerOne : gameValues.playerTwo,
		[gameValues]
	);
	const onMove = currentPlayer?.id === userData?.userId;

	const otherPlayer = useMemo(() => {
		if (gameValues.playerOne.id === userData?.userId) return gameValues.playerTwo;
		else return gameValues.playerOne;
	}, [gameValues, userData?.userId]);

	return (
		<GameContext.Provider
			value={{ gameValues, dispatch, currentPlayer, onMove, isDebouncing, userData, otherPlayer }}
		>
			{children}
		</GameContext.Provider>
	);
};

export const useGameContext = () => {
	return useContext(GameContext);
};
