import { useEffect, useState } from "react";
import { fetchActors } from "../../api/fetch-api";
import { useParams } from "react-router-dom";

import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchActors(movieId);
        console.log(data.cast);
        setCast(data.cast);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {cast.map(actor => (
        <li key={actor.id}>
          <div className={styles.thumb}>
            <img
              width="200px"
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : `https://upload.wikimedia.org/wikipedia/commons/0/0d/Anonymous_logo.png`
              }
              alt={actor.name}
            />
          </div>
          <h3>{actor.name}</h3>
          <p>{actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
