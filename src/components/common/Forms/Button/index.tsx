import { FC } from "react";
import className from "classnames";
import { IButtonProps } from "../../../../interfaces/common";

export const Button:FC<IButtonProps> = ({
  title,
  fullwidth,
  rounded,
  roundedBG,
  purple,
  silver,
  white,
  black,
  buttonType,
  handleClick,
  disabled=false
}) => {
  const classes = className("mt-2 py-3 text-s font-bold", {
    "w-full": fullwidth,
    "rounded": rounded,
    "rounded-full": roundedBG,
    "bg-purple-200 text-white": purple,
    "bg-silver-300 dark:bg-white text-purple-200": silver,
    "bg-white text-purple-200": white,
    "bg-black-400 text-white": black,
  });

  return (
    <button
      className={classes}
      type={buttonType}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
};
