const { Router } = require("express");
const router = Router();
const cartController = require("../controllers/cartController");
const authenticate = require("../middleware/authenticate");

router.put("/update", authenticate, cartController.updateCartItemQuantity);
router.delete("/:id/remove", authenticate, cartController.removeItemFromCart);

module.exports = router;
