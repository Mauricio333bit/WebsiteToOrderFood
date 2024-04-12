const moongose = require("mongoose");

const CategorySchema = new moongose.Schema({
  name: String,
  restaurant: {
    type: moongose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const Category = moongose.Model("Category", CategorySchema);

module.exports = Category;
