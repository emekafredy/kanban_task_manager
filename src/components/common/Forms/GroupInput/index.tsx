import { FC } from "react";
import { IGroupInputProps } from "../../../../interfaces/form";


export const GroupInput:FC<IGroupInputProps> = ({
  removeInput,
  value,
  handleChange,
  inputId
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="relative w-full">
      <input
        className="appearance-none border border-gray rounded w-full
          py-2 px-3 text-black-100 leading-tight focus:outline-purple-200"
        type="text"
        id={inputId}
        defaultValue={value}
        onChange={(e) => handleChange(e)}
      />
      </div>
      <button
        className="ml-4 border-0 text-gray text-3xl font-bold outline-none focus:outline-none pb-4"
        onClick={(e) => removeInput(e)}
      >
        <span className="text-gray text-3xl block outline-none focus:outline-none">
          ×
        </span>
      </button>
    </div>
  )
};
