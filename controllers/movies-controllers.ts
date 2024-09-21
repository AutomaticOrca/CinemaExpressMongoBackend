import { Request, Response, NextFunction } from "express";
import HttpError from "../models/http-error";
import Movie from "../models/movie";

export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      "getMovieById failed, maybe this movieId does not exist.",
      404
    );
    return next(error);
  }

  res.json({ movie: movie.toObject({ getters: true }) });
};
