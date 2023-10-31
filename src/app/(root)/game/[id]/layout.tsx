import React, { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <section className='page-container'>
        {children}
    </section>
  )
}

export default Layout