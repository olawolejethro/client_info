/** @format */

const express = require("express");
const Route = require("./router");
const helmet = require("helmet");

const app = express();
app.use(helmet());
app.use(express.json());

app.use("/api", Route);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
