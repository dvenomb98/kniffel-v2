
import { cn } from '@/lib/utils';
import { useGameContext } from '@/providers/GameProvider';
import { Die } from '@/types/gameTypes';
import React, { FC } from 'react';

interface SingleDieProps {
  die: Die;
  holdDie: () => void;
}

const SingleDie: FC<SingleDieProps> = ({ die, holdDie }) => {
  const { gameValues, onMove, isDebouncing } = useGameContext();

  const { value, isHeld } = die;

  const shouldChangeBorder = isHeld || !gameValues?.rollsLeft;


  if (!gameValues) return null;

  return (
    <button
      onClick={() => value ? holdDie() : undefined}
      className={cn(
        'w-32 aspect-square border rounded-md flex items-center justify-center dark:bg-secondary-dark bg-secondary-light',
        shouldChangeBorder ? 'border-primary' : 'border-divider',
        !value && "cursor-not-allowed"
      )}
      disabled={!onMove || isDebouncing}
    >
      <p
        className={cn(
          'h2 transition transform duration-100 ease-in-out',
        )}
      >
        {!value ? '?' : value}
      </p>
    </button>
  );
};

export default SingleDie;