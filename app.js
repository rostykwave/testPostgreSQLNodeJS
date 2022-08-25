const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { authRouter } = require("./src/routes/authRouter");
const { usersRouter } = require("./src/routes/usersRouter");
const { errorHandler } = require("./src/helpers/apiHelpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.use("/api", authRouter);
app.use("/api", usersRouter);

app.use(errorHandler);

module.exports = app;
