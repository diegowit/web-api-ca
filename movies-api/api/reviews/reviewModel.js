import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ReviewSchema = new Schema(
  {
    movieId: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    userName: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);