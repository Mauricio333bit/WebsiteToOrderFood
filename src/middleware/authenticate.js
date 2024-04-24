const { getUserIdFromToken } = require("../config/jwtProvider");
const userService = require("../services/userService");
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    //cada que pasamos el token desde el front se manda  "bearer token", por eso el splice
    if (!token) {
      return res.status(401).json({ msg: "No Token provided" });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      return res.status(401).json({ msg: "Invalid Token id :" + userId });
    }

    const user = await userService.findUserById(userId);
    //si encuentra el user lo manda en la request
    req.user = user;
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
  next(); // entonces cuando termine esto va hacia el proximo paso en la ruta ej: userRoute
};

module.exports = authenticate;
