import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { Link } from "react-router";


const HomePage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <p>
          Welcome to the Movies App!{" "}
          <Link to="/login">Login</Link> or{" "}
          <Link to="/signup">Signup</Link> to save favourites and reviews.
          <Link to="/profile">Profile</Link>see your profile.
        </p>
      </div>

      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
    </>
  );
};

export default HomePage;