import React, { useRef, useState } from "react";
import StarRating from "./components/StarRating";
import { title } from "process";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorage";
import { useKey } from "./useKey";

//#region  API RESPONSE
export interface ISearchMovieApiResponse {
  Response: boolean;
  Search: Array<IMovie>;
  totalResults: string;
}
export interface IMovieDetailApiResponse {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  Dvd: string;
  Director: string;
  Genre: string[];
  Language: string[];
  Metascore: string;
  Plot: string;
  Poster: string;
  Rated: string;
  Ratings: IMovieDetailApiResponse_IRating[];
  Released: string;
  Runtime: string;
  Title: string;
  Type: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  ImdbVotes: string;
}
export interface IMovieDetailApiResponse_IRating {
  Source: string;
  Value: string;
}
//#endregion

export interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime?: number;
  imdbRating?: number;
  userRating?: number;
  countRef?: React.MutableRefObject<number>;
}

const tempMovieData: IMovie[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData: IMovie[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const API_KEY = "55c0e22f";
const average = (arr: number[]): number =>
  arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

function App() {
  const [query, setQuery] = useState<string>("");
  // const [foundCount, setFoundCount] = useState<number>(0);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [movies, setMovies] = useState<IMovie[]>(tempMovieData);
  // const [error, setError] = useState<string>("");
  const { foundCount, isLoading, movies, error } = useMovies(query);

  const [watchedMovies, setWatchedMovies] = useLocalStorageState("movies", []);

  const [selectedId, setSelectedId] = useState<string>(" ");
  // const [watchedMovies, setWatchedMovies] = useState<IMovie[]>([]);
  // const [watchedMovies, setWatchedMovies] = useState<IMovie[]>(function () {
  //   const storedMovies = localStorage.getItem("watchedMovies");
  //   if (storedMovies) {
  //     return JSON.parse(storedMovies);
  //   }
  //   return [];
  // });

  function handleSelectedId(id: string) {
    setSelectedId(id);
  }

  function handleOnAddWatchList(movie: IMovie) {
    if (watchedMovies.some((m) => m.imdbID === movie.imdbID)) {
      return;
    }
    setWatchedMovies((prev) => [...prev, movie]);
    handleSelectedId(" ");
  }

  function handleOnDeleteWatchList(movie: IMovie) {
    setWatchedMovies((prev) => prev.filter((m) => m.imdbID !== movie.imdbID));
    handleSelectedId(" ");
  }

  function handleCloseMovieDetail() {
    handleSelectedId(" ");
  }

  return (
    <>
      <Navbar>
        <Logo></Logo>
        <Search query={query} onSetQuery={setQuery}></Search>
        <NumResults foundCount={foundCount}></NumResults>
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectedMovie={(id) => handleSelectedId(id)}
            ></MovieList>
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId !== " " ? (
            <MovieDetail
              selectedId={selectedId}
              onPrevious={handleCloseMovieDetail}
              onAddWatchList={handleOnAddWatchList}
              watchedMovie={
                watchedMovies.find((m) => m.imdbID === selectedId) || null
              }
            ></MovieDetail>
          ) : (
            <>
              <WatchedSummary watchedMovies={watchedMovies} />
              <WatchedMovieList
                onDeleteWatched={handleOnDeleteWatchList}
                watchedMovies={watchedMovies}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

interface IErrorMessageProps {
  message: string;
}
function ErrorMessage({ message }: IErrorMessageProps) {
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

function Navbar({ children }: INavbarProps) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

interface ISearchProps {
  onSetQuery: (query: string) => void;
  query: string;
}
function Search({ query, onSetQuery }: ISearchProps) {
  function handleSetQuery(query: string): void {
    onSetQuery(query);
  }
  const inputQuery = React.useRef<HTMLInputElement>(null);

  useKey("Enter", function () {
    if (document.activeElement === inputQuery.current) {
      return;
    }
    inputQuery.current!.focus();
    onSetQuery("");
  });

  //move useKey
  // React.useEffect(() => {
  //   inputQuery.current!.focus();
  //   function callback(e: KeyboardEvent) {
  //     if (document.activeElement === inputQuery.current) {
  //       return;
  //     }
  //     if (e.code === "Enter") {
  //       onSetQuery("");
  //       inputQuery.current!.focus();
  //     }
  //   }
  //   document.addEventListener("keydown", callback);

  //   return function () {
  //     document.removeEventListener("keydown", callback);
  //   };
  // }, [onSetQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => handleSetQuery(e.target.value)}
      ref={inputQuery}
    />
  );
}

interface INumResultsProps {
  foundCount: number;
}
function NumResults({ foundCount }: INumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{foundCount}</strong> results
    </p>
  );
}

interface IMovieDetailProps {
  selectedId: string;
  onPrevious: () => void;
  onAddWatchList: (movie: IMovie) => void;
  watchedMovie?: IMovie | null;
}
function MovieDetail({
  selectedId,
  onPrevious,
  onAddWatchList,
  watchedMovie,
}: IMovieDetailProps) {
  const [rate, setRate] = useState<number>(0);
  const [selectedMovie, setSelectedMovie] = useState<IMovieDetailApiResponse>(
    {} as IMovieDetailApiResponse
  );

  const countRef = useRef(0);
  React.useEffect(
    function () {
      if (rate) {
        countRef.current = countRef.current + 1;
        alert(countRef.current);
      }
    },
    [rate]
  );

  function handleAdd() {
    const movie: IMovie = {
      imdbID: selectedMovie.imdbID,
      Title: selectedMovie.Title,
      Year: selectedMovie.Year,
      Poster: selectedMovie.Poster,
      runtime: Number.parseInt(selectedMovie.Runtime),
      imdbRating: Number.parseInt(selectedMovie.imdbRating),
      userRating: rate,
      countRef: countRef,
    };
    onAddWatchList(movie);
  }

  React.useEffect(() => {
    document.title = selectedMovie.Title;

    return function () {
      document.title = "usePopcorn";
      console.log(selectedMovie.Title);
    };
  }, [selectedMovie.Title]);

  useKey("Escape", onPrevious);

  //move useKey
  // React.useEffect(
  //   function () {
  //     function callback(e: KeyboardEvent) {
  //       if (e.code === "Escape") {
  //         onPrevious();
  //         console.log("Closing");
  //       }
  //     }
  //     document.addEventListener("keydown", callback);

  //     return function () {
  //       document.removeEventListener("keydown", callback);
  //     };
  //   },
  //   [onPrevious]
  // );

  React.useEffect(() => {
    async function fetchMovieDetail() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        const apiResponse: IMovieDetailApiResponse = await response.json();
        setSelectedMovie(() => apiResponse);
        //  document.title =selectedMovie.Title;
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
    fetchMovieDetail();
  }, [selectedId]);

  return (
    <div className="details">
      <header>
        <button onClick={() => onPrevious()} className="btn-back">
          &larr;
        </button>
        <img
          src={selectedMovie.Poster}
          alt={`Poster of ${selectedMovie.Title}`}
        ></img>
        <div className="details-overview">
          <h2>{selectedMovie.Title}</h2>
          <p>
            {selectedMovie.Released} &bull; {selectedMovie.Runtime}
          </p>
          <p>{selectedMovie.Genre}</p>
          <p>
            <span>⭐️</span>
            {selectedMovie.imdbRating}
          </p>
        </div>
      </header>
      <section>
        {watchedMovie === null ? (
          <div>
            <StarRating onSetRating={(r) => setRate(r)} />
            {rate > 0 && (
              <button onClick={() => handleAdd()} className="btn-add">
                + Add to list
              </button>
            )}
          </div>
        ) : (
          <div>
            <p>Your Rate : {watchedMovie?.userRating}</p>
          </div>
        )}
        <p>
          <em>{selectedMovie.Plot}</em>
        </p>
        <p>
          <strong>Actors:</strong> {selectedMovie.Actors}
        </p>
        <p>
          <strong>Director:</strong> {selectedMovie.Director}
        </p>
      </section>
    </div>
  );
}

interface IWatchedSummaryProps {
  watchedMovies: IMovie[];
}
function WatchedSummary({ watchedMovies }: IWatchedSummaryProps) {
  const avgImdbRating: number =
    watchedMovies.length > 0
      ? average(watchedMovies.map((movie) => movie.imdbRating || 0))
      : 0;

  const avgUserRating: number =
    watchedMovies.length > 0
      ? average(watchedMovies.map((movie) => movie.userRating || 0))
      : 0;

  const avgRuntime: number =
    watchedMovies.length > 0
      ? average(watchedMovies.map((movie) => movie.runtime || 0))
      : 0;

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

interface IWatchedMovieListProps {
  watchedMovies: IMovie[];
  onDeleteWatched: (movie: IMovie) => void;
}
function WatchedMovieList({
  watchedMovies,
  onDeleteWatched,
}: IWatchedMovieListProps) {
  return (
    <ul className="list">
      {watchedMovies.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
          <button className="btn-delete" onClick={() => onDeleteWatched(movie)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

interface IWatchedListBoxProps {
  children: React.ReactNode;
}
function Box({ children }: IWatchedListBoxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

interface IMovieListProps {
  movies: IMovie[];
  onSelectedMovie: (id: string) => void;
}

function MovieList({ movies, onSelectedMovie }: IMovieListProps) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <li onClick={() => onSelectedMovie(movie.imdbID)} key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

interface IMainProps {
  children: React.ReactNode;
}

function Main({ children }: IMainProps) {
  return <main className="main">{children}</main>;
}

interface INavbarProps {
  children: React.ReactNode;
}

export default App;
