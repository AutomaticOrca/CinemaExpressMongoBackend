const HttpError = require("../models/http-error");
const Movie = require("../models/movie");

const getMovieById = async (req, res, next) => {
  const movieId = req.params.mid;

  let movie;
  try {
    movie = await Movie.findById(movieId);
  } catch (err) {
    const error = new HttpError("getMovieById failed", 500);
    return next(error);
  }

  if (!movie) {
    const error = new HttpError(
      "getMovieById failed, maybe this movieId is not existing.",
      404
    );
    return next(error);
  }
  res.json({ movie: movie.toObject({ getters: true }) });
};

exports.getMovieById = getMovieById;
