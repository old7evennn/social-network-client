import { Control } from "react-hook-form"
import { IconType } from "react-icons"
import { User } from "../app/types"


export type ThemeContextType = {
  theme: "dark" | "light"
  toggleTheme: () => void
}

export type ContainerProps = {
  children: React.ReactElement[] | React.ReactElement
}

export type NavButtonProps = {
  children: React.ReactNode
  icon: JSX.Element
  href: string
}

export type ButtonProps = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean
  color?: "default"| "primary"| "secondary"| "success"| "warning"| "danger"| undefined
}

export type LoginProps = {
  setSelected: (value: string) => void
}

export type InputProps = {
  name: string
  label: string
  placeholder?: string
  type?: string
  control: Control<any>
  required?: string
  endContent?: JSX.Element
}

export type LoginForm = {
  email: string
  password: string
}

export type RegisterForm = {
  email: string
  password: string
  name: string
}

export type RegisterProps = {
  setSelected: (value: string) => void
}

export type CardProps = {
  avatartUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createAt?: Date
  id?: string
  cardFor: "comment" | "post" | "current-post"
  likeByUser?: boolean
}

export type UserProps = {
  name: string
  avatartUrl: string
  description?: string
  className?: string
}

export type TypographyProps = {
  children: string
  size?: string
}

export type MetaInfoProps = {
  count: number
  Icon: IconType
}

export type CreatePostOrCommentProps = {
  forCreate: 'post' | 'comment'
}

export type ProfileInfoProps = {
  title: string
  info?: string
}

export type CountInfoProps = {
  count: number
  title: string
}

export type EditProfileProps = {
  isOpen: boolean
  onClose: () => void
  user?: User
}