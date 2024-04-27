const { Router } = require("express");
const router = Router();
const categoryController = require("../controllers/categoryController");
const authenticate = require("../middleware/authenticate");

router.get(
  "/restaurant/:id",
  authenticate,
  categoryController.getRestaurantCategory
);

module.exports = router;
