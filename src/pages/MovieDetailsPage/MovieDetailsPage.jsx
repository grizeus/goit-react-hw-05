import { useEffect, useState } from "react";
import { useParams, useLocation, Outlet, NavLink } from "react-router-dom";
import { fetchMovieDetails } from "../../api/fetch-api";

import Navigation from "../../components/Navigation/Navigation";

import styles from "./MovieDetailsPage.module.css";
import Container from "../../components/Container/Container";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [data, setData] = useState({});
  const location = useLocation();
  const backLinkHref = location.state ?? "/movies";

  console.log(location);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchMovieDetails(movieId);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [movieId]);

  const releaseYear = new Date(data.release_date).getFullYear();
  return (
    <div>
      <Navigation />
      <Container>
        <NavLink className={styles.link} to={backLinkHref}>
          Back
        </NavLink>
        <h1>{`${data.title} (${releaseYear})`}</h1>
        <div className={styles["main-details"]}>
          <div className={styles.thumb}>
            <img
              width="300px"
              src={
                data.poster_path
                  ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
                  : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
              }
              alt={data.original_title}
            />
          </div>
          <div className={styles.stats}>
            <h2>Score</h2>
            <p>{Number(data.vote_average).toFixed(1)}</p>
            <h2>Genres:</h2>
            <p>{data.genres?.map(genre => genre.name).join(", ")}</p>
            <h2>Trivia</h2>
            <p>{data.overview}</p>
            <h2>Country</h2>
            <p>{data.origin_country}</p>
          </div>
        </div>
        <nav>
          <ul className={styles.navs}>
            <li>
              <NavLink
                className={styles.link}
                to={`/movies/${movieId}/cast`}
                state={location.state}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.link}
                to={`/movies/${movieId}/reviews`}
                state={location.state}>
                Reviews
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </Container>
    </div>
  );
};

export default MovieDetailsPage;
