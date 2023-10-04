import { FC, useState } from "react";
import { BoardSVG } from "../common/BoardSVG";
import { AddSVG } from "../common/AddSVG";

export const SideBarMenu:FC = () => {
  const Menus = [
    { title: "Platform Launch" },
    { title: "Marketing Plan" },
    { title: "Roadmap" },
    { title: "Platform" },
    { title: "Launch" },
  ];
  const [activeBoard, setActiveBoard] = useState<string>(Menus[0].title);

  return (
    <div className="mt-4 max-h-[550px] overflow-auto">
      <p className="ml-10 text-m font-bold leading-15 tracking-wide text-gray"> ALL BOARDS (3)</p>
      <ul className="mt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`
              flex py-4 hover:cursor-pointer text-gray text-sm items-center
              gap-x-4 font-bold pl-10 mr-6 ease-in-out transition-300
              ${Menu.title === activeBoard ? 'text-white bg-purple-200 px-4 rounded-r-full' : ''}
            `}
            onClick={() => setActiveBoard(Menu.title)}
          >
            <BoardSVG color={Menu.title === activeBoard ? "#FFFFFF" : "#828FA3"}/>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}

        <li
          className={`
            flex py-4 cursor-pointer text-gray text-sm items-center
            gap-x-4 font-bold pl-10 mr-6 ease-in-out transition-300`}
        >
          <BoardSVG color={"#635FC7"}/>
          <AddSVG color={"#635FC7"}/>
          <span className="ml-[-15px] text-purple-200 flex">
            Create New Board
          </span>
        </li>
      </ul>
    </div>
  )
};
