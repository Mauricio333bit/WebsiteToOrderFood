const { Router } = require("express");
const restaurantController = require("../controllers/restaurantController");
const authenticate = require("../middleware/authenticate");
const router = Router();

router.get("/search", restaurantController.findRestaurantByName);
router.get("/", authenticate, restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.findRestaurantById);
router.get(
  "/:id/add-favorites",
  authenticate,
  restaurantController.addToFavorites
);
module.exports = router;
