import { Button, Card, Image, useDisclosure } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { resetUser, selectCurrent } from '../../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserByIdQuery, useLazyCurrentQuery, useLazyGetUserByIdQuery } from '../../app/services/userApi';
import { useFollowUserMutation, useUnfollowUserMutation } from '../../app/services/followApi';
import { GoBack } from '../../components/go-back/GoBack';
import { BASE_URL } from '../../constans';
import { MdOutlinePersonAddAlt1, MdOutlinePersonAddDisabled } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { ProfileInfo } from '../../components/profile-info/ProfileInfo';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { CountInfo } from '../../components/count-info/CountInfo';
import { hasErrorField } from '../../utils/has-error-field';
import { EditProfile } from '../../components/edit-profile/EditProfile';

export const UserProfilePage = () => {
  const {id} = useParams<{id: string}>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useSelector(selectCurrent) 
  const {data} = useGetUserByIdQuery(id ?? '')
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserById] = useLazyGetUserByIdQuery()
  const [triggerCurrent] = useLazyCurrentQuery()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetUser())
  }, )

  if (!data) return null  

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({followingId: id}).unwrap()

        await triggerGetUserById(id)
        await triggerCurrent()
      }

    } catch (e) {
      console.log(e);
    }
  }

  const handleClose = async () => {
    try {
      if (!id) return null
      await triggerGetUserById(id)
      await triggerCurrent()
      onClose()
    } catch (e) {
      console.log(e);
    }
  }
  
  return (
    <>
      <GoBack />
      <div className="flex items-center gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data.avatartUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                onClick={handleFollow}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Unsubscribe" : "Subscribe"}
              </Button>
            ) : (
              <Button
                endContent={<CiEdit/>}
                onClick={() => onOpen()}
              >
                Edit
              </Button>
            )}
          </div>
        </Card>
        <Card className='flex flex-col space-y-4 p-5 flex-1'> 
          <ProfileInfo title='Email' info={data.email} />
          <ProfileInfo title='Location' info={data.location} />
          <ProfileInfo title='Data of birth' info={formatToClientDate(data.dataOfBirth)} />
          <ProfileInfo title='Bio' info={data.bio} />
          <div className="flex gap-2">
            <CountInfo title='Followers' count={data.followers.length}/>
            <CountInfo title='Following' count={data.following.length}/>
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose}  user={data}/>
    </>
  )
}
