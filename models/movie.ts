import { Schema, model, Document } from "mongoose";

interface IMovie extends Document {
  plot: string;
  genres: string[];
  runtime: number;
  cast: string[];
  poster: string;
  title: string;
  countries: string[];
  released: Date;
  directors: string[];
  awards: string;
  year: number;
  rateTomato: number;
  rateImdb: number;
  rateMetacritic: number;
}

const movieSchema = new Schema<IMovie>(
  {
    plot: {
      type: String,
      required: true,
      trim: true,
    },
    genres: {
      type: [String],
      required: true,
    },
    runtime: {
      type: Number,
      required: true,
    },
    cast: {
      type: [String],
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    countries: {
      type: [String],
      required: true,
    },
    released: {
      type: Date,
      required: true,
    },
    directors: {
      type: [String],
      required: true,
    },
    awards: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    rateTomato: {
      type: Number,
      required: true,
    },
    rateImdb: {
      type: Number,
      required: true,
    },
    rateMetacritic: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = model<IMovie>("Movie", movieSchema);

export default Movie;
