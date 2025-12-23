import express from "express";
import asyncHandler from "express-async-handler";
import Review from "./reviewModel.js";

const router = express.Router(); // eslint-disable-line



// GET all reviews for the loggedin user this is private)
router.get(
  "/me",
  asyncHandler(async (req, res) => {
    const reviews = await Review.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(reviews);
  })
);


export default router;


// GET all reviews for a given movie (and this is public)
router.get("/movie/:movieId", async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
});



// POST a review (logged-in user)
router.post(
  "/",
  asyncHandler(async (req, res) => {
    // req.user must exist (from authenticate middleware)
    const { movieId, rating, review } = req.body;

    const newReview = await Review.create({
      movieId,
      rating,
      review,
      userId: req.user._id,
      userName: req.user.username,
    });

    res.status(201).json(newReview);
  })
);


/* delete Task
router.delete('/:id', async (req, res) => {
    const result = await Task.deleteOne({
        _id: req.params.id,
    });
    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Task' });
    }
}); */