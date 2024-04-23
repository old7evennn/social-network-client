import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RegisterForm, RegisterProps } from '../../types/types'
import { Input } from '../../components/input/Input'
import { Button, Link } from '@nextui-org/react'
import { useLazyCurrentQuery, useLoginMutation, useRegisterMutation } from '../../app/services/userApi'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../router/paths'
import { hasErrorField } from '../../utils/has-error-field'
import { ErrorMessage } from '../../components/error-message/ErrorMessage'

export const Register: React.FC<RegisterProps> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [triggerCurrentCuery] = useLazyCurrentQuery()

  const onSubmit = async (data: RegisterForm) => {
    try {
      await register(data).unwrap()
      setSelected('login')
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
        name="name"
        label="Name"
        type="text"
        required="required field"
      />
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
      <ErrorMessage error={error}/>
      <p className="text-center text-small">
        Already have an account?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
        >
          Sign in
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Sign up
        </Button>
      </div>
    </form>
  )
}
