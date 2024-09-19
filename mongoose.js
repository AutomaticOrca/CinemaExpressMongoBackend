const mongoose = require("mongoose");

const Track = require("./models/track");

mongoose
  .connect(
    "mongodb+srv://admin:admin1220@cluster0.uu1yaxt.mongodb.net/MusicDB?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to mongoDB!");
  })
  .catch(() => {
    console.log("Connection failed... :(");
  });

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

const getTracks = async (req, res, next) => {
  const tracks = await Track.find().exec();
  res.json(tracks);
};

exports.createTrack = createTrack;
exports.getTracks = getTracks;
