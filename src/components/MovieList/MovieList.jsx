const MovieList = (props) => {
    const { movies, actors, id, idHandler } = props;
    console.table(movies);
    return (
      <ul>
        {movies.map(movie => (
            <li key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
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
    );
};

export default MovieList;