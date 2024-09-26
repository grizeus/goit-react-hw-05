import styles from "./MovieList.module.css";

const MovieList = props => {
  const { movies, actors /* , idHandler */ } = props;
  
  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id}>
          <div className={styles.thumbnail}>
            <img
              className={styles.image}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              />
          </div>
          {actors.length > 0 && (
            <div style={{ position: "relative" }}>
              <ul className={styles["top-cast"]}>
                {console.log(actors.filter(actor => actor.movieId === movie.id)[0])}
                
                {/* {actors
                  .filter(actor => actor.movieId === movie.id)
                  .map(cast => (
                    <li className={styles.actor} key={cast.id}>
                      <span className={styles["actor-name"]}>
                        {cast.name}
                      </span>
                      <span>{cast.character}</span>
                    </li>
                  ))} */}
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
