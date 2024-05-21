import React, { useState } from "react";
import StarRating from "./components/StarRating";

//#region  API RESPONSE
interface ISearchMovieApiResponse {
  Response: boolean;
  Search: Array<IMovie>;
  totalResults: string;
}
interface IMovieDetailApiResponse {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  Dvd: string;
  Director: string;
  Genre: string[]; // Array of genres (Crime, Drama, Thriller)
  Language: string[]; // Array of languages (English, German)
  Metascore: string;
  Plot: string;
  Poster: string; // URL of the poster image
  Rated: string;
  Ratings: IMovieDetailApiResponse_IRating[]; // Array of Rating objects
  Released: string;
  Runtime: string;
  Title: string;
  Type: string;
  Writer: string;
  Year: string;
  ImdbID: string;
  imdbRating: string;
  ImdbVotes: string;
}
interface IMovieDetailApiResponse_IRating {
  Source: string;
  Value: string;
}
//#endregion

interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime?: number;
  imdbRating?: number;
  userRating?: number;
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
  const [query, setQuery] = useState<string>("joker");
  const [foundCount, setFoundCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovie[]>(tempMovieData);
  const [watchedMovies, setWatchedMovies] = useState<IMovie[]>(tempWatchedData);
  const [error, setError] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>(" ");
  React.useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(() => true);
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        const apiResponse: ISearchMovieApiResponse = await response.json();
        console.log(apiResponse);
        setMovies(() => apiResponse.Search);
        setFoundCount(() => apiResponse.Search?.length);
        setIsLoading(() => false);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setError(error.message);
        } else {
          setError((e) => (e = "An unexpected error occurred"));
        }
      } finally {
        setIsLoading(() => false);
      }
    }
    fetchMovies();
  }, [query]);

  function handleSelectedId(id: string) {
    console.log(id);
    setSelectedId(id);
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
              onPrevious={() => handleSelectedId(" ")}
            ></MovieDetail>
          ) : (
            <>
              <WatchedSummary watchedMovies={watchedMovies} />
              <WatchedMovieList watchedMovies={watchedMovies} />
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
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => handleSetQuery(e.target.value)}
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
}

function MovieDetail({ selectedId, onPrevious }: IMovieDetailProps) {
  const [rate, setRate] = useState<number>();
  const [selectedMovie, setSelectedMovie] = useState<IMovieDetailApiResponse>(
    {} as IMovieDetailApiResponse
  );

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
        console.log(apiResponse);
        setSelectedMovie(() => apiResponse);
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
        <button onClick={() => onPrevious()} className="btn-back">&larr;</button>
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
        <StarRating onSetRating={(r) => setRate(r)}></StarRating>
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
  const avgImdbRating: number = average(
    watchedMovies.map((movie) => movie.imdbRating || 0)
  );
  const avgUserRating: number = average(
    watchedMovies.map((movie) => movie.userRating || 0)
  );
  const avgRuntime: number = average(
    watchedMovies.map((movie) => movie.runtime || 0)
  );
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
}
function WatchedMovieList({ watchedMovies }: IWatchedMovieListProps) {
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
