import React, { useEffect, useState } from "react";
import { IMovie, ISearchMovieApiResponse } from "./App";


interface IuseMoviesResponse{
    isLoading: boolean,
    movies: IMovie[],
    error: string,
    foundCount: number
}
export function useMovies(query :string) : IuseMoviesResponse {
    const API_KEY = "55c0e22f";
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [error, setError] = useState<string>("");
    const [foundCount, setFoundCount] = useState<number>(0);

    useEffect(() => {
        const controller = new AbortController();
    
        async function fetchMovies() {
          try {
            setIsLoading(() => true);
            const response = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
              { signal: controller.signal }
            );
    
            if (!response.ok) {
              throw new Error("Something went wrong.");
            }
            const apiResponse: ISearchMovieApiResponse = await response.json();
            setMovies(() => apiResponse.Search);
            setFoundCount(() => apiResponse.Search?.length);
            setIsLoading(() => false);
          } catch (error) {
            if (error instanceof Error) {
              console.error(error.message);
              console.log(error.name);
              if (error.name === "AbortError") {
                return;
              }
              setError(error.message);
            } else {
              setError((e) => (e = "An unexpected error occurred"));
            }
          } finally {
            setIsLoading(() => false);
          }
        }
        fetchMovies();
        return function () {
          controller.abort();
        };
      }, [query]);

      return {isLoading, movies, error, foundCount};
}