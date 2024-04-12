const { Router } = require("express");
const router = Router();

router.get("", async (req, res) => {
  res.status(200).send({ message: "welcome to online food ordering  system" });
});
router.get("/1", async (req, res) => {
  res.status(200).send({ message: "111" });
});
module.exports = router;
