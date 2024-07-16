const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
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

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
