import { BoxIcon } from 'lucide-react'
import React, { FC } from 'react'

const Logo: FC = () => {
  return (
    <div className='flex gap-1 items-center'>
        <BoxIcon className='w-5 h-5 text-primary' />
        <h1 className='font-medium h4'>Yathzee</h1>
    </div>
  )
}

export default Logo