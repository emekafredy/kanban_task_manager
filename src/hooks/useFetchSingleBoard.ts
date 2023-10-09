import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { setBoardName, setSingleBoard } from "../store/slices/board";
import { getSingleBoard } from "../crudServices/boards";

export const useFetchSingleBoard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  
  const getBoard = async () => {
    setLoading(true);
    const title = await searchParams.get("board");
    const data = await getSingleBoard(title);

    await dispatch(setSingleBoard(data));
    await dispatch(setBoardName(title as string));
    setLoading(false);
  }

  useEffect(() => {
      getBoard();
  }, [boardTitle]);

  return { loading, setBoardTitle };
}
