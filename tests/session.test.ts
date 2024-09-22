import request from "supertest";
import { app, serverPromise } from "../app"; // Ensure serverPromise is imported
import mongoose from "mongoose";

let server: any;

// Connect to the database and start the server before all tests
beforeAll(async () => {
  const mongoUri =
    "mongodb+srv://admin:admin1220@cluster0.uu1yaxt.mongodb.net/Paradiso";
  await mongoose.connect(mongoUri);
  server = await serverPromise; // Wait for the server to start
});

// Disconnect from the database and close the server after all tests
afterAll(async () => {
  await mongoose.disconnect();
  server.close(); // Close the server
});

describe("Get Session By ID API", () => {
  it("should successfully retrieve a session by its ID", async () => {
    const sessionId = "66d32d5e92dd416ab23ea0d9"; // Using the provided session ID

    const response = await request(app).get(`/api/sessions/${sessionId}`);

    expect(response.status).toBe(200); // Ensure the request is successful
    expect(response.body).toHaveProperty("session"); // Ensure the response contains the session object
    expect(response.body.session).toMatchObject({
      _id: sessionId,
      movieId: "66d32b5d92dd416ab23e9f84",
      cinemaId: "6692882ff8b31eaa616a3e60",
      available_seats: 30,
      date: "2024-12-06T18:48:36.803Z",
      time: 12,
      price: 25,
    }); // Verify the returned session data matches the expected values
  });

  it("should return 404 if session is not found", async () => {
    const invalidSessionId = "66d32d5e92dd416ab23e0000"; // Invalid session ID

    const response = await request(app).get(
      `/api/sessions/${invalidSessionId}`
    );

    expect(response.status).toBe(404); // If session is not found, return a 404 status code
    expect(response.body).toHaveProperty(
      "message",
      "getSessionById failed, maybe this sessionId does not exist."
    );
  });
});
