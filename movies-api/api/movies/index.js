import express from "express";
import asyncHandler from "express-async-handler";
import {
  getMovies,
  getTrendingMovies,
  getNowPlayingMovies,
  getMovie,
  getGenres,
} from "../tmdb-api.js";

const router = express.Router();

router.get("/discover", asyncHandler(async (req, res) => {
  const discoverMovies = await getMovies();
  res.status(200).json(discoverMovies);
}));


router.get("/trending", asyncHandler(async (req, res) => {
  const movies = await getTrendingMovies();
  res.status(200).json(movies);
}));


router.get('/now-playing', asyncHandler(async (req, res) => {
  const movies = await getNowPlayingMovies();
  res.status(200).json(movies);
}));

router.get('/genres', asyncHandler(async (req, res) => {
  const genres = await getGenres();
  res.status(200).json(genres);
}));


router.get("/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await getMovie(id);
  res.status(200).json(movie);
}));




export default router;