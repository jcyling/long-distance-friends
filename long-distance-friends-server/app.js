require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const config = require("./utils/config");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/usersRouter");
const loginRouter = require("./controllers/loginRouter");
const groupsRouter = require("./controllers/groupsRouter");
const meetingsRouter = require("./controllers/meetingsRouter");
const bookingsRouter = require("./controllers/bookingsRouter");
const friendsRouter = require("./controllers/friendsRouter");
const emailsRouter = require("./controllers/emailsRouter");

// Start express app
const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

const port = 3001;

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to DB", error.message);
  });

// Controllers
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/groups", groupsRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/meetings", meetingsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/email", emailsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });  
}

module.exports = app;