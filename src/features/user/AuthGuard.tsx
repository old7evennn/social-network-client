import React from 'react'
import { useCurrentQuery } from '../../app/services/userApi'
import { Spinner } from '@nextui-org/react'

export const AuthGuard = ({children}: {children: JSX.Element}) => {
  const {isLoading} = useCurrentQuery()

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>
  )
  return children
}
