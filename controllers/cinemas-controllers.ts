import { Request, Response, NextFunction } from "express";
import HttpError from "../models/http-error";
import Cinema from "../models/cinema";

export const getAllCinemas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let cinemas;
  try {
    cinemas = await Cinema.find();
  } catch (err) {
    const error = new HttpError("getAllCinemas failed...", 500);
    return next(error);
  }
  res.json({
    cinemas: cinemas.map((cinema) => cinema.toObject({ getters: true })),
  });
};

export const getCinemaById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cinemaId = req.params.cid;

  let cinema;
  try {
    cinema = await Cinema.findById(cinemaId);
  } catch (err) {
    const error = new HttpError("getCinemaById failed", 500);
    return next(error);
  }

  if (!cinema) {
    const error = new HttpError(
      "getCinemaById failed, maybe this cinemaId is not existing.",
      404
    );
    return next(error);
  }
  res.json({ cinema: cinema.toObject({ getters: true }) });
};
