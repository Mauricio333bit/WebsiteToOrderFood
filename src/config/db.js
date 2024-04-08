const mongoose = require("mongoose");

const mongodbUrl =
  "mongodb+srv://mauricioquirogadev:DUPAxexnFzln3BJ1@cluster0.v2raxrc.mongodb.net/?retryWrites=true&w=majority";

async function connectDB() {
  return mongoose.connect(mongodbUrl);
}

module.exports = connectDB;
