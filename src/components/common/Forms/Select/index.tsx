import { FC, useState } from "react";
import { ISelectProps } from "../../../../interfaces/form";
import ChevronDownIcon from "../../../../assets/icons/icon-chevron-down.svg";
import ChevronUpIcon from "../../../../assets/icons/icon-chevron-up.svg";

export const Select:FC<ISelectProps> = ({
  formLabel,
  formTitle,
  optionsData,
  selected,
  setSelected
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full my-8">
      <label
        className="block text-gray text-s font-semibold mb-2"
        htmlFor={formTitle}
      >
        {formLabel}
      </label>
      <div
        onClick={() => setOpen(prev => !prev)}
        className={`p-2 flex items-center justify-between rounded border border-gray cursor-pointer`}
      >
        {selected ? (selected?.length > 15
          ? selected?.substring(0, 15) + "..."
            : selected) : 'Select a Status'}
        <img src={open ? ChevronUpIcon : ChevronDownIcon} alt="logo" className="px-2"/>
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto transition-all duration-500 ${
          open ? "max-h-28 border border-silver-200 z-[50]" : "max-h-0"
        } `}
      >
        {optionsData?.map((data, i) => {
          return (
            <li
              key={i}
              className={`p-2 text-m cursor-pointer
                ${data === selected ? 'bg-purple-200 text-white' : 'text-black-100 hover:bg-silver-300'}
              `}
              onClick={() => {
                if (data !== selected) {
                  setSelected(data);
                  setOpen(false);
                }
              }}
            >
              {data}
            </li>
          )
        })}
      </ul>
    </div>
  )
};
