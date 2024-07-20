const HttpError = require("../models/http-error");
const Cinema = require("../models/cinema");

const getAllCinemas = async (req, res, next) => {
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

const getCinemaById = async (req, res, next) => {
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

exports.getAllCinemas = getAllCinemas;
exports.getCinemaById = getCinemaById;
