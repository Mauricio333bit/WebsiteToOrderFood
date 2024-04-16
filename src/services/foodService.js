const Food = require("../models/foodModel");

module.exports = {
  async createFood(req, restaurant) {
    try {
      const food = new Food({
        name: req.name,
        description: req.description,
        price: req.price,
        foodCategory: req.foodCategory,
        images: req.images,
        restaurant: restaurant._id,
        isVegetarian: req.isVegetarian,
        isSeasonal: req.isSeasonal,
        ingredients: req.ingredients,
        creationDate: new Date(),
      });
      await food.save();
      restaurant.foods.push(food._id);
      await restaurant.save();
      return food;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async deleteFood(foodId) {
    try {
      const food = await Food.findById(foodId);
      if (!food) throw new Error("Food not found with ID  " + foodId);
      await Food.findByIdAndDelete(foodId);
    } catch (error) {
      throw new Error("Failed to delete food with ID " + foodId);
    }
  },
  async getRestaurantsFood(
    restaurantId,
    isVegetarian,
    nonVeg,
    isSeasonal,
    foodCategory
  ) {
    try {
      let query = { restaurant: restaurantId };
      if (isVegetarian == true) {
        query.isVegetarian = true;
      }
      if (nonVeg == true) {
        query.isVegetarian = false;
      }
      if (isSeasonal == true) query.isSeasonal = true;
      if (foodCategory) query.foodCategory = foodCategory;
      const foods = await Food.find(query).populate([
        { path: "ingredients", populate: { path: "category", select: "name" } },
        "foodCategory",
        { path: "restaurant", select: "name _id" },
      ]);
      // hago   una consulta mediante find y la query. de la cual solo tomo info importante con los populate, en el path es la "tabla" y en el selec los campos especificos de esa tabla, sino especifico trae todo
      return foods;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async searchFood(keyword) {
    try {
      let query = {};
      if (keyword) {
        query.$or = [
          { name: { $regex: keyword, $options: "i" } },
          { "foodCategory.name": { $regex: keyword, $options: "i" } },
        ];
      }
      const foods = await Food.find(query);
      return foods;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async updateAvailableStatus(foodId) {
    try {
      const food = await Food.findById(foodId).populate([
        { path: "ingredients", populate: { path: "category", select: "name" } },
        "foodCategory",
        { path: "restaurant", select: "name _id" },
      ]);
      if (!food) throw new Error("No such food exists!");

      food.available = !food.available;
      await food.save();
      return food;
    } catch (error) {
      throw new Error("Failed to find food: " + error.message);
    }
  },
};
