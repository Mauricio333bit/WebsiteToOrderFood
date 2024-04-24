const { Router } = require("express");
const router = Router();
const orderController = require("../controllers/orderController");
const authenticate = require("../middleware/authenticate");

router.get("/user", authenticate, orderController.getAllUserOrders);
router.post("", authenticate, orderController.createOrder);
module.exports = router;
