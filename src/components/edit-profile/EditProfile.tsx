import React, { useContext, useState } from 'react'
import { EditProfileProps } from '../../types/types'
import { ThemeContext } from '../theme-provider'
import { useUpdateUserMutation } from '../../app/services/userApi'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { User } from '../../app/types'
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from '@nextui-org/react'
import { Input } from '../input/Input'
import { MdOutlineEmail } from 'react-icons/md'
import { ErrorMessage } from '../error-message/ErrorMessage'
import { hasErrorField } from '../../utils/has-error-field'

export const EditProfile: React.FC<EditProfileProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const {theme} = useContext(ThemeContext)
  const [updateUser, {isLoading}] = useUpdateUserMutation()
  const [error, setError] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const {id} = useParams<{id: string}>()

  const { handleSubmit, control } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dataOfBirth: user?.dataOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) setSelectedFile(e.target.files[0]) 
  }



  const onSubmit = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData()
        data.name && formData.append('name', data.name)
        data.email && data.email !== user?.email && formData.append('email', data.email)
        data.dataOfBirth &&
        formData.append(
          "dataOfBirth",
          new Date(data.dataOfBirth).toISOString(),
        )
        console.log(data.dataOfBirth)
        data.bio && formData.append('bio', data.bio)
        data.location && formData.append('location', data.location)
        selectedFile && formData.append("avatar", selectedFile)

        await updateUser({userData: formData, id}).unwrap()
        onClose()
      } catch (e) {
        if (hasErrorField(error)) setError(error.data.error)
      }
    }
  }
   
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit profile
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  endContent={<MdOutlineEmail />}
                />
                <Input control={control} name="name" label="Name" type="text" />
                <input
                  className="input-file"
                  id="input-select-file"
                  type="file"
                  name="avatarUrl"
                  accept="image/*"
                  placeholder="Select a file"
                  onChange={handleFileChange}
                />
                <label className='label-for-input' htmlFor="input-select-file">Select a photo</label>
                <Input
                  control={control}
                  name="dataOfBirth"
                  label="Date of birth"
                  type="date"
                  placeholder="Date of birth"
                />
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Your biography"
                    />
                  )}
                />

                <Input
                  control={control}
                  name="location"
                  label="Location"
                  type="text"
                />

                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Edit profile
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
