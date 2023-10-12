import { FC } from "react";
import { IGroupInputProps } from "../../../../interfaces/form";


export const GroupInput:FC<IGroupInputProps> = ({
  removeInput,
  value,
  handleChange,
  inputId,
  placeholder,
  inputDisabled,
  rmvBtnDisabled,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="relative w-full">
      <input
        className="appearance-none border border-gray-100 rounded w-full placeholder-gray-200 dark:placeholder-gray-100
          py-2 px-3 text-black-100 dark:text-white leading-tight focus:outline-purple-200 dark:bg-black-200 disabled:cursor-not-allowed"
        type="text"
        id={inputId}
        defaultValue={value}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        disabled={inputDisabled}
      />
      </div>
      <button
        className="ml-4 border-0 text-gray-200 text-3xl font-bold outline-none
          focus:outline-none pb-4 disabled:cursor-not-allowed disabled:text-gray-100"
        onClick={(e) => removeInput(e)}
        disabled={rmvBtnDisabled}
      >
        <span className="text-3xl block outline-none focus:outline-none">
          ×
        </span>
      </button>
    </div>
  )
};
