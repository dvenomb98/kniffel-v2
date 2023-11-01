import { Skeleton } from '@/components/ui/Skeleton'
import { useGameContext } from '@/providers/GameProvider'
import { GameState } from '@/types/gameTypes'
import React, { FC } from 'react'
import BoardNav from './BoardNav'
import BoardInner from './BoardInner'

const Board: FC = () => {

    const {gameValues} = useGameContext()
    const {gameState} = gameValues!

  return (
    <div className='w-full col-span-4'>
        {gameState === GameState.NOT_STARTED && (
            <Skeleton className='h-[600px] w-full' />
        )}
        {gameState === GameState.IN_PROGRESS && (
          <div className='flex flex-col gap-5'>
            <BoardNav />
            <BoardInner />
          </div>
        )}
    </div>
  )
}

export default Board