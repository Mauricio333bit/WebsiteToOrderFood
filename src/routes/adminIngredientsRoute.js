const { Router } = require("express");
const router = Router();
const ingredientsController = require("../controllers/ingredientsController");
const authenticate = require("../middleware/authenticate");

router.post(
  "/category",
  authenticate,
  ingredientsController.createIngredientCategory
); //crea categoria de ingredientes
router.post("", authenticate, ingredientsController.createIngredientItem); //crea un ingrediente
router.put("/:id/stoke", authenticate, ingredientsController.updateStoke);
router.get(
  "/restaurant/:id",
  authenticate,
  ingredientsController.restaurantsIngredient
);
router.get(
  "/restaurant/:id/category",
  authenticate,
  ingredientsController.restaurantsIngredientCategory
);

module.exports = router;
