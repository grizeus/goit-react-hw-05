import { Outlet } from "react-router-dom";

const MovieDetailsPage = () => {
  return (
    <div>
      <div>Movie Details Page</div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
