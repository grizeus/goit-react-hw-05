import { fetchTrendingMovies, fetchActors } from "../../api/fetch-api";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  // const [id, setId] = useState(0);

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

  // const idHandler = id => {
  //   setId(id);
  // };


  useEffect(() => {

    const runner = async id => {
      try {
        const { data } = await fetchActors(id);
        // console.log(data.cast);
        setActors(prev => [...prev, { movieId: id, cast: data.cast }]);
      } catch (error) {
        console.log(error);
      }
    };
    movies.map(movie => runner(movie.id));
  }, [movies]);

  //   if (id !== 0) {
  //     runner(id);
  //   }
  // }, [id]);

  return (
    <div>
      <h1>Movies</h1>
      <MovieList movies={movies} actors={actors} /* idHandler={idHandler} */ />
    </div>
  );
};

export default HomePage;
