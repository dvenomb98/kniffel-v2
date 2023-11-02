import {
	BottomLayerKeys,
	GameState,
	GameType,
	Layer,
	PlayerTurn,
	PossibleValue,
	UpperLayerKeys,
} from "@/types/gameTypes";
import { calculateFinalScore, calculatePossibleScores, generateNewDie } from "./logic";
import { initialDice, initialScore } from "./gameConfig";

// Define action types
export enum ActionTypes {
	CREATE_GAME = "CREATE_GAME",
	ROLL_DICE = "ROLL_DICE",
	SWITCH_PLAYER = "SWITCH_PLAYER",
	HOLD_DIE = "HOLD_DIE",
	SET_SCORE = "SET_SCORE",
	CALCULATE_SCORE = "CALCULATE_SCORE",
	UPDATE_SESSION_VALUES = "UPDATE_SESSION_VALUES",
}

export type Action =
	| { type: ActionTypes.ROLL_DICE }
	| { type: ActionTypes.HOLD_DIE; payload: string } // id of the die
	| {
			type: ActionTypes.SET_SCORE;
			payload: {
				scoreType: UpperLayerKeys | BottomLayerKeys;
				scoreValue: PossibleValue;
				layer: Layer;
				shouldCancel: boolean;
			};
	  }
	| { type: ActionTypes.CALCULATE_SCORE }
	| { type: ActionTypes.CREATE_GAME }
	| { type: ActionTypes.UPDATE_SESSION_VALUES; payload: GameType };

export const gameReducer = (state: GameType, action: Action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_SESSION_VALUES:
			return action.payload;
		case ActionTypes.CREATE_GAME:
			return { ...state, gameState: GameState.IN_PROGRESS };
		case ActionTypes.ROLL_DICE:
			if (!state.rollsLeft) {
				return state; // if no rolls left, do nothing
			}

			const newBoardValues = state.boardValues.map((die) => (die.isHeld ? die : generateNewDie()));
			const possibleScores = calculatePossibleScores(newBoardValues);

			return {
				...state,
				rollsLeft: state.rollsLeft - 1, // decrement rolls left
				boardValues: newBoardValues,
				possibleScores: possibleScores,
			};
		case ActionTypes.HOLD_DIE:
			return {
				...state,
				boardValues: state.boardValues.map((die) =>
					die.id === action.payload && die.value ? { ...die, isHeld: !die.isHeld } : die
				),
			};
		case ActionTypes.SET_SCORE:
			const { scoreType, scoreValue, layer, shouldCancel } = action.payload;
			const { playerOne, playerTwo, playerTurn, round } = state;

			const newRound = round + 1;
			const newGameState = newRound >= 27 ? GameState.FINISHED : GameState.IN_PROGRESS;

			const defaultResetState = {
				...state,
				boardValues: initialDice,
				playerTurn:
					playerTurn === PlayerTurn.PLAYER_ONE ? PlayerTurn.PLAYER_TWO : PlayerTurn.PLAYER_ONE,
				rollsLeft: 3,
				possibleScores: initialScore,
				round: newRound,
				gameState: newGameState,
			};

			const playerToUpdate = playerTurn === PlayerTurn.PLAYER_ONE ? playerOne : playerTwo;

			let updatedLayer;

			if (layer === "upper_layer") {
				updatedLayer = {
					...playerToUpdate.stats.upper_layer,
					[scoreType as keyof typeof playerToUpdate.stats.upper_layer]: shouldCancel
						? "canceled"
						: scoreValue,
				};

				return {
					...defaultResetState,
					playerOne:
						playerTurn === PlayerTurn.PLAYER_ONE
							? { ...playerOne, stats: { ...playerOne.stats, upper_layer: updatedLayer } }
							: playerOne,
					playerTwo:
						playerTurn === PlayerTurn.PLAYER_TWO
							? { ...playerTwo, stats: { ...playerTwo.stats, upper_layer: updatedLayer } }
							: playerTwo,
				};
			} else if (layer === "bottom_layer") {
				updatedLayer = {
					...playerToUpdate.stats.bottom_layer,
					[scoreType as keyof typeof playerToUpdate.stats.bottom_layer]: shouldCancel
						? "canceled"
						: scoreValue,
				};

				return {
					...defaultResetState,
					playerOne:
						playerTurn === PlayerTurn.PLAYER_ONE
							? { ...playerOne, stats: { ...playerOne.stats, bottom_layer: updatedLayer } }
							: playerOne,
					playerTwo:
						playerTurn === PlayerTurn.PLAYER_TWO
							? { ...playerTwo, stats: { ...playerTwo.stats, bottom_layer: updatedLayer } }
							: playerTwo,
				};
			}

			return state;

		case ActionTypes.CALCULATE_SCORE:
			const { gameState, playerOne: player_1, playerTwo: player_2, winner } = state;

			if (gameState !== GameState.FINISHED || !!winner) return state;

			const player_one_final_score = calculateFinalScore(player_1.stats);
			const player_two_final_score = calculateFinalScore(player_2.stats);

			return {
				...state,
				playerOne: {
					...player_1,
					final_score: player_one_final_score.final_score,
					bonus_score: player_one_final_score.bonus_points,
				},
				playerTwo: {
					...player_2,
					final_score: player_two_final_score.final_score,
					bonus_score: player_two_final_score.bonus_points,
				},
				winner:
					player_one_final_score.final_score > player_two_final_score.final_score
						? player_1.id
						: player_2.id,
			};

		default:
			return state;
	}
};
