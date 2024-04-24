const IngredientCategory = require("../models/ingredientCategoryModel");
const Restaurant = require("../models/restaurantModel");
const IngredientsItem = require("../models/ingredientsItemModel");
const categoryService = require("./categoryService");
module.exports = {
  async createIngredientCategory(name, restaurantId) {
    try {
      const categoryIngredient = new IngredientCategory.findOne({
        name: name,
        restaurant: restaurantId,
      });
      if (categoryIngredient) return categoryIngredient;

      //si la categoria no existe  en el restaurante se crea una nueva

      const restaurant = await Restaurant.findById(restaurantId);
      categoryIngredient = new IngredientCategory({
        name: name,
        restaurant: restaurantId,
      });
      const createdCategory = categoryIngredient.save();
      return createdCategory;
    } catch (error) {
      throw new Error("Failed to create new ingredient category");
    }
  },
  async findIngredientsCategoryById(id) {
    try {
      const ingredientCategory = IngredientCategory.findById(id);
      return ingredientCategory;
    } catch (error) {
      throw new Error(" Ingredient category not found with id: " + id);
    }
  },
  async findIngredientsCategoryByRestaurantId(restaurantId) {
    try {
      const ingredientCategories = await IngredientCategory.find({
        restaurant: restaurantId,
      });
      return ingredientCategories;
    } catch (error) {
      throw new Error(
        "Ingredient  categories of this restaurant could not be listed. Id :" +
          restaurantId
      );
    }
  },
  async findRestaurantsIngredients(restaurantId) {
    try {
      const ingredientsItem = await IngredientsItem.find({
        restaurant: restaurantId,
      }).populate("category");
      return ingredientsItem;
    } catch (error) {
      throw new Error(
        "Failed to find ingredients for restaurant whit id: " + restaurantId
      );
    }
  },
  async createIngredientsItem(
    ingredientName,
    ingredientCategoryId,
    restaurantId
  ) {
    try {
      const ingredientCategory = await this.findIngredientsCategoryById(
        ingredientCategoryId
      );
      if (!ingredientCategory) {
        throw new Error("Ingredient Category not found");
      }
      //verificamos si el item ya está presente y se retorna
      let ingredientItem = await IngredientsItem.findOne({
        name: ingredientName,
        category: ingredientCategory._id,
        restaurant: restaurantId,
      });
      if (ingredientItem) return ingredientItem;
      //sino encuentra se crea uno nuevo
      ingredientItem = new IngredientsItem({
        name: ingredientName,
        category: ingredientCategory._id,
        restaurant: restaurantId,
      });
      const savedItem = await ingredientItem.save();
      return savedItem;
    } catch (error) {
      throw new Error("Failed to create ingredients item");
    }
  },
  async updateStoke(id) {
    try {
      const ingredientItem = await IngredientsItem.findById(id);

      ingredientItem.inStoke = !ingredientItem.inStoke;
      await ingredientItem.save();
      return ingredientItem;
    } catch (error) {
      throw new Error(
        "Failed to update stoke for ingredient item with id: " + id
      );
    }
  },
};
