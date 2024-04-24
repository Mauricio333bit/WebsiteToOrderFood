const IngredientsItem = require("../models/ingredientsItemModel");
const ingredientsService = require("../services/ingredientsService");

module.exports = {
  createIngredientCategory: async (req, res) => {
    try {
      const { name, restaurantId } = req.body;
      const ingredientCategory = ingredientsService.createIngredientCategory(
        name,
        restaurantId
      );
      res
        .status(201)
        .json({ message: "Created Successfully", data: ingredientCategory });
    } catch (error) {
      res.status(500).json({ error: "Server Error", message: error.message });
    }
  },
  createIngredientItem: async (req, res) => {
    try {
      const { name, ingredientCategoryId, restaurantId } = req.body;
      const createdIngredientItem =
        await ingredientsService.createIngredientsItem(
          name,
          ingredientCategoryId,
          restaurantId
        );
      res.status(200).json(createdIngredientItem);
    } catch (error) {
      res.status(500).json({ error: "Server Error", message: error.message });
    }
  },
  updateStoke: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedIngredientItem = await ingredientsService.updateStoke(id);
      res.status(200).json(updatedIngredientItem);
    } catch (error) {
      res.status(500).json({ error: "Server Error", message: error.message });
    }
  },
  restaurantsIngredient: async (req, res) => {
    try {
      const { id } = req.params;
      const ingredientsItems =
        await ingredientsService.findRestaurantsIngredients(id);
      res.status(200).json(ingredientsItems);
    } catch (error) {
      res.status(500).json({ error: "Server Error", message: error.message });
    }
  },
  restaurantsIngredientCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const ingredientCategories =
        await ingredientsService.findIngredientsCategoryByRestaurantId(id);
      res.status(200).json(ingredientCategories);
    } catch (error) {
      res.status(500).json({ error: "Server Error", message: error.message });
    }
  },
};
