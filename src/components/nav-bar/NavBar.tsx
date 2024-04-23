import React from 'react'
import { NavButton } from '../nav-button/NavButton'
import { BsPostcard } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { FaUsers } from 'react-icons/fa'
import { CreatePost } from '../create-post/CreatePost'
import { CreatePostOrComment } from '../create-post-or-comment/CreatePostOrComment'
import { useLocation } from 'react-router-dom'
import { paths } from '../../router/paths'

export const NavBar = () => {
  const location = useLocation()  
  return (
    <nav>
      <ul className="flex flex-col grap-5">
        <li>
          <NavButton href="/" icon={<BsPostcard />}>
            Posts
          </NavButton>
        </li>
        <li>
          <NavButton href="following" icon={<FiUsers />}>
            Following
          </NavButton>
        </li>
        <li>
          <NavButton href="followers" icon={<FaUsers />}>
            Followers
          </NavButton>
        </li>
        {location.pathname === paths.home ? (
          <li className="mt-10 w-full flex justify-center">
              <CreatePostOrComment forCreate='post' />
          </li>
        ): null}
      </ul>
    </nav>
  )
}
