const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  img: String,
  startedAt: String,
  endsAt: String,
  name: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  location: String,
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
