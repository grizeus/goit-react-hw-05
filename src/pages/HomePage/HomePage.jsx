import { fetchTrendingMovies, fetchActors } from "../../api/fetch-api";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [id, setId] = useState(0);

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

  const idHandler = id => {
    setId(id);
  };

  useEffect(() => {
    const runner = async id => {
      try {
        const { data } = await fetchActors(id);
        console.log(data.cast);
        setActors(data.cast);
      } catch (error) {
        console.log(error);
      }
    };

    if (id !== 0) {
      runner(id);
    }
  }, [id]);

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title}
            <button onClick={() => idHandler(movie.id)}>Fetch Actors</button>
            {actors.length > 0 && id === movie.id && (
              <ul>
                {actors.map(actor => (
                  <li key={actor.id}>{actor.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
