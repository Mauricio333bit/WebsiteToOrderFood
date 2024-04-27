const { Router } = require("express");
const router = Router();
const eventController = require("../controllers/eventController");
const authenticate = require("../middleware/authenticate");

router.get("", authenticate, eventController.findAllEvents);

module.exports = router;
