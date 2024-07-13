const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  albums: [{ type: String }],
});

module.exports = mongoose.model("Artist", artistSchema);
