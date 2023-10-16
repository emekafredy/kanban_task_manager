import { FC, useState, useEffect } from "react";
import MobileLogoIcon from "../../assets/icons/logo-mobile.svg";
import ChevronDownIcon from "../../assets/icons/icon-chevron-down.svg";
import ChevronUpIcon from "../../assets/icons/icon-chevron-up.svg";
import { BoardFormModal } from "../Board/BoardFormModal";
import { IMobileTopLeftNavProps } from "../../interfaces/navigation";
import { MobileSideBarMenu } from "../SideBar/MobileSideBarMenu";

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
          <span
            className="flex items-center px-6 pb-2 pt-2.5 text-black-400 dark:text-white font-bold"
            onClick={() => setShowMobileSidebar((prev) => !prev)}
          >
            {title}
            <img src={showMobileSideBar ? ChevronUpIcon : ChevronDownIcon} alt="logo" className="px-2"/>
          </span>

          {/* {showMobileSideBar && ( */}
          <MobileSideBarMenu
            showMobileSideBar={showMobileSideBar}
            setShowMobileSidebar={setShowMobileSidebar}
            setShowAddNewBoardModal={setShowAddNewBoardModal}
          />
          {/* )} */}
        </div>
      </div>
      {showAddNewBoardModal && <BoardFormModal setShowModal={setShowAddNewBoardModal} />}
    </>
  )
};
