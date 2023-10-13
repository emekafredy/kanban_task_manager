import { FC } from "react";
import className from "classnames";
import { IButtonProps } from "../../../../interfaces/common";

export const Button:FC<IButtonProps> = ({
  title,
  fullwidth,
  rounded,
  roundedBG,
  primary,
  secondary,
  destructive,
  buttonType,
  handleClick,
  disabled=false,
  large,
  small,
  extraClasses,
  leftIcon,
  hasIcon,
}) => {
  const classes = className(`sm-mobile:text-s desktop:text-m font-bold transition
    duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${extraClasses}`,
  {
    "w-full": fullwidth,
    "rounded": rounded,
    "rounded-full": roundedBG,
    "py-3": large,
    "py-2": small,
    "bg-purple-200 text-white hover:bg-purple-100": primary,
    "bg-silver-300 dark:bg-white text-purple-200 hover:bg-purple-400 dark:hover:bg-silver-100": secondary,
    "bg-red-200 text-white hover hover:bg-red-100": destructive,
    "inline-flex items-center": hasIcon
  });

  return (
    <button
      className={classes}
      type={buttonType}
      onClick={handleClick}
      disabled={disabled}
    >
      {leftIcon}
      {title}
    </button>
  )
};
