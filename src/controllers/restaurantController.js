const { getUserIdFromToken } = require("../config/jwtProvider");
const restaurantService = require("../services/restaurantService");
const userService = require("../services/userService");
module.exports = {
  createRestaurant: async (req, res) => {
    try {
      const user = req.user;
      await restaurantService.createRestaurant(req.body, user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  deleteRestaurantById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user;

      await restaurantService.deleteRestaurantById(id);
      res
        .status(201)
        .json({ msg: "Successfully deleted the Restaurant", success: true });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ msg: error.message, success: false });
      } else {
        res.status(500).json({ error: "internal error", success: false });
      }
    }
  },
  updateRestaurantStatus: async (req, res) => {
    try {
      const { id } = req.params;
      await restaurantService.updateRestaurantStatus(id);
      res.status(200).json({ msg: "Update Successful" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ msg: error.message, success: false });
      } else {
        res.status(500).json({ error: "internal error", success: false });
      }
    }
  },
  findRestaurantByUserId: async (req, res) => {
    try {
      const user = req.user;

      const restaurant = await restaurantService.getRestaurantByUserId(
        user._id
      );
      res.status(200).json(restaurant);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ msg: error.message, success: false });
      } else {
        res.status(500).json({ error: "internal error", success: false });
      }
    }
  },
  findRestaurantByName: async (req, res) => {
    try {
      const { keyword } = req.query;
      const restaurants = restaurantService.searchRestaurant(keyword);
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getAllRestaurants: async (req, res) => {
    try {
      const restaurants = await restaurantService.getAllRestaurants();
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  findRestaurantById: async (req, res) => {
    try {
      const { id } = req.params;
      const restaurant = await restaurantService.findRestaurantById(id);
      res.status(200).json(restaurant);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ msg: error.message, success: false });
      } else {
        res.status(500).json({ error: "internal error", success: false });
      }
    }
  },
  addToFavorites: async (req, res) => {
    try {
      const { jwt } = req.headers;
      const { id } = req.params;
      //const user = req.user
      const user = await userService.findUserProfileByJwt(jwt);
      const restaurant = await restaurantService.addToFavorite(id, user);
      res.status(200).json(restaurant);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ msg: error.message, success: false });
      } else {
        res.status(500).json({ error: "internal error", success: false });
      }
    }
  },
};
