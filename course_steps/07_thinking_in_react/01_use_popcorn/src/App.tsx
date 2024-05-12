import React, { useState } from "react";

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

const average = (arr: number[]): number =>
  arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

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

function Search() {
  const [query, setQuery] = useState<string>("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
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
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        children
      )}
    </div>
  );
}

interface IMovieListProps {
  movies: IMovie[];
}

function MovieList({ movies }: IMovieListProps) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <li key={movie.imdbID}>
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

function App() {
  const [movies, setMovies] = useState<IMovie[]>(tempMovieData);
  const [watchedMovies, setWatchedMovies] = useState<IMovie[]>(tempWatchedData);

  return (
    <>
      <Navbar>
      
        <Logo></Logo>
        <Search></Search>
        <NumResults></NumResults>
      
      </Navbar>

      <Main>
      
        <Box>
          <MovieList movies={movies}></MovieList>
        </Box>

        <Box>
          <WatchedSummary watchedMovies={watchedMovies}></WatchedSummary>
          <WatchedMovieList watchedMovies={watchedMovies}></WatchedMovieList>
        </Box>
      
      </Main>
    </>
  );
}

export default App;
