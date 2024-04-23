import { Input as InputComponent } from "@nextui-org/react"
import React from "react"
import { InputProps } from "../../types/types"
import { useController } from "react-hook-form"

export const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  type,
  control,
  required = "",
  endContent,
}) => {
  const { 
    field, 
    fieldState: {invalid}, 
    formState: {errors}
   } = useController({
    name,
    control,
    rules: {
      required,
    },
  })

  return (
    <InputComponent
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors.name?.message || ""}`}
    />
  )
}
