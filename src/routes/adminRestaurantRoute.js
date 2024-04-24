const { Router } = require("express");
const router = Router();
const restaurantController = require("../controllers/restaurantController");
const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, restaurantController.createRestaurant);
router.delete("/:id", authenticate, restaurantController.deleteRestaurantById);
router.put(
  "/:id/status",
  authenticate,
  restaurantController.updateRestaurantStatus
);
router.get("/user", authenticate, restaurantController.findRestaurantByUserId);

module.exports = router;
