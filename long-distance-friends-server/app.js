require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const usersRouter = require("./controllers/usersRouter");
const loginRouter = require("./controllers/loginRouter");
const groupsRouter = require("./controllers/groupsRouter");

// Start express app
const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

const port = 3001;
mongoose.connect(process.env.MONGODB_URI);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/groups", groupsRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;