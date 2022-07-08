const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const User = require("../models/user");

const app = require("../app");
const api = supertest(app);

describe(("Login API tests"), () => {
  test("valid login", async () => {
    const user = {
      username: "admin",
      password: "psswrd",
    };

    await api
      .post("/api/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("invalid password", async () => {
    const user = {
      username: "admin",
      password: "lorem ipsum",
    };

    const result = await api
      .post("/api/login")
      .send(user)
      .expect(401);

    expect(result.body.error).toContain("Invalid username or password");

  });

  test("missing password", async () => {
    const user = {
      username: "admin"
    };

    const result = await api
      .post("/api/login")
      .send(user)
      .expect(401);

    expect(result.body.error).toContain("Missing username or password");

  });
});

afterAll(async () => {
  await mongoose.connection.close();
});