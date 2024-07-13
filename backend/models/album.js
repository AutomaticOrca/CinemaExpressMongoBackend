const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const albumSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    releaseYear: {
      type: Number,
      validate: {
        validator: function (v) {
          return v >= 1900 && v <= new Date().getFullYear();
        },
        message: (props) => `${props.value} is not a valid release year!`,
      },
    },
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", albumSchema);
