import { FC } from "react";

import DarkLogoIcon from "../../assets/icons/logo-dark.svg";
import LightLogoIcon from "../../assets/icons/logo-light.svg";

interface ITopLeftNavProps {
  sideBarVisible: boolean | null;
  colorTheme: string;
  title: string
}

export const TopLeftNav:FC<ITopLeftNavProps> = ({
  sideBarVisible,
  colorTheme,
  title
}: ITopLeftNavProps) => {
  return (
    <div className="sm-mobile:hidden tablet:flex items-center">
      {!sideBarVisible && (
        <div className="p-6 h-full border-r-2 border-silver-200">
          <img
            src={colorTheme === 'dark' ? LightLogoIcon : DarkLogoIcon}
            alt="logo"
          />
        </div>
      )}

      <h1 className="ml-4 text-xl font-extrabold text-black-400 dark:text-white">
        {title}
      </h1>
    </div>
  )
};
