"use client"
import { initialPlayerOneStats } from "@/lib/game/gameConfig";
import { Action, ActionTypes, gameReducer } from "@/lib/game/reducer";
import { GameState, GameType, Player, PlayerTurn } from "@/types/gameTypes";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import debounce from 'lodash.debounce';
import client from "@/lib/supabase/client";
import { UserData } from "@/types/userTypes";



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
  userData: UserData | null
  otherPlayer: Player | null
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

  // useEffect(() => {
  //   dispatch({ type: ActionTypes.UPDATE_SESSION_VALUES, payload: parentGameValues });
  // }, [parentGameValues]);

  useEffect(() => {
    if (
      gameValues?.gameState === GameState.FINISHED &&
      !gameValues.playerOne.final_score &&
      !gameValues.playerTwo.final_score
    ) {
      dispatch({ type: ActionTypes.CALCULATE_SCORE });
    }
  }, [gameValues]);

  const debouncedUpdate = useCallback(
    debounce(async (gameId, gameValues) => {
      console.log("Debounce would happen")
      await client.from("sessions_table").update(gameValues).eq("id", gameId)
      setIsDebouncing(false);
    }, 300),
    [],
  );

  useEffect(() => {
    if (!!gameId && !isDebouncing) {
      setIsDebouncing(true);
      debouncedUpdate(gameId, gameValues);
    }
  }, [gameId, gameValues]);

  const currentPlayer = useMemo(
    () =>
      gameValues.playerTurn === PlayerTurn.PLAYER_ONE
        ? gameValues.playerOne
        : gameValues.playerTwo,
    [gameValues.playerTurn],
  );
  const onMove = currentPlayer?.id === userData?.userId

  const otherPlayer = useMemo(() => {
    if(gameValues.playerOne.id === userData?.userId) return gameValues.playerTwo
    else return gameValues.playerOne
  }, [gameValues, userData?.userId])

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