import  React from 'react'
import  { ContainerProps } from '../../types/types'

export const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <div className='flex max-w-screen-xl mx-auto mt-10'>{children}</div>
  )
}
