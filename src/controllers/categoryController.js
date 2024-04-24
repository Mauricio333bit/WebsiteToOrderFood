const Category = require("../models/categoryModel");
const categoryService = require("../services/categoryService");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const category = req.body;
      const user = req.user;
      const createdCategory = await categoryService.createCategory(
        category.name,
        user._id
      );
      res.status(200).json(createdCategory);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getRestaurantCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const restaurantCategories =
        await categoryService.findCategoryByRestaurantId(id);
      res.status(200).json(restaurantCategories);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
