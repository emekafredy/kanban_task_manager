import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setVisibleSidebar } from "../store/slices/sidebar";
 
export const useVisibleSidebar = () => {
    const [sidebarVisible, setSidebarVisible ] = useState<string>(localStorage.sidebarVisible);
    const visible = sidebarVisible === "true" ? true : false;
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch(setVisibleSidebar(visible))
        localStorage.setItem('sidebarVisible', sidebarVisible);
    }, [sidebarVisible, visible]);

    return { visible, setSidebarVisible };
}
