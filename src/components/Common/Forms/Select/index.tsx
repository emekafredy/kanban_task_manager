import { FC, useState } from "react";
import { ISelectProps } from "../../../../interfaces/form";
import ChevronDownIcon from "../../../../assets/icons/icon-chevron-down.svg";
import ChevronUpIcon from "../../../../assets/icons/icon-chevron-up.svg";

export const Select:FC<ISelectProps> = ({
  formLabel,
  formTitle,
  optionsData,
  selected,
  setSelected,
  mode,
  handleTaskStatusUpdate
}) => {
  const [open, setOpen] = useState(false);

  const handleSelectChange = (status: string) => {
    if (status !== selected) {
      setSelected(status);
      setOpen(false);

      if (mode === "update") {
        handleTaskStatusUpdate?.('status', status);
      } else {
        return;
      }
    }
  }

  return (
    <div className="w-full my-8">
      <label
        className="block text-gray-200 dark:text-white text-s font-semibold mb-2"
        htmlFor={formTitle}
      >
        {formLabel}
      </label>
      <div
        onClick={() => setOpen(prev => !prev)}
        className={`p-2 flex items-center text-black-100 dark:text-white justify-between
          rounded cursor-pointer border ${open ? "border-purple-200" : "border-gray-100"}`}
      >
        {selected ? (selected?.length > 15
          ? selected?.substring(0, 15) + "..."
            : selected) : 'Select a Status'}
        <img src={open ? ChevronUpIcon : ChevronDownIcon} alt="logo" className="px-2"/>
      </div>
      <ul
        className={`bg-white dark:bg-black-300 mt-2 rounded overflow-y-auto transition-all duration-500 ${
          open ? "max-h-28 z-[50]" : "max-h-0"
        } `}
      >
        {optionsData?.map((data, i) => {
          return (
            <li
              key={i}
              className={`p-2 text-m cursor-pointer
                ${data === selected ? 'bg-purple-200 text-white' : 'text-black-100 hover:bg-silver-300 dark:hover:text-white'}
              `}
              onClick={() => handleSelectChange(data)}
            >
              {data}
            </li>
          )
        })}
      </ul>
    </div>
  )
};
