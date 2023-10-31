import { BoxIcon } from 'lucide-react'
import React, { FC } from 'react'
import Logo from './Logo'
import ThemeSwitcher from '../ui/ThemeSwitcher'

const Navbar: FC = async () => {
    
  return (
    <section className='p-5 border-b border-divider'>
    <nav className='layout-container flex items-center justify-between'>
      <Logo />
      <ThemeSwitcher />
    </nav>
    </section>
  )
}

export default Navbar