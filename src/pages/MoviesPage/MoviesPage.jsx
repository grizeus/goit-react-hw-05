import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchSearchByKeyword, fetchActors } from "../../api/fetch-api";

import Navigation from "../../components/Navigation/Navigation";
import MovieList from "../../components/MovieList/MovieList";

import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [_, setSearchParams] = useSearchParams();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const curQuery = form.elements.query.value.trim();

    if (curQuery === "") {
      toast.error("Please enter a search query");
      return;
    }

    setQuery(curQuery);
    setSearchParams({ name: curQuery });
    form.reset();
  };

  useEffect(() => {
    const runner = async () => {
      try {
        const { data } = await fetchSearchByKeyword(query);
        if (data.results) {
          setMovies(data.results);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (query !== "") {
      runner();
    }
  }, [query]);

  useEffect(() => {
    const runner = async id => {
      try {
        const { data } = await fetchActors(id);
        setActors(prev => [...prev, { movieId: id, cast: data.cast }]);
      } catch (error) {
        console.log(error);
      }
    };
    movies.map(movie => runner(movie.id));
  }, [movies]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
      <Navigation>
        <form onSubmit={handleSubmit} className={styles["search-form"]}>
          <input
            className={styles["search-input"]}
            type="text"
            autoComplete="off"
            name="query"
            autoFocus
            placeholder="Search movies..."
          />
          <button type="submit">Search</button>
        </form>
      </Navigation>
      <MovieList movies={movies} actors={actors} />
    </>
  );
};

export default MoviesPage;
