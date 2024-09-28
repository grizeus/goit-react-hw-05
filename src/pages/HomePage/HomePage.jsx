import { fetchTrendingMovies, fetchActors } from "../../api/fetch-api";
import { useState, useEffect, lazy, Suspense } from "react";

import Navigation from "../../components/Navigation/Navigation";
import Container from "../../components/Container/Container";
const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

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
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          <MovieList movies={movies} actors={actors} />
        </Container>
      </Suspense>
    </>
  );
};

export default HomePage;
