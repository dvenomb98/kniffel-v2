import React, { FC, PropsWithChildren } from 'react'

const AccountPageLayout: FC<PropsWithChildren & {header?: string}> = ({children, header}) => {
  return (
    <section className='lg:col-span-5 flex flex-col gap-5'>
        {!!header && <h3 className='h3'>{header}</h3>}
        {children}

    </section>
  )
}

export default AccountPageLayout