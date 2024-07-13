const HttpError = require("../models/http-error");
const Track = require("../models/track");

const getTracks = async (req, res, next) => {
  const tracks = await Track.find().exec();
  res.json(tracks);
};

const createTrack = async (req, res, next) => {
  const newTrack = new Track({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    duration: req.body.duration,
  });
  const result = await newTrack.save();
  res.json(result);
};

exports.getTracks = getTracks;
exports.createTrack = createTrack;
