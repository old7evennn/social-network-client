import React from "react"
import { selectCurrent } from "../../features/user/userSlice"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { paths } from "../../router/paths"
import { Card, CardBody } from "@nextui-org/react"
import { User } from "../../components/user/User"

export const FollowingPage = () => {
  const currentUser = useSelector(selectCurrent)

  if (!currentUser) return null

  return currentUser.following.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map(user => (
        <Link to={`${paths.user}/${user.following.id}`} key={user.following.id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.following.name ?? ""}
                avatartUrl={user.following.avatartUrl ?? ""}
                description={user.following.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h2>You have no following</h2>
  )
}
