import type React from 'react'
import type { NavButtonProps } from '../../types/types'
import { Button } from '../button/Button'
import { Link } from 'react-router-dom'

export const NavButton: React.FC<NavButtonProps> = ({ children, icon, href }) => {
  return (
    <Link to={href}>
      <Button
        className="flex justify-start text-xl w-full"
        icon={icon}
      >
        {children}
      </Button>
    </Link>
  )
}

