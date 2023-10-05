import { FC, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import DarkThemeIcon from '../../assets/icons/icon-dark-theme.svg';
import LightThemeIcon from '../../assets/icons/icon-light-theme.svg';
 
export const ThemeSwitch:FC = () => {
  const {colorTheme, setTheme} = useTheme();
  const [dark, setDark] = useState(
      colorTheme === "light" ? true : false
  );

  const toggleDarkMode = () => {
    setTheme(colorTheme);
    setDark((prevState) => !prevState);
  };

  return (
    <div className="w-full m-auto my-6 bg-silver-100 dark:bg-black-300 py-1 px-4 rounded-lg">
      <label
        className="flex justify-center items-center group p-2 bottom-8"
      >
        <img src={LightThemeIcon} alt="light-theme"/>
        <input
          type="checkbox"
          className="absolute
            peer
            appearance-none
            rounded"
          readOnly
          checked={dark}
        />
        <span
          className="
            w-12
            h-6
            flex
            items-center
            flex-shrink-0
            p-1
            mx-6
            bg-purple-200
            rounded-full
            peer-checked:bg-purple-200
            after:bg-white
            after:rounded-full
            after:shadow-md
            after:duration-300
            after:w-4
            after:h-4
            peer-checked:after:translate-x-6 hover:cursor-pointer"
            onClick={() => toggleDarkMode()}
        ></span>
        <img src={DarkThemeIcon} alt="dark-theme" />
      </label>
    </div>
  );
}
