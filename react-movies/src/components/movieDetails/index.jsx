import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import LanguageIcon from '@mui/icons-material/Language';


import { useQuery } from "@tanstack/react-query";
import { getReviewsForMovie } from "../../api/tmdb-api";




const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
  data: reviews = [],
  isPending: reviewsLoading,
  isError: reviewsIsError,
  error: reviewsError,
} = useQuery({
  queryKey: ["movieReviews", movie.id],
  queryFn: () => getReviewsForMovie(movie.id),
  enabled: !!movie?.id, // prevents running before movie is loaded
});

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper
        component="ul"
        sx={{ ...root }}
      >
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

<Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label=" Production Countries" sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

  
<Paper component="ul" sx={{ ...root }}>
  <li>
    <Chip
      icon={<LanguageIcon />}
      label="Original Language"
      sx={{ ...chip }}
      color="primary"
    />
  </li>
  <li>
    <Chip label={movie.original_language.toUpperCase()} sx={{ ...chip }} />
  </li>
</Paper>

       

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
       <div style={{ padding: "1rem" }}>
  <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
    Reviews for {movie.title}
  </Typography>

  {reviewsLoading && <Typography>Loading reviews...</Typography>}

  {reviewsIsError && (
    <Typography color="error">
      {reviewsError?.message || "Error loading reviews"}
    </Typography>
  )}

  {!reviewsLoading && !reviewsIsError && reviews.length === 0 && (
    <Typography>No reviews yet.</Typography>
  )}

  {reviews.map((r) => (
    <Paper key={r._id} sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1">
        <strong>{r.userName}</strong> — ⭐ {r.rating}/10
      </Typography>
      <Typography variant="body1">{r.review}</Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(r.createdAt).toLocaleString()}
      </Typography>
    </Paper>
  ))}
</div>
      </Drawer>

    </>
  );
};
export default MovieDetails;
