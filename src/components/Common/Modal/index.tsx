import { FC } from "react";
import { IModalProps } from "../../../interfaces/common";
import Elipses from "../../../assets/icons/icon-vertical-ellipsis.svg";

export const Modal:FC<IModalProps> = ({
  title,
  children,
  setFooter,
  setShowModal,
  closeBTN = true,
}) => {
  function onOverlayClick(e: any) {
    setShowModal(false);
    e.stopPropagation()
  }

  function onModalClick(e: any) {
    e.stopPropagation()
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden
          overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={onOverlayClick}
      >
        <div
          className="relative sm-mobile:w-[90%] mobile:w-[75%] tablet:w-[50%] laptop:w-[40%] desktop:w-[30%] m-auto"
          onClick={onModalClick}
        >
          <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-white dark:bg-black-200 outline-none focus:outline-none">
            <div className="flex justify-between items-center pt-8 px-8">
              <h3 className="text-l font-bold text-black-300 dark:text-white">
                {title}
              </h3>
              {closeBTN ? (
                <button
                  className="ml-auto border-0 text-gray-200 text-3xl font-bold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="text-gray-200 dark:text-white text-3xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              ) : (
                <button
                  className="ml-auto border-0 text-gray-200 text-3xl font-bold outline-none focus:outline-none"
                  // onClick={() => setShowOptions(false)}
                >
                  <img
                    src={Elipses}
                    className="h-5 cursor-pointer"
                    alt="board-options"
                  />
                </button>
              )}
            </div>

            {children}

            {setFooter && (
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-40 fixed inset-0 z-40 bg-black-500"></div>
    </>
  )
};
