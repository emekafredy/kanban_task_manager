import { FC } from "react";
import { IOptionsMenuProps } from "../../../interfaces/common";
import className from "classnames";

export const OptionsMenu:FC<IOptionsMenuProps> = ({
  editText,
  deleteText,
  setShowEditModal,
  setShowDeleteModal,
  setShowPrevModal,
  board,
  task
}) => {
  const classes = className("absolute py-3 pl-6 pr-20 bg-white dark:bg-black-300 rounded-lg text-left", {
    "right-4 top-17": board,
    "-right-12 top-20": task,
  });

  return (
    <ul
      className={classes}
    >
      <li
        className="text-s text-justify py-2 text-gray-200 cursor-pointer hover:text-black-200 dark:hover:text-silver-200 font-bold"
        onClick={() => {
          setShowEditModal(true);
          setShowPrevModal(false);
        }}
      >
        {editText}
      </li>
      <li
        className="text-s text-justify py-2 text-red-200 cursor-pointer font-bold"
        onClick={() => {
          setShowDeleteModal(true);
          setShowPrevModal(false);
        }}
      >
          {deleteText}
      </li>
    </ul>
  )
};
