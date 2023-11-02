import React, { FC, PropsWithChildren } from 'react'

const InnerGameLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='grid grid-cols-6 gap-x-5 gap-y-5 min-w-[900px]'>{children}</div>
  )
}

export default InnerGameLayout