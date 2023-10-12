import { FC, useState } from "react";
import { useSelector } from "react-redux";

import { ThemeSwitch } from "./ThemeSwitch";
import { SideBarMenu } from "./SideBarMenu";

import { getThemeState } from "../../store/slices/theme";

import HideSidebarIcon from "../../assets/icons/icon-hide-sidebar.svg";
import ShowSidebarIcon from "../../assets/icons/icon-show-sidebar.svg";
import DarkLogoIcon from "../../assets/icons/logo-dark.svg";
import LightLogoIcon from "../../assets/icons/logo-light.svg";
import { BoardFormModal } from "../Board/BoardFormModal";
import { ISideBarProps } from "../../interfaces/navigation";

export const SideBar:FC<ISideBarProps> = ({
  sideBarVisible,
  setSidebarVisible,
}) => {
  const { colorTheme } = useSelector(getThemeState);
  const [showAddNewBoardModal, setShowAddNewBoardModal] = useState<boolean>(false);

  return (
    <>
      {!sideBarVisible ? (
        <div
          onClick={() => setSidebarVisible(true)}
          className="fixed cursor-pointer left-0 bottom-8
            bg-purple-200 p-6 pr-8 rounded-r-full
            sm-mobile:hidden tablet:block z-10"
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
          border-r-2
          border-silver-200
          overflow-y-hidden
          dark:border-black-100
          ${sideBarVisible ? "translate-x-0 " : "translate-x-full"}`}
        >
          <img
            src={colorTheme === 'dark' ? LightLogoIcon : DarkLogoIcon}
            alt="logo"
            className="p-10"
          />

          <SideBarMenu setShowModal={setShowAddNewBoardModal}/>

          <div className="absolute bottom-8 px-4 w-full">
            <ThemeSwitch />
            <div className="flex items-center w-full ml-[-14px] hover:cursor-pointer
              p-4 px-4  hover:bg-silver-200 hover:rounded-r-full
              hover:text-purple-200 transition duration-500"
              onClick={() => setSidebarVisible(false)}
            >
              <img
                src={HideSidebarIcon}
                alt="hide-sidebar"
                className="mr-4"
              />
              <span className="text-gray-200 hover:text-purple-200 font-bold text-m">Hide Sidebar</span>
            </div>
          </div>
        </div>
      )}
      {showAddNewBoardModal && <BoardFormModal setShowModal={setShowAddNewBoardModal} />}
    </>
  )
};
