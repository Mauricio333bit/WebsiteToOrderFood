const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.splite(" ")[1];
    //cada que pasamos el token desde el front se manda  "bearer token", por eso el splice
    if (!token) {
      return res.status(401).json({ msg: "No Token provided" });
    }
    const userId = getUserIdFromToken(token);

    const user = userService.findUserById(userId);
    //si encuentra el user lo manda en la request
    req.user = user;
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
  next();
};
