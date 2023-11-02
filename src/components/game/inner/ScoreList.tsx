
import { Skeleton } from '@/components/ui/Skeleton';
import { canAddScore } from '@/lib/game/logic';
import { ActionTypes } from '@/lib/game/reducer';
import { cn } from '@/lib/utils';
import { useGameContext } from '@/providers/GameProvider';
import { BottomLayerKeys, GameState, Layer, Player, PossibleValue, ScoreKeys, UpperLayerKeys } from '@/types/gameTypes';
import React, { FC, useMemo } from 'react';

interface ScoreListProps {
  title: string;
  value: PossibleValue;
  object_key: ScoreKeys;
  layer: Layer;
  currentPlayer: Player;
}

const ScoreList: FC<ScoreListProps> = ({ title, value, object_key, layer, currentPlayer }) => {
  const { gameValues, dispatch, onMove, isDebouncing } = useGameContext();

  const addScore = useMemo(
    () =>
      gameValues?.possibleScores
        ? canAddScore(object_key, gameValues.possibleScores, layer, currentPlayer)
        : false,
    [gameValues?.possibleScores, currentPlayer, object_key, layer],
  );
  const correctLayerScoreValue = useMemo(() => {
    if (!gameValues?.possibleScores) return 0;

    return layer === 'upper_layer'
      ? gameValues.possibleScores.upper_layer[object_key as UpperLayerKeys]
      : gameValues.possibleScores.bottom_layer[object_key as BottomLayerKeys];
  }, [gameValues?.possibleScores, currentPlayer, layer, object_key]);

  if (!gameValues) return null;

  const { rollsLeft } = gameValues;
  const isCancelled = value === 'canceled';

  const canCancelScore = !addScore && !correctLayerScoreValue && !rollsLeft && !value && gameValues.gameState !== GameState.FINISHED
  const lowerOpacity = !onMove && gameValues.gameState !== GameState.FINISHED

  const handleAddScore = () => {
    dispatch({
      type: ActionTypes.SET_SCORE,
      payload: {
        scoreType: object_key,
        scoreValue: correctLayerScoreValue,
        layer,
        shouldCancel: canCancelScore,
      },
    });
  };

  if(isDebouncing) return <Skeleton className='w-full h-[46px]' />

  return (
    <button
      role="button"
      onClick={handleAddScore}
      disabled={!onMove || !!value || isDebouncing || (!addScore && !!rollsLeft)}
      className={cn(
        'flex items-center gap-2 justify-between border p-2 transition-all ease-in-out rounded-md disabled:cursor-default',
        addScore
          ? 'text-primary border-primary border-solid hover:border-primary-dark cursor-pointer'
          : canCancelScore
          ? 'border-error-light hover:border-error-dark cursor-pointer text-error hover:text-error-dark'
          : 'border-divider opacity-70',
        !!value && "dark:bg-secondary-dark bg-secondary/50",
        lowerOpacity && "opacity-70"
      )}
    >
      <span className="flex items-center gap-2">
        {title}
        {!!correctLayerScoreValue && addScore && (
          <span className="text-primary">{`+ (${correctLayerScoreValue})`}</span>
        )}
      </span>
      <span className={cn(isCancelled && 'text-error-dark')}>
        {isCancelled ? 'X' : value}
      </span>
    </button>
  );
};

export default ScoreList;