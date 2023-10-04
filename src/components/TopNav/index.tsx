import { FC } from "react";
import { useSelector } from "react-redux";
import { AddSVG } from "../common/AddSVG";
import Elipses from "../../assets/icons/icon-vertical-ellipsis.svg";
import { getThemeState } from "../../store/slices/theme";
import { getSidebarState } from "../../store/slices/sidebar";
import { MobileTopLeftNav } from "./MobileTopLeftNav";
import { TopLeftNav } from "./TopLeftNav";

export const TopNav:FC = () => {
  const { colorTheme } = useSelector(getThemeState);
  const { visible: sidebarVisible } = useSelector(getSidebarState);

  return (
    <nav className="flex justify-between bg-white dark:bg-black-200 border-b-2 border-silver-200 dark:border-black-100">
      <MobileTopLeftNav />
      <TopLeftNav
        colorTheme={colorTheme}
        sidebarVisible={sidebarVisible}
      />

      <div className="flex items-center p-4">
        <button
          type="button"
          className="text-white bg-purple-200 rounded-full text-sm px-5 py-2 
            inline-flex items-center font-extrabold mr-4">
          <AddSVG color={"#FFFFFF"} />
          <span className="tablet:inline sm-mobile:hidden">Add New Task</span>
        </button>

        <img
          src={Elipses}
          className="h-6 cursor-pointer"
          alt="board-options"
        />
      </div>
    </nav>
  )
};
