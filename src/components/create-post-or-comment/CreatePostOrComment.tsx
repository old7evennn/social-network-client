import React, { useContext } from "react"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
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
import { useCraeteCommentMutation } from "../../app/services/commentsApi"
import { CreatePostOrCommentProps } from "../../types/types"
import { useParams } from "react-router-dom"

export const CreatePostOrComment: React.FC<CreatePostOrCommentProps> = ({
  forCreate = 'post',
}) => {
  const {id} = useParams<{id: string}>()
  const [createPost] = useCreatePostMutation()
  const [createComment] = useCraeteCommentMutation()
  const [getPostById] = useLazyGetPostByIdQuery()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const { theme } = useContext(ThemeContext)
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = handleSubmit(async data => {
    try {
      if (forCreate === 'post') {
        await createPost({ content: data.post}).unwrap()
        setValue(forCreate, "")
        await triggerGetAllPosts().unwrap()
      }
      if (!id) throw ErrorMessage({error: 'Not id'})
      await createComment({content: data.comment, postId: id}).unwrap()
      setValue(forCreate, "")
      await getPostById(id).unwrap()
      
    } catch (error) {
      console.log("err", error)
    }
  })

  
  
  const error = errors?.post?.message as string

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button className="w-full " onPress={onOpen}>
        Create {forCreate}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={theme}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader
                className={`flex flex-col gap-1 ${theme === "dark" ? "text-white" : "text-black"}`}
              >
                Create {forCreate}
              </ModalHeader>
              <ModalBody>
                <form className="flex-grow" onSubmit={onSubmit}>
                  <Controller
                    name={forCreate}
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        labelPlacement="outside"
                        placeholder={
                          forCreate === "post"
                            ? "What are you thinking about?"
                            : "Write a comment"
                        }
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
                      Add {forCreate}
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
