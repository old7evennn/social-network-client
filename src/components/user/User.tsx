import React from 'react'
import { UserProps } from '../../types/types'
import { User as UserComponent } from "@nextui-org/react"
import { BASE_URL } from '../../constans'

export const User: React.FC<UserProps> = ({
  name = '',
  avatartUrl = '',
  description = '',
  className = '',
}) => {
  return (
    <UserComponent name={name} className={className} description={description} avatarProps={{
      src: `${BASE_URL}${avatartUrl}`
    }}/>
  )
}
