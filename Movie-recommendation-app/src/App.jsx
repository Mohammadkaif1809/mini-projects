import React, { useEffect, useState } from "react";
import heroBg from "./assets/hero.png";
import Search from "./components/Search";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      setErrorMsg("Error fetching movies");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTrendingLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearchTerm(searchTerm);
      if (searchTerm.trim() !== "") setIsSearching(true);
      else setIsSearching(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debounceSearchTerm.trim() !== "") fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    if (!isTrendingLoading) fetchMovies();
  }, [isTrendingLoading]);

  return (
    <main>
      <div className="pattern" />

      <div className={`wrapper ${isSearching ? "search-mode" : ""}`}>
        <header>
          <img src={heroBg} alt="hero" />
          <h1> Search. Explore. Experience <span className="text-gradient">Cinema</span>
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {!isSearching && (
          <section className="trending">
            <h2>Trending Movies</h2>
            {isTrendingLoading ? (
              <Spinner />
            ) : (
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt="trending" />
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;