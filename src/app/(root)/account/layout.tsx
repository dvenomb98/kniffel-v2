import AccountSidebar from '@/components/account/AccountSidebar'
import SectionHeader from '@/components/shared/SectionHeader'
import React, { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <section className='page-container'>
        <SectionHeader title="Your account" description="Here you can update your preferences and personal information. You can also find your match history here." />
        <div className='grid grid-cols-7 grid-rows-auto sm:grid-cols-1 sm:gap-10 lg:gap-5'>
          <AccountSidebar />
          {children}
        </div>
    </section>
  )
}

export default Layout