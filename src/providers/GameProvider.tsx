"use client"
import { initialPlayerOneStats } from "@/lib/game/gameConfig";
import { Action, ActionTypes, gameReducer } from "@/lib/game/reducer";
import { GameState, GameType, Player, PlayerTurn } from "@/types/gameTypes";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";


interface GameProviderProps {
  children: ReactNode;
  session_values: GameType;
  game_id: string;
  player_id: string | null;
}

// Create the context
export const GameContext = createContext<{
  gameValues: GameType | null;
  dispatch: React.Dispatch<Action>;
  currentPlayer: Player;
  onMove: boolean;
  isDebouncing: boolean;
  player_id: string | null;
}>({
  gameValues: null,
  dispatch: () => {},
  currentPlayer: initialPlayerOneStats,
  onMove: false,
  isDebouncing: false,
  player_id: null,
});

// Create a provider wrapper component
export const GameProvider = ({
  children,
  session_values,
  game_id,
  player_id,
}: GameProviderProps) => {
  const [gameValues, dispatch] = useReducer(gameReducer, session_values);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: ActionTypes.UPDATE_SESSION_VALUES, payload: session_values });
  }, [session_values]);

  useEffect(() => {
    if (
      gameValues?.gameState === GameState.FINISHED &&
      !gameValues.playerOne.final_score &&
      !gameValues.playerTwo.final_score
    ) {
      dispatch({ type: ActionTypes.CALCULATE_SCORE });
    }
  }, [gameValues]);

//   const debouncedUpdateFirestore = useCallback(
//     debounce(async (gameId: string, gameValues: GameType) => {
//       setIsDebouncing(false);
//       await setDoc(doc(db, 'sessions', gameId as string), gameValues);
//     }, 300),
//     [],
//   );

//   useEffect(() => {
//     if (game_id && !isDebouncing) {
//       setIsDebouncing(true);
//       debouncedUpdateFirestore(game_id, gameValues);
//     }
//   }, [game_id, gameValues]);

  const currentPlayer = useMemo(
    () =>
      gameValues.playerTurn === PlayerTurn.PLAYER_ONE
        ? gameValues.playerOne
        : gameValues.playerTwo,
    [gameValues.playerTurn],
  );
  const onMove = currentPlayer?.id === player_id;

  return (
    <GameContext.Provider
      value={{ gameValues, dispatch, currentPlayer, onMove, isDebouncing, player_id }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};