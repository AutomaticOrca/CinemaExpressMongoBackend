const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const artistsRoutes = require("./routes/artists-routes");
const tracksRoutes = require("./routes/tracks-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();
app.use(bodyParser.json());

app.use("/api/tracks", tracksRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://admin:admin1220@cluster0.uu1yaxt.mongodb.net/MusicDB?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5005);
  })
  .catch((error) => {
    console.log(error);
  });
