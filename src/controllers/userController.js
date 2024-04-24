const userService = require("../services/userService");
module.exports = {
  getUserProfileHandler: async (req, res) => {
    try {
      // const jwt = req.headers.authorization?.split(" ")[1];
      // const user = await userService.findUserProfileByJwt(jwt);
      const user = req.user;
      user.password = null;
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      if (error instanceof Error) res.status(400).json(error.message);
      else res.status(500).json("Server error");
    }
  },
};
