import { FC, useState, useEffect } from "react";
import MobileLogoIcon from "../../assets/icons/logo-mobile.svg";
import ChevronDownIcon from "../../assets/icons/icon-chevron-down.svg";
import ChevronUpIcon from "../../assets/icons/icon-chevron-up.svg";
import { SideBarMenu } from "../SideBar/SideBarMenu";
import { ThemeSwitch } from "../SideBar/ThemeSwitch";
import { BoardFormModal } from "../Board/BoardFormModal";
import { IMobileTopLeftNavProps } from "../../interfaces/navigation";

export const MobileTopLeftNav:FC<IMobileTopLeftNavProps> = ({
  title
}) => {
  const [showMobileSideBar, setShowMobileSidebar] = useState<boolean>(false);
  const [showAddNewBoardModal, setShowAddNewBoardModal] = useState<boolean>(false);

  useEffect(() => {
    if (showAddNewBoardModal) {
      setShowMobileSidebar(false)
    }
  }, [showAddNewBoardModal])

  return (
    <>
       <div className="sm-mobile:flex tablet:hidden items-center">
        <div className="p-4">
          <img src={MobileLogoIcon} alt="logo" />
        </div>

        <div className="relative">
          <button
            className="flex items-center px-6 pb-2 pt-2.5 text-black-400 dark:text-white font-bold"
            type="button"
            onClick={() => setShowMobileSidebar((prev) => !prev)}
          >
            {title}
            <img src={showMobileSideBar ? ChevronUpIcon : ChevronDownIcon} alt="logo" className="px-2"/>
          </button>

          {showMobileSideBar && (
            <div className="absolute z-[1000] w-full float-left mt-6 min-w-max
              h-[250px] overflow-auto rounded-lg border-none bg-white
              dark:bg-black-200">
              <SideBarMenu setShowModal={setShowAddNewBoardModal}/>
              <ThemeSwitch />
            </div>
          )}
        </div>
      </div>
      {showAddNewBoardModal && <BoardFormModal setShowModal={setShowAddNewBoardModal} />}
    </>
  )
};
