import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginForm, LoginProps } from '../../types/types'
import { Input } from '../../components/input/Input'
import { Button, Link } from '@nextui-org/react'
import { useLazyCurrentQuery, useLoginMutation } from '../../app/services/userApi'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../router/paths'
import { ErrorMessage } from '../../components/error-message/ErrorMessage'
import { hasErrorField } from '../../utils/has-error-field'

export const Login: React.FC<LoginProps> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })
  
  const [login, {isLoading}] = useLoginMutation()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [triggerCurrentCuery] = useLazyCurrentQuery()

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data).unwrap()
      await triggerCurrentCuery().unwrap()
      navigate(paths.home)
    } catch (e) {
      if (hasErrorField(e)) {
        setError(e.data.error)
      }
    }
  }
  
  return (
    <form className=" flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="required field"
      />
      <Input
        control={control}
        name="password"
        label="Password"
        type="password"
        required="required field"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Don't have an account?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("sign-up")}
        >
          Sign up
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Sign in
        </Button>
      </div>
    </form>
  )
}
