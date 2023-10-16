import { FC } from "react";
import { SideBarMenu } from "../SideBar/SideBarMenu";
import { ThemeSwitch } from "../SideBar/ThemeSwitch";
import { IMobileSideBarMenuProps } from "../../interfaces/navigation";

export const MobileSideBarMenu:FC<IMobileSideBarMenuProps> = ({
  showMobileSideBar,
  setShowMobileSidebar,
  setShowAddNewBoardModal
}) => {
  function onOverlayClick(e: any) {
    setShowMobileSidebar(false);
    e.stopPropagation()
  }

  function onMenuClick(e: any) {
    e.stopPropagation()
  }
  return (
    <>
      <div className={`fixed z-[1000] ease-in rounded-lg border-none
        bg-white dark:bg-black-200 w-[70%] h-[400px]
        max-h-[700px] overflow-auto mx-auto inset-0
        ${showMobileSideBar ? "top-20" : "-top-full"} transition-all duration-500`}
        onClick={onMenuClick}
      >
        <SideBarMenu setShowModal={setShowAddNewBoardModal}/>

        <div className="absolute bottom-8 px-8 w-full">
          <ThemeSwitch />
        </div>
      </div>
      <div 
        className={`opacity-60 fixed inset-0 z-40 bg-black-500
        ${showMobileSideBar ? "top-16" : "top-full"} transition-all duration-500`}
      onClick={onOverlayClick}
      >
      </div>
    </>
  )
};
