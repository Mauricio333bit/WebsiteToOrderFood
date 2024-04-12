const { getUserIdFromToken } = require("../config/jwtProvider");
const Address = require("../models/addressModel");
const Restaurant = require("../models/restaurantModel");
const Restaurant = require("../models/restaurantModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  async createRestaurant(req, user) {
    try {
      const address = new Address({
        city: req.address.city,
        country: req.address.country,
        fullName: req.address.fullName,
        postalCode: req.address.postalCode,
        state: req.address.state,
        streetAddress: req.address.streetAddress,
      });
      const saveAddress = await address.save();
      const restaurant = new Restaurant({
        address: saveAddress,
        contactInformation: req.contactInformation,
        cuisineType: req.cuisineType,
        description: req.description,
        images: req.images,
        name: req.name,
        openingHours: req.openingHours,
        resgistrationDate: req.resgistrationDate,
        owner: req.user,
      });
      const saveRestaurant = await restaurant.save();

      return saveRestaurant;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getAllRestaurants() {
    try {
      const restaurants = await Restaurant.find();
      return restaurants;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async findRestaurantById(restaurantId) {
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }
      return restaurant;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async deleteRestaurantById(restaurantId) {
    try {
      this.findRestaurantById(restaurantId);
      const restaurant = await Restaurant.deleteRestaurantById(restaurantId);
      return "Deleted Successfully!";
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getRestaurantByUserId(userId) {
    try {
      const restaurant = await Restaurant.findOne({ owner: userId })
        .populate("owner")
        .populate("address");
      if (!restaurant) {
        throw new Error("No restaurant associated with the user!");
      }
      return restaurant;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async searchRestaurant(keyword) {
    try {
      //$regex mongo db  method to perform a regular expression search on a field
      const restaurant = await Restaurant.find({
        or: [
          {
            name: { $regex: keyword, $options: "i" },
            description: { $regex: keyword, $options: "i" },
            cuisineType: { $regex: keyword, $options: "i" },
          },
        ],
      });
    } catch (error) {}
  },
};
