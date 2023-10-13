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
          className="block text-gray-200 dark:text-white text-s font-semibold mb-2"
          htmlFor={formTitle}
        >
          {formLabel}
        </label>
      )}
      <textarea
        {...register(formTitle)}
        className={`appearance-none border border-gray-100 rounded w-full
          placeholder-gray-200 dark:placeholder-opacity-0 dark:placeholder-gray-100
          py-2 px-3 text-black-100 dark:text-white leading-tight dark:bg-black-200
          ${errors[formTitle] ? "focus:outline-red-200" : "focus:outline-none"}`}
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
