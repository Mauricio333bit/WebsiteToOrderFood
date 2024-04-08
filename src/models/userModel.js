const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  rol: {
    type: String,
    enum: ["ROLE_COSTUMER", "ROLE_RESTAURANT_OWNER"],
    default: "ROLE_COSTUMER",
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, refer: "Order" }],
  favorites: [
    { name: String, description: String, images: [] },
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   refer:  'Restaurant'
    // }
  ],
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
