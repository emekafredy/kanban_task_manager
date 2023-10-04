import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setColorTheme } from "../store/slices/theme";
 
export const useTheme = () => {
    const [theme, setTheme] = useState<string>(localStorage.theme);
    const colorTheme = theme === "dark" ? "light" : "dark";
    const dispatch = useDispatch();
 
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        dispatch(setColorTheme(theme))
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);

    return { colorTheme, setTheme };
}
