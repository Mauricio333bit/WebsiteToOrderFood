const { Router } = require("express");
const router = Router();
const orderController = require("../controllers/orderController");
const authenticate = require("../middleware/authenticate");

router.delete("/:oderId", orderController.deleteOrder); // el param orderId tiene que coincidir con la desestructuracion en el controller {orderId}
router.get(
  "/restaurant/:restaurantId",
  authenticate,
  orderController.getAllRestaurantOrders
);
router.put(
  "/:orderId/:orderStatus",
  authenticate,
  orderController.updateStatus
);
module.exports = router;
