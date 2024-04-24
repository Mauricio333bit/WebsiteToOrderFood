//proveeedor de json web token

require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "48h" }); //
  return token;
};

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.id;
};
module.exports = { generateToken, getUserIdFromToken };
