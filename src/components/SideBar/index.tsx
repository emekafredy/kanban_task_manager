import { FC } from "react";
import { useSelector } from "react-redux";

import { ThemeSwitch } from "./ThemeSwitch";
import { SideBarMenu } from "./SideBarMenu";

import { getThemeState } from "../../store/slices/theme";
import { useVisibleSidebar } from "../../hooks/useVisibleSidebar";

import HideSidebarIcon from "../../assets/icons/icon-hide-sidebar.svg";
import ShowSidebarIcon from "../../assets/icons/icon-show-sidebar.svg";
import DarkLogoIcon from "../../assets/icons/logo-dark.svg";
import LightLogoIcon from "../../assets/icons/logo-light.svg";

export const SideBar:FC = () => {
  const { colorTheme } = useSelector(getThemeState);
  const {visible, setSidebarVisible} = useVisibleSidebar();

  return (
    <>
      {!visible ? (
        <div
          onClick={() => setSidebarVisible("true")}
          className="fixed cursor-pointer left-0 bottom-8
            bg-purple-200 p-6 pr-8 rounded-r-full
            sm-mobile:hidden tablet:block"
        >
          <img src={ShowSidebarIcon} alt="show-sidebar" className="w-6"/>
        </div>
      ) : (
        <div className={`
          sm-mobile:hidden
          tablet:block
          top-0
          left-0
          laptop:w-[300px]
          tablet:w-[250px]
          bg-white
          dark:bg-black-200
          text-white
          h-screen
          ease-in-out
          border-r-2
          border-silver-200
          dark:border-black-100`}
        >
          <img
            src={colorTheme === 'dark' ? LightLogoIcon : DarkLogoIcon}
            alt="logo"
            className="p-10"
          />

          <div className="flex flex-col gap-y-[500px]">
            <SideBarMenu />
            <ThemeSwitch />
          </div>

          <div className="flex items-center px-2 w-4/5 m-auto">
            <img
              src={HideSidebarIcon}
              alt="hide-sidebar"
              className="mr-4 hover:cursor-pointer"
              onClick={() => setSidebarVisible("false")}
            />
            <span className="text-gray font-bold text-m">Hide Sidebar</span>
          </div>
        </div>
      )}
    </>
  )
};
