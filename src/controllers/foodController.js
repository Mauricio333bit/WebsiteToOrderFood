const foodService = require("../services/foodService");
const restaurantService = require("../services/restaurantService");

module.exports = {
  searchFood: async (req, res) => {
    try {
      const { name } = req.query;
      const menuItems = await foodService.searchFood(name);
      res.status(200).json({ menuItems });
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  getMenuByRestaurantId: async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const { isVegetarian, isSeasonal, nonVeg, food_category } = req.query;

      const menuItems = foodService.getRestaurantsFood(
        restaurantId,
        isVegetarian,
        nonVeg,
        isSeasonal,
        food_category
      );
      //estos parametros los escribi distintos, tengo que ver como lo devuelve mongo
      res.status(200).json({ menuItems });
    } catch (error) {
      if (error instanceof Error) res.status(400).json(error.message);
      else res.status(500).json("Server error");
    }
  },
  createItem: async (req, res) => {
    try {
      const item = req.body;
      const restaurant = await restaurantService.findRestaurantById(
        item.restaurantId
      );
      const menuItem = await foodService.createFood(item, restaurant);
      res.status(200).json({ menuItem });
    } catch (error) {
      if (error instanceof Error) res.status(400).json(error.message);
      else res.status(500).json("Server error");
    }
  },
  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user;
      //no se porque ponen esto me parece que está al pedo
      await foodService.deleteFood(id);
      res.status(200).json("Menu Item deleted");
    } catch (error) {
      if (error instanceof Error) res.status(400).json(error.message);
      else res.status(500).json("Server error");
    }
  },
  updateAvailableStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const menuItem = await foodService.updateAvailableStatus(id);
      res.status(200).json({ menuItem });
    } catch (error) {
      if (error instanceof Error) res.status(400).json(error.message);
      else res.status(500).json("Server error");
    }
  },
};
