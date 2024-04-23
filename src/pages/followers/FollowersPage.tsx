import React from 'react'
import { selectCurrent } from '../../features/user/userSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { paths } from '../../router/paths'
import { Card, CardBody } from '@nextui-org/react'
import { User } from '../../components/user/User'

export const FollowersPage = () => {
  const currentUser = useSelector(selectCurrent)

  if (!currentUser) return null
  
  return currentUser.followers.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.followers.map(user => (
        <Link to={`${paths.user}/${user.follower.id}`} key={user.follower.id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.follower.name ?? ""}
                avatartUrl={user.follower.avatartUrl ?? ""}
                description={user.follower.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h2>You have no followers</h2>
  )
}
