const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const homeRoute = require("./routes/homeRoute");
app.use("/", homeRoute);

app.use(cors());
app.use(bodyParser.json());

const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);

module.exports = { app };
