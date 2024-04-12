const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  description: String,
  cuisineType: String,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  contactInformation: {},
  openingHours: String,
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  numRating: Number,
  images: [String],
  resgistrationDate: {
    type: Date,
    default: Date.now(),
  },
  open: Boolean,
  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema); //se indica el nombre de la tabla y el esquema a usar

module.exports = Restaurant;
