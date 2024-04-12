const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  costumer: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      type: mongoose.Types.ObjectId,
      ref: "CartItem",
    },
  ],
  total: Number,
});

const Cart = mongoose.model("Cart", cartSchema); //se indica el nombre de la tabla y el esquema a usar

module.exports = Cart;
