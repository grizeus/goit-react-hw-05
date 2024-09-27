import { useEffect, useState } from "react";
import { useParams, Outlet, NavLink } from "react-router-dom";
import { fetchMovieDetails } from "../../api/fetch-api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchMovieDetails(movieId);
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [movieId]);

  const releaseYear = new Date(data.release_date).getFullYear();
  return (
    <div>
      <h1>{`${data.title} (${releaseYear})`}</h1>
      <img
        width="300px"
        src={
          data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
        }
        alt={data.original_title}
      />
      <h2>Score</h2>
      <p>{Number(data.vote_average).toFixed(1)}</p>
      <h2>Genres:</h2>
      <p>{data.genres?.map(genre => genre.name).join(", ")}</p>

      <h2>Trivia</h2>
      <p>{data.overview}</p>
      <nav>
        <ul>
          <li>
            <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
