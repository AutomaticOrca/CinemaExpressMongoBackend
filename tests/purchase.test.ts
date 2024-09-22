import request from "supertest";
import { app, serverPromise } from "../app";
import mongoose from "mongoose";
import { generateRandomUser } from "../util/randomUserGenerator";

let server: any;
let userId: string;
let token: string;
let sessionId = "66d32d5e92dd416ab23ea0d9"; // Using the provided session ID

// Connect to the database and start the server before all tests
beforeAll(async () => {
  const mongoUri =
    "mongodb+srv://admin:admin1220@cluster0.uu1yaxt.mongodb.net/Paradiso";
  await mongoose.connect(mongoUri);
  server = await serverPromise;

  // Create a user to use in ticket purchase tests
  const randomUser = generateRandomUser();
  const userResponse = await request(app).post("/api/users/signup").send({
    name: randomUser.name,
    email: randomUser.email,
    password: randomUser.password,
  });

  userId = userResponse.body.userId;
  token = userResponse.body.token;
});

// Disconnect the database and close the server after all tests
afterAll(async () => {
  await mongoose.disconnect();
  server.close(); // Close the server
});

describe("Purchase Ticket API", () => {
  it("should successfully purchase tickets", async () => {
    const response = await request(app)
      .post("/api/purchases")
      .set("Authorization", `Bearer ${token}`) // Set the authorization header
      .send({
        sessionId: sessionId,
        userId: userId,
        tickets: [
          { type: "NORMAL", number: 2, price: 25 },
          { type: "DISCOUNTED", number: 1, price: 15 },
        ],
      });

    expect(response.status).toBe(201); // A successful purchase should return a 201 status code
    expect(response.body).toHaveProperty("purchase"); // Ensure the response contains the purchase object
    expect(response.body.purchase).toMatchObject({
      sessionId: sessionId,
      userId: userId,
      tickets: [
        { type: "NORMAL", number: 2, price: 25 },
        { type: "DISCOUNTED", number: 1, price: 15 },
      ],
    });
  });

  it("should fail to purchase tickets with an invalid sessionId", async () => {
    const invalidSessionId = "66d32d5e92dd416ab23e0000"; // Invalid session ID

    const response = await request(app)
      .post("/api/purchases")
      .set("Authorization", `Bearer ${token}`) // Set the authorization header
      .send({
        sessionId: invalidSessionId,
        userId: userId,
        tickets: [{ type: "NORMAL", number: 2, price: 25 }],
      });

    expect(response.status).toBe(404); // A failed request should return a 404 status code
    expect(response.body).toHaveProperty("message", "Session not found");
  });
});
