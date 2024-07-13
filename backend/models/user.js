const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String },
  likedTracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
  likedAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Albums" }],
  likedArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artists" }],
});

module.exports = mongoose.model("User", userSchema);
