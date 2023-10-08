import { FC } from "react";
import { IInputProps } from "../../../../interfaces/form";
// import {UseFormRegister, FieldValues } from 'react-hook-form'

export const Input:FC<IInputProps> = ({
  hasLabel,
  formLabel,
  formTitle,
  inputType,
  placeholder,
  register,
  errors,
  value
}) => {
  return (
    <div className="mb-4">
      {hasLabel && (
        <label
          className="block text-gray text-s font-semibold mb-2"
          htmlFor={formTitle}
        >
          {formLabel}
        </label>
      )}
      <input
        {...register(formTitle)}
        className="appearance-none border border-gray rounded w-full
          py-2 px-3 text-black-400 leading-tight focus:outline-purple-200"
        id={formTitle}
        type={inputType}
        placeholder={placeholder}
        defaultValue={value}
      />
      {errors[formTitle] && (
        <p className="text-red-200 text-s">{errors[formTitle].message}</p>
      )}
    </div>
  )
};
