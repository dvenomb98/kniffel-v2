import { initialScore } from "@/lib/game/gameConfig";

export enum PlayerTurn {
	PLAYER_ONE = "PLAYER_ONE",
	PLAYER_TWO = "PLAYER_TWO",
}

export enum GameState {
	NOT_STARTED = "NOT_STARTED",
	IN_PROGRESS = "IN_PROGRESS",
	FINISHED = "FINISHED",
}

export type PossibleValue = number | "canceled";

export type PossibleScore = typeof initialScore;

export type UpperLayerKeys = "aces" | "twos" | "threes" | "fours" | "fives" | "sixes";
export type BottomLayerKeys =
	| "threes_of_kind"
	| "fours_of_kind"
	| "small_straight"
	| "large_straight"
	| "full_house"
	| "yahtzee"
	| "chance";
export type ScoreKeys = UpperLayerKeys | BottomLayerKeys;
export type Layer = "upper_layer" | "bottom_layer";

export interface UpperLayer {
	aces: PossibleValue;
	twos: PossibleValue;
	threes: PossibleValue;
	fours: PossibleValue;
	fives: PossibleValue;
	sixes: PossibleValue;
}

export interface BottomLayer {
	threes_of_kind: PossibleValue;
	fours_of_kind: PossibleValue;
	small_straight: PossibleValue;
	large_straight: PossibleValue;
	full_house: PossibleValue;
	yahtzee: PossibleValue;
	chance: PossibleValue;
}

export interface GameStats {
	upper_layer: UpperLayer;
	bottom_layer: BottomLayer;
}

export interface Player {
	name: string;
	order: PlayerTurn;
	stats: GameStats;
	final_score: number;
	bonus_score: number;
	id: string | null;
	avatarUrl: string | null
}

export interface Die {
	value: number;
	id: string;
	isHeld: boolean;
}

export interface GameType {
	boardValues: Die[];
	playerOne: Player;
	playerTwo: Player;
	playerTurn: PlayerTurn;
	rollsLeft: number;
	possibleScores: PossibleScore;
	gameState: GameState;
	round: number;
	winner: string | null;
	id: string | null;
	created_at?: Date
}
