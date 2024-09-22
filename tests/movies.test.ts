import request from "supertest";
import { app, serverPromise } from "../app";
import mongoose from "mongoose";

let server: any;

beforeAll(async () => {
  const mongoUri =
    "mongodb+srv://admin:admin1220@cluster0.uu1yaxt.mongodb.net/Paradiso";
  await mongoose.connect(mongoUri);
  server = await serverPromise;
});

afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});

describe("Get Movie By ID API", () => {
  it("should successfully retrieve a movie by its ID", async () => {
    const movieId = "66d32b5d92dd416ab23e9f8f";

    const response = await request(app).get(`/api/movies/${movieId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("movie");
    expect(response.body.movie).toMatchObject({
      _id: movieId,
      plot: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
      genres: ["Comedy", "Drama", "Music"],
      runtime: 128,
      cast: ["Ryan Gosling", "Emma Stone", "Rosemarie DeWitt"],
      poster:
        "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX300.jpg",
      title: "La La Land",
      countries: ["United States", "Hong Kong"],
      released: "2016-12-24T13:00:00.000Z",
      directors: ["Damien Chazelle"],
      awards: "Won 6 Oscars. 241 wins & 307 nominations total",
      year: 2016,
      rateTomato: 91,
      rateImdb: 8,
      rateMetacritic: 94,
    });
  });

  it("should return 404 if movie is not found", async () => {
    const invalidMovieId = "66d32b5d92dd416ab23e0000";

    const response = await request(app).get(`/api/movies/${invalidMovieId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "getMovieById failed, maybe this movieId does not exist."
    );
  });
});
