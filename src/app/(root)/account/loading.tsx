import { Skeleton } from '@/components/ui/Skeleton'
import React, { FC } from 'react'

const Loading: FC = () => {
  return (
    <Skeleton className='w-full col-span-5 h-[500px] sm:h-96' />
  )
}

export default Loading