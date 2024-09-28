import { fetchTrendingMovies, fetchActors } from "../../api/fetch-api";
import { useState, useEffect } from "react";

import MovieList from "../../components/MovieList/MovieList";
import Navigation from "../../components/Navigation/Navigation";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchTrendingMovies();
        if (data.results) {
          setMovies(data.results);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
      <Navigation>
        <h1 className={styles.title}>Trending Movies</h1>
      </Navigation>
      <div>
        <MovieList movies={movies} actors={actors} />
      </div>
    </>
  );
};

export default HomePage;
