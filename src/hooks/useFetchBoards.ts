import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setBoards, setSingleBoard } from "../store/slices/board";
import { getBoards } from "../crudServices/board";
import { IBoardObjectProps } from "../interfaces/board";
 
export const useFetchBoards = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const getAllBoards = async () => {
        setLoading(true);
        const data = await getBoards();

        await dispatch(setBoards(data as IBoardObjectProps[]));
        await dispatch(setSingleBoard(data[0]));
        setLoading(false);
    }

    useEffect(() => {
        getAllBoards();
    }, []);

    return { loading };
}
