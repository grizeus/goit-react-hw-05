import { NavLink, useLocation } from "react-router-dom";

import styles from "./MovieList.module.css";

const MovieList = props => {
  const { movies, actors } = props;
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <NavLink key={movie.id} to={`/movies/${movie.id}`} state={location}>
          <li key={movie.id}>
            <div className={styles.thumbnail}>
              <img
                width="300px"
                className={styles.image}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                    : `https://upload.wikimedia.org/wikipedia/commons/0/04/NoDVDCover.svg`
                }
                alt={movie.title}
              />
            </div>
            {actors.length > 0 && (
              <div className={styles["list-container"]}>
                <ul className={styles["top-cast"]}>
                  {actors
                    .filter(actor => actor.movieId === movie.id)[0]
                    ?.cast.slice(0, 5)
                    .map(cast => (
                      <li className={styles.actor} key={cast.id}>
                        <span className={styles["actor-name"]}>
                          {cast.name}
                        </span>
                        <span>{cast.character}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
            <h3>{movie.title}</h3>
          </li>
        </NavLink>
      ))}
    </ul>
  );
};

export default MovieList;
