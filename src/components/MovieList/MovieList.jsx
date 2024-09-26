import styles from "./MovieList.module.css";

const MovieList = props => {
  const { movies, actors, id, idHandler, resetter } = props;

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id}>
          <div
            className={styles.thumbnail}
            onMouseEnter={() => idHandler(movie.id)}
            onMouseLeave={resetter}>
            <img
              className={styles.image}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          {actors.length > 0 && id === movie.id && (
            <div style={{ position: "relative" }}>
              <ul className={styles["top-cast"]}>
                {actors.slice(0, 5).map(actor => (
                    <li className={styles.actor} key={actor.id}>
                        <span>{actor.name}</span>
                        <span>{actor.character}</span>
                    </li>
                ))}
              </ul>
            </div>
          )}
          <h3>{movie.title}</h3>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
