const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const User = require("../models/user");

const app = require("../app");
const api = supertest(app);

describe(("User api tests"), () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("psswrd", 10);
    const user = new User({ username: "admin", name: "admin", passwordHash });

    await user.save();
  });

  test("get list of users", async () => {
    await api.get("/api/users")
      .expect(200)
      .expect("Content-type", /application\/json/);
  });

  // Does not register user without username/password/name with length > 3
  test("verify new user needs username and password length > 3", async () => {
    const newUser = {
      username: "j",
      name: "jane ling",
      password: "ab",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username and password must be more than 3 chars long");
  });
});

afterAll(done => {
  mongoose.connection.close();
  done();
});
