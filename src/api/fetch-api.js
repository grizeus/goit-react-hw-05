import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const API_KEY = "992758a4802a699e8df27d4d6efc34fb";

const buildUrl = (endpoint, params = {}) => {
  const url = new URL(endpoint, axios.defaults.baseURL);
  url.searchParams.append("api_key", API_KEY);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }

  return url.toString();
};

export const fetchTrendingMovies = async () => {
  return axios.get(buildUrl("trending/movie/day"));
};

export const fetchSearchByKeyword = async keyword => {
  return axios.get(
    buildUrl("search/movie", {
      language: "en-US",
      page: "1",
      include_adult: "false",
      query: keyword,
    })
  );
};

export const fetchMovieDetails = async id => {
  return axios.get(buildUrl(`movie/${id}`, { language: "en-US" }));
};

export const fetchActors = async id => {
  return axios.get(buildUrl(`movie/${id}/credits`, { language: "en-US" }));
};

export const fetchReviews = async id => {
  return axios.get(buildUrl(`movie/${id}/reviews`, { language: "en-US" }));
};