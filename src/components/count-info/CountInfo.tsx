import React from 'react'
import { CountInfoProps } from '../../types/types'

export const CountInfo: React.FC<CountInfoProps> = ({
  title, count
}) => {
  return (
    <div className="flex flex-col items-center skew-x-2 p-4">
      <span className='text-4xl font-semibold'>
        {count}
      </span>
      <span>{title}</span>
    </div>
  )
}
