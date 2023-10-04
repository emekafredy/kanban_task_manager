import { FC } from "react";
import DarkLogoIcon from "../../assets/icons/logo-dark.svg";
import LightLogoIcon from "../../assets/icons/logo-light.svg";

interface ITopLeftNavProps {
  sidebarVisible: boolean | null;
  colorTheme: string;
}

export const TopLeftNav:FC<ITopLeftNavProps> = ({
  sidebarVisible,
  colorTheme
}: ITopLeftNavProps) => {
  return (
    <div className="sm-mobile:hidden tablet:flex items-center">
      {!sidebarVisible && (
        <div className="p-6 h-full border-r border-black-100">
          <img
            src={colorTheme === 'dark' ? LightLogoIcon : DarkLogoIcon}
            alt="logo"
          />
        </div>
      )}

      <h1 className="ml-4 text-xl font-extrabold text-black-400 dark:text-white">
        Platform Launch
      </h1>
    </div>
  )
};
