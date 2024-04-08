const { getUserIdFromToken } = require("../config/jwtProvider");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
module.exports = {
  async createUser(userData) {
    try {
      let { fullname, email, password, rol } = userData;
      const isUserExist = User.findOne({ email: email });

      if (isUserExist) {
        throw new Error("User already exist ");
      }
      password = await bcrypt.hash(password, 8);
      const user = await User.create({
        fullname,
        email,
        password,
        role,
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async findUserById(id) {
    try {
      const user = await User.findById(id).populate("addresses");
      if (!user) {
        throw new Error("No user with this id: " + id);
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async findUserProfileByJwt(jwt) {
    try {
      const userId = getUserIdFromToken(jwt);
      const user = await User.findById(userId);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getAllUsers() {
    try {
      const users = await User.find();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
