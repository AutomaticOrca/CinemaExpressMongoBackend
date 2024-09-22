import request from "supertest";
import { app, serverPromise } from "../app";
import mongoose from "mongoose";
import {
  generateRandomString,
  generateRandomEmail,
  generateRandomUser,
} from "../util/randomUserGenerator";

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

describe("User Sign Up API", () => {
  it("should successfully sign up a new user", async () => {
    const randomUser = generateRandomUser();

    const response = await request(app).post("/api/users/signup").send({
      name: randomUser.name,
      email: randomUser.email,
      password: randomUser.password,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("token");
  });

  it("should fail to sign up an existing user", async () => {
    const existingUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    };

    await request(app).post("/api/users/signup").send(existingUser);

    const response = await request(app)
      .post("/api/users/signup")
      .send(existingUser);

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty("message");
  });
});
