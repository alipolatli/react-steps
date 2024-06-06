import React, { useEffect, useState } from "react";
import { IMovie } from "./App";

  
export function useLocalStorageState(key: string, initialState: IMovie[]): [IMovie[], React.Dispatch<React.SetStateAction<IMovie[]>>] {
    const [value, setValue] = useState<IMovie[]>(() => {
      const storedMovies = localStorage.getItem(key);
      return storedMovies ? JSON.parse(storedMovies) : initialState;
    });
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
  
    return [value, setValue];
  }