import { FC } from "react";
import { IModalProps } from "../../../interfaces/common";
import Elipses from "../../../assets/icons/icon-vertical-ellipsis.svg";
import { Button } from "../Forms/Button";

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
                <span
                  className="text-gray-200 dark:text-white text-3xl block cursor-pointer"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </span>
              ) : (
                <img
                  src={Elipses}
                  className="cursor-pointer"
                  alt="board-options"
                  onClick={() => setShowMenuOptions?.(!showMenuOptions)}
                />
              )}

              {showMenuOptions && menuOptions}
            </div>

            {children}

            {setFooter && (
              <div className="flex items-center justify-between px-8 pt-4 pb-8 rounded-b">
                <Button
                  destructive
                  buttonType="button"
                  roundedBG
                  small
                  title={actionTerm || ''}
                  handleClick={performAction}
                  disabled={actionBtnLoading}
                  extraClasses="px-20"
                />

                <Button
                  secondary
                  buttonType="button"
                  roundedBG
                  small
                  title="Cancel"
                  handleClick={() => setShowModal(false)}
                  disabled={actionBtnLoading}
                  extraClasses="px-20"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-40 fixed inset-0 z-40 bg-black-500"></div>
    </>
  )
};
