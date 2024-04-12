const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  foodCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  images: [String],
  avaliable: Boolean,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  isVegetarian: Boolean,
  isSeasonal: Boolean,
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
  creationDate: {
    type: Date,
    default: Date.now(),
  },
});

const Food = mongoose.Model("Food", foodSchema);
module.exports = Food;
