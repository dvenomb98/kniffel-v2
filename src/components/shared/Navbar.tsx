import { BoxIcon } from 'lucide-react'
import React, { FC } from 'react'
import Logo from './Logo'
import ThemeSwitcher from '../ui/ThemeSwitcher'

const Navbar: FC = async () => {
    
  return (
    <section className='border-b border-divider p-5'>
    <nav className='layout-container flex items-center justify-between'>
      <Logo />
      <ThemeSwitcher />
    </nav>
    </section>
  )
}

export default Navbar