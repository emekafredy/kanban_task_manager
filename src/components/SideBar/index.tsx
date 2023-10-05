import { FC } from "react";
import { useSelector } from "react-redux";

import { ThemeSwitch } from "./ThemeSwitch";
import { SideBarMenu } from "./SideBarMenu";

import { getThemeState } from "../../store/slices/theme";

import HideSidebarIcon from "../../assets/icons/icon-hide-sidebar.svg";
import ShowSidebarIcon from "../../assets/icons/icon-show-sidebar.svg";
import DarkLogoIcon from "../../assets/icons/logo-dark.svg";
import LightLogoIcon from "../../assets/icons/logo-light.svg";

interface ISideBarProps {
  sideBarVisible: boolean;
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBar:FC<ISideBarProps> = ({
  sideBarVisible,
  setSidebarVisible,
}: ISideBarProps) => {
  const { colorTheme } = useSelector(getThemeState);

  return (
    <>
      {!sideBarVisible ? (
        <div
          onClick={() => setSidebarVisible(true)}
          className="fixed cursor-pointer left-0 bottom-8
            bg-purple-200 p-6 pr-8 rounded-r-full
            sm-mobile:hidden tablet:block z-50"
        >
          <img src={ShowSidebarIcon} alt="show-sidebar" className="w-6"/>
        </div>
      ) : (
        <div className={`
          laptop:col-span-2
          tablet:col-span-3
          flex-none
          sm-mobile:hidden
          tablet:block
          h-screen
          sticky
          top-0
          left-0
          bg-white
          dark:bg-black-200
          text-white
          ease-in-out
          border-r-2
          border-silver-200
          overflow-y-hidden
          dark:border-black-100`}
        >
          <img
            src={colorTheme === 'dark' ? LightLogoIcon : DarkLogoIcon}
            alt="logo"
            className="p-10"
          />

          <SideBarMenu />

          <div className="absolute bottom-8 px-4 w-full">
            <ThemeSwitch />
            <div className="flex items-center w-4/5 mx-4">
              <img
                src={HideSidebarIcon}
                alt="hide-sidebar"
                className="mr-4 hover:cursor-pointer"
                onClick={() => setSidebarVisible(false)}
              />
              <span className="text-gray font-bold text-m">Hide Sidebar</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
};
