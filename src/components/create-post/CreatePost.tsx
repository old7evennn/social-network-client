import React, { useContext } from "react"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../app/services/postsApi"
import { Controller, useForm } from "react-hook-form"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react"
import { ErrorMessage } from "../error-message/ErrorMessage"
import { IoMdCreate } from "react-icons/io"
import { ThemeContext } from "../theme-provider"

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const {theme} = useContext(ThemeContext)
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = handleSubmit(async data => {
    try {
      await createPost({ content: data.post }).unwrap()
      setValue("post", "")
      await triggerGetAllPosts().unwrap()
    } catch (error) {
      console.log("err", error)
    }
  })
  const error = errors?.post?.message as string
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button className="w-full " onPress={onOpen}>Create post</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={theme}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader
                className={`flex flex-col gap-1 ${theme === "dark" ? "text-white" : "text-black"}`}
              >
                Create Post
              </ModalHeader>
              <ModalBody>
                <form className="flex-grow" onSubmit={onSubmit}>
                  <Controller
                    name="post"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        labelPlacement="outside"
                        placeholder="What are you thinking about?"
                        className="mb-5"
                      />
                    )}
                  />
                  {errors && <ErrorMessage error={error} />}
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="success"
                      className="flex-end"
                      endContent={<IoMdCreate />}
                      type="submit"
                      onPress={onClose}
                    >
                      Add Post
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
