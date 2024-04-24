const { Router } = require("express");
const foodController = require("../controllers/foodController");
const authenticate = require("../middleware/authenticate");
const router = Router();

router.get("/search", foodController.searchFood);
router.get(
  "/restaurant/:restaurantId",
  authenticate,
  foodController.getMenuByRestaurantId
);

module.exports = router;
