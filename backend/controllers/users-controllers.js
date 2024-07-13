const HttpError = require("../models/http-error");
const User = require("../models/user");
const Artist = require("../models/artist");
const Album = require("../models/album");
const Track = require("../models/track");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Aw33_HdEdT0PcQo4owwBJdS92nEhfKrRmA&s",
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  res.json({ message: "Logged in!" });
};

const addLikedArtist = async (req, res, next) => {
  const { userId, artistId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new HttpError("User not found", 404);
      return next(error);
    }

    const artist = await Artist.findById(artistId);
    if (!artist) {
      const error = new HttpError("Artist not found", 404);
      return next(error);
    }

    if (!user.likedArtists.includes(artistId)) {
      user.likedArtists.push(artistId);
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    const err = new HttpError("Adding liked artist failed", 500);
    return next(err);
  }
};

const addLikedAlbum = async (req, res, next) => {
  const { userId, albumId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new HttpError("User not found", 404);
      return next(error);
    }

    const album = await Album.findById(albumId);
    if (!album) {
      const error = new HttpError("Album not found", 404);
      return next(error);
    }

    if (!user.likedAlbums.includes(albumId)) {
      user.likedAlbums.push(albumId);
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    const err = new HttpError("Adding liked album failed", 500);
    return next(err);
  }
};

const addLikedTrack = async (req, res, next) => {
  const { userId, trackId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new HttpError("User not found", 404);
      return next(error);
    }

    const track = await Track.findById(trackId);
    if (!track) {
      const error = new HttpError("Track not found", 404);
      return next(error);
    }

    if (!user.likedTracks.includes(trackId)) {
      user.likedTracks.push(trackId);
      await user.save();
    }

    res
      .status(200)
      .json({ message: "Track added to liked tracks", user: user });
  } catch (error) {
    const err = new HttpError(error.message, 500);
    return next(err);
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.addLikedArtist = addLikedArtist;
exports.addLikedAlbum = addLikedAlbum;
exports.addLikedTrack = addLikedTrack;
