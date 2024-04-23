import React from 'react'
import { TypographyProps } from '../../types/types'

export const Typography: React.FC<TypographyProps> = ({
  children,
  size = 'text-xl'
}) => {
  return (
    <p className={`${size}`}>{children}</p>
  )
}
