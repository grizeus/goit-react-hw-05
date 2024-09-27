import { useEffect, useState } from "react";
import { fetchReviews } from "../../api/fetch-api";
import { useParams } from "react-router-dom";

import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [results, setResults] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchReviews(movieId);
        setResults(data.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [movieId]);
  return (
    <ul>
      {results.length > 0 ? (
        results.map(review => (
          <li className={styles.review} key={review.id}>
            <h3 className={styles["review-title"]}>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))
      ) : (
        <li>No reviews yet</li>
      )}
    </ul>
  );
};

export default MovieReviews;
