import { FC } from "react";
import { IInputProps } from "../../../../interfaces/form";

export const Textarea:FC<IInputProps> = ({
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
      <textarea
        {...register(formTitle)}
        className="appearance-none border border-gray rounded w-full
          py-2 px-3 text-black-400 leading-tight focus:outline-purple-200"
        id={formTitle}
        type={inputType}
        placeholder={placeholder}
        defaultValue={value}
        rows="6"
      />
      {errors[formTitle] && (
        <p className="text-red-200 text-s">{errors[formTitle].message}</p>
      )}
    </div>
  )
};
