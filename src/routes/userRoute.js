const { Router } = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const router = Router();

router.get("/profile", authenticate, userController.getUserProfileHandler);
//cuando se haga un get a profile primero autentica el usuario
router.get("/1", async (req, res) => {
  res.status(200).send({ message: "111" });
});
module.exports = router;
