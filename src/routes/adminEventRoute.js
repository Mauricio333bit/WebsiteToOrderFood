const { Router } = require("express");
const router = Router();
const eventController = require("../controllers/eventController");
const authenticate = require("../middleware/authenticate");

router.get(
  "/restaurant/:restaurantId",
  authenticate,
  eventController.findRestaurantsEvents
);
router.post("/:restaurantId", authenticate, eventController.createEvent);
router.delete("/:eventId", authenticate, eventController.deleteEvent); //el id debe coincidir con lo desestructurado en el params controller

module.exports = router;
