const mongoose = require("mongoose");
const supertest = require("supertest");

const Group = require("../models/group");

const app = require("../app");
const api = supertest(app);

describe(("Group API Tests"), () => {
  beforeAll(async () => {
    await Group.deleteMany({});

    const group = new Group({ name: "Test group" });
    await group.save();
  });

  // Test for group creation
  // Test for group editing
  // Test for group deletion
});

afterAll(async () => {
  await mongoose.connection.close();
});