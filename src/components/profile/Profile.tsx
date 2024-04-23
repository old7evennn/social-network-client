import React from 'react'
import { selectCurrent } from '../../features/user/userSlice'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { BASE_URL } from '../../constans'
import { Link } from 'react-router-dom'
import { paths } from '../../router/paths'
import { MdAlternateEmail } from 'react-icons/md'

export const Profile = () => {
  const current = useSelector(selectCurrent)

  if (!current) return null 

  const { name, email, avatartUrl, id } = current
  console.log(current);
  

  return (
    <Card className="py-4 w-[302px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          alt="Card Profile"
          className="object-cover rounded-x1"
          src={`${BASE_URL}${avatartUrl}`}
          width={370}
        />
        <CardBody>
          <Link to={`${paths.user}/${id}`}>
            <h4 className="font-bold text-large mb-2">{name}</h4>
          </Link>
          <p className="flex text-danger-500 items-center gap-1"><MdAlternateEmail /> {email}</p>
        </CardBody>
      </CardHeader>
    </Card>
  )
}
