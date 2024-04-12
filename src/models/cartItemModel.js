const moongose = require("mongoose");
const cartItemSchema = new moongose.Schema({
  cart: {
    type: moongose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  food: {
    type: moongose.Schema.Types.ObjectId,
    ref: "Food",
  },
  quantity: Number,
  totalPrice: Number,
});

const CartItem = moongose.model("CartItem", cartItemSchema);
module.exports = CartItem;
