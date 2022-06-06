import axios from "axios";
import supertest from "supertest";
const baseUrl = "http://localhost:3001/api/users";

test("Get list of users", async () => {
    const res = await axios.get(`${baseUrl}`);
    expect
});

// Log in user
test("Logs in user", async () => {

});

// Does not log in user without username/password

// Registers user

// Does not register user without username/password/name

// Update user if same user is logged in

// Does not update if same user is logged in