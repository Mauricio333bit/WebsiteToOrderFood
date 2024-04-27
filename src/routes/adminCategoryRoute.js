const { Router } = require("express");
const router = Router();
const categoryController = require("../controllers/categoryController");
const authenticate = require("../middleware/authenticate");

router.post("", authenticate, categoryController.createCategory);
router.get(
  "/category/restaurant/:id",
  authenticate,
  categoryController.getRestaurantCategory
);

module.exports = router;
