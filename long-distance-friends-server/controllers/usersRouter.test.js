const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const User = require("../models/user");

const app = require("../app");
const api = supertest(app);


describe("User API tests", () => {

  let userId;

  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("psswrd", 10);
    const user = new User({ username: "admin", name: "admin", passwordHash, "city": "London", timezone: "London", email: "email@email.com" });

    const userSaved = await user.save();
    userId = userSaved._id.toString();

  }, 30000);

  describe("Get user info", () => {

    beforeAll(async () => {

    });

    test("get list of users", async () => {
      const res = await api.get("/api/users");
      expect(res.status).toEqual(200);

      // Check for existing user
      expect(res.body.length).toBe(1);

    });

    test("get a single user's info by ID", async () => {
      const res = await api.get(`/api/users/${userId}`);
      expect(res.status).toEqual(200);
    });

  });

  describe(("Make new users"), () => {
    test("verify new user needs username and password length > 3", async () => {
      const newUser = {
        username: "j",
        name: "jane ling",
        password: "ab",
        city: "London",
        email: "email@email.com"
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(401)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("Username and password must be more than 3 chars long");
    });

    test("create a new user with valid credentials", async () => {
      const newUser = {
        username: "jane",
        name: "jane ling",
        password: "abcdef",
        email: "email@email.com",
        city: "London"
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201);
    });
  });

  describe("Edit user info", () => {
    beforeAll(async() => {
      // Get login token
    });

    test("edit user city when user is logged in", async () => {

      let newUserInfo = { city: "Tokyo" };

      const result = await api
        .patch(`/api/users/${userId}`)
        .send(newUserInfo)
        .expect(200);
      
      expect(result.body.city).toBe("Tokyo");
    });

    test("returns error for non-existing user", async () => {
      await api
        .patch("/api/users/notAnId")
        .expect(400);
    });
  });


  describe("Delete user", () => {
    test("delete exiting user", async () => {
      await api
        .delete(`/api/users/${userId}`)
        .expect(204);
    });

    test("returns error for non-existing user", async () => {
      await api
        .delete("/api/users/notAnId")
        .expect(400);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
