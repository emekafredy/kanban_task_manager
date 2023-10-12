import { FC } from "react";
import { IModalProps } from "../../../interfaces/common";
import Elipses from "../../../assets/icons/icon-vertical-ellipsis.svg";

export const Modal:FC<IModalProps> = ({
  title,
  children,
  setFooter,
  setShowModal,
  closeBTN = true,
  actionTerm,
  performAction,
  actionBtnLoading,
  showMenuOptions,
  setShowMenuOptions,
  menuOptions
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
          overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded"
        onClick={onOverlayClick}
      >
        <div
          className="relative sm-mobile:w-[90%] mobile:w-[75%] tablet:w-[50%] laptop:w-[40%] desktop:w-[30%] m-auto"
          onClick={onModalClick}
        >
          <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-white dark:bg-black-200 outline-none focus:outline-none">
            <div className="flex justify-between items-center pt-8 px-8">
              <h3 className={`text-l font-bold ${actionTerm === 'Delete' ? 'text-red-200 dark:text-red-200' : 'text-black-300 dark:text-white'}`}>
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
                  onClick={() => setShowMenuOptions?.(!showMenuOptions)}
                >
                  <img
                    src={Elipses}
                    className="h-5 w-2 cursor-pointer"
                    alt="board-options"
                  />
                </button>
              )}

              {showMenuOptions && menuOptions}
            </div>

            {children}

            {setFooter && (
              <div className="flex items-center justify-between px-8 pt-4 pb-8 rounded-b">
                <button
                  className="bg-red-200 text-white font-bold px-20 py-2 text-m outline-none focus:outline-none rounded-full"
                  type="button"
                  onClick={performAction}
                  disabled={actionBtnLoading}
                >
                  {actionTerm}
                </button>
                <button
                  className="bg-silver-100 text-purple-200 font-bold px-20 py-2 text-m outline-none focus:outline-none rounded-full"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
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
