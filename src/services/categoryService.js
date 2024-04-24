const Category = require("../models/categoryModel");
const Restaurant = require("../models/restaurantModel");

module.exports = {
  async createCategory(name, userId) {
    try {
      //encontrar el restaurante  del usuario
      const restaurant = await Restaurant.findOne({ owner: userId });
      if (!restaurant)
        throw new Error("Restaurant not found for user id: " + userId);
      //crear y guardar la nueva categoria
      const createdCategory = new Category({
        name,
        restaurant: restaurant._id,
      });
      createdCategory.save();
      return createdCategory;
    } catch (error) {
      throw new Error("Error creating category" + error);
    }
  },
  async findCategoryByRestaurantId(restaurantId) {
    try {
      const categories = await Category.find({ restaurant: restaurantId });
      return categories;
    } catch (error) {
      throw new Error(
        "Error to find categories for restaurant id: " + restaurantId + error
      );
    }
  },
  async findCategoryById(categoryId) {
    try {
      const category = Category.findById(categoryId);
      if (!restaurant)
        throw new Error("Category not found for id: " + categoryId);
      return category;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
