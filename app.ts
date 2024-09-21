import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import HttpError from "./models/http-error";
import usersRoutes from "./routes/users-routes";
import moviesRoutes from "./routes/movies-routes";
import sessionsRoutes from "./routes/sessions-routes";
import cinemasRoutes from "./routes/cinemas-routes";
import purchasesRoutes from "./routes/purchases-routes";

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/users", usersRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/cinemas", cinemasRoutes);
app.use("/api/purchases", purchasesRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
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
    console.log("Connected to MongoDB");
    app.listen(5005, "0.0.0.0", () => {
      console.log("Listening on port 5005");
    });
  })
  .catch((error) => {
    console.error(error);
  });
