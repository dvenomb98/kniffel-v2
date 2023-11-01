import { GameState, GameType, Player, PlayerTurn } from "@/types/gameTypes"
import { nanoid } from 'nanoid';

export const initialScore = {
  upper_layer: {
    aces: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
  },
  bottom_layer: {
    threes_of_kind: 0,
    fours_of_kind: 0,
    small_straight: 0,
    large_straight: 0,
    full_house: 0,
    yahtzee: 0,
    chance: 0,
  },
};

export const initialDice = Array.from({ length: 5 }, () => ({
  value: 0,
  isHeld: false,
  id: nanoid(),
}));

export const initialPlayerOneStats: Player = {
  name: 'Player One',
  order: PlayerTurn.PLAYER_ONE,
  stats: initialScore,
  final_score: 0,
  bonus_score: 0,
  id: null,
};

export const initialPlayerTwoStats: Player = {
  name: 'Player Two',
  order: PlayerTurn.PLAYER_TWO,
  stats: initialScore,
  final_score: 0,
  bonus_score: 0,
  id: null,
};

export const initialGameValues: GameType = {
  boardValues: initialDice,
  playerOne: initialPlayerOneStats,
  playerTwo: initialPlayerTwoStats,
  playerTurn: PlayerTurn.PLAYER_ONE,
  rollsLeft: 3,
  possibleScores: initialScore,
  gameState: GameState.NOT_STARTED,
  round: 1,
  winner: null,
  id: null,
};