const { Router } = require("express");
const router = Router();
const cartController = require("../controllers/cartController");
const authenticate = require("../middleware/authenticate");

router.put("/add", authenticate, cartController.addItemToCart);
// router.get("/total", authenticate, cartController.calcuateTotal); //no esta esa funcion
router.get("", authenticate, cartController.findUserCart);
router.put("/clear", authenticate, cartController.clearCart);

module.exports = router;
