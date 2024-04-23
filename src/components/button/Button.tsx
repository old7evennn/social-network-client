import React from 'react'
import { ButtonProps } from '../../types/types'
import { Button as NextButton} from '@nextui-org/react'

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color,
  icon,
  fullWidth,
  type
}) => {
  return (
    <NextButton
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
      type={type}
      fullWidth={fullWidth}
    >
      {children}
    </NextButton>
  )
}
