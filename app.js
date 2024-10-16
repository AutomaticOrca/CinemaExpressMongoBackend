const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const HttpError = require("./models/http-error");

const usersRoutes = require("./routes/users-routes");
const moviesRoutes = require("./routes/movies-routes");
const sessionsRoutes = require("./routes/sessions-routes");
const cinemasRoutes = require("./routes/cinemas-routes");
const purchasesRoutes = require("./routes/purchases-routes");

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use("/api/users", usersRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/cinemas", cinemasRoutes);
app.use("/api/purchases", purchasesRoutes);

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
    "mongodb+srv://admin:admin1220@cluster0.uu1yaxt.mongodb.net/Paradiso"
  )
  .then(() => {
    console.log("connect to mongo");
    app.listen(5005, "0.0.0.0", () => {
      console.log("listen to 5005");
    });
  })
  .catch((error) => {
    console.log(error);
  });
