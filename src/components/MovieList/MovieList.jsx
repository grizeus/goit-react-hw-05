import styles from "./MovieList.module.css";

const MovieList = props => {
    const { movies, actors, id, idHandler, resetter } = props;
    
    

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id} onMouseEnter={() => idHandler(movie.id)} onMouseLeave={resetter}>
          <div className={styles.thumbnail}>
            <img className={styles.image}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <h3>{movie.title}</h3>
          {actors.length > 0 && id === movie.id && (
            <ul>
              {actors.slice(0,5).map((actor) => (
                <li key={actor.id}>{actor.name}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
