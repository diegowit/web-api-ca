import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import TrendingMoviePage from "./pages/trendingMoviePage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviePage";

import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";

import SiteHeader from "./components/siteHeader";
import MoviesContextProvider from "./contexts/moviesContext";

import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesContextProvider>
          <AuthContextProvider>
            <SiteHeader />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies/trending" element={<TrendingMoviePage />} />
              <Route
                path="/movies/now-playing"
                element={<NowPlayingMoviesPage />}
              />

              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/movies/favorites"
                  element={<FavoriteMoviesPage />}
                />
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AuthContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);