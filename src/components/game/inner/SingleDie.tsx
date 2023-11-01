
import { cn } from '@/lib/utils';
import { useGameContext } from '@/providers/GameProvider';
import { Die } from '@/types/gameTypes';
import React, { FC, useEffect, useState } from 'react';

interface SingleDieProps {
  die: Die;
  holdDie: () => void;
}

const SingleDie: FC<SingleDieProps> = ({ die, holdDie }) => {
  const { gameValues, onMove, isDebouncing } = useGameContext();
  const [animate, setAnimate] = useState<boolean>(false);

  const { value, isHeld } = die;

  const shouldChangeBorder = isHeld || !gameValues?.rollsLeft;

  useEffect(() => {
    if (isHeld || gameValues?.rollsLeft === 3 || !gameValues?.rollsLeft) return;
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 100); // Reset after 0.1s
    return () => clearTimeout(timer); // Clear timer on unmount or value change
  }, [value, isHeld, gameValues?.rollsLeft]);

  if (!gameValues) return null;

  return (
    <button
      onClick={() => value ? holdDie : undefined}
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
          animate && 'scale-150',
        )}
      >
        {!value ? '?' : value}
      </p>
    </button>
  );
};

export default SingleDie;