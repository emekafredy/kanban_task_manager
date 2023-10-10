import { FC, useState } from "react";
import { AddSVG } from "../../components/Common/SVG/AddSVG";
import { BoardColumn } from "../../components/BoardColumn";
import { IBoardDataProps } from "../../interfaces/board";
import { ColumnFormModal } from "../../components/ColumnFormModal";

export const BoardData:FC<IBoardDataProps> = ({board}) => {
  const [showColumnFormModal, setshowColumnFormModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-nowrap overflow-auto bg-silver-100 dark:bg-black-300 h-screen">
        {
          board?.columns?.map((column, i) => {
            return (
              <div
                key={i}
                className={`mx-4 my-8 ${!(column?.tasks?.length) ? 'hidden' : ''}`}
              >
                <BoardColumn
                  column={column}
                />
              </div>
            )
          })
        }
        <div
          className="mx-4 mt-12 mb-48"
          onClick={() => setshowColumnFormModal(true)}
        >
          <div className="flex items-center justify-center
            bg-gradient-to-t from-silver-400 to-silver-200
            dark:bg-gradient-to-t dark:from-black-300 dark:to-black-200
            rounded hover:cursor-pointer my-4 h-full w-[300px]">
            <div className="text-center">
              <button
                type="button"
                className="text-gray-200 px-5 py-3 
                  inline-flex items-center font-bold mr-4">
                <AddSVG color={"#828FA3"} />
                <span className="text-l ml-1">New Column</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showColumnFormModal && (
        <ColumnFormModal setShowModal={setshowColumnFormModal}/>
      )}
    </>
  )
};
