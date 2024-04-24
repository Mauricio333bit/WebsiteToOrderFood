const Cart = require("../models/cartModel");
const CartItem = require("../models/cartItemModel");

const Food = require("../models/foodModel");
module.exports = {
  async createCart(user) {
    try {
      //crear carrito de compra y guardar
      const cart = new Cart({ costumer: user });
      const createdCart = await cart.save();
      return createdCart;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async findCartByUserId(userId) {
    try {
      let cart = await Cart.findOne({ costumer: userId }).populate([
        {
          path: "items",
          populate: {
            path: "food",
            populate: { path: "restaurant", select: "_id" },
          },
        },
      ]);
      if (!cart) throw new Error("Cart not found ", userId);
      let cartItems = await CartItem.find({ cart: cart._id }).populate("food");

      let totalPrice = 0;
      let totalDiscountedPrice = 0;
      let totalItem = 0;
      for (const item of cart.items) {
        totalPrice += item.price;
        totalDiscountedPrice += item.discounted_price;
        totalItem += item.quantity;
      }
      cart.totalPrice = totalPrice;
      cart.totalDiscountedPrice = totalDiscountedPrice;
      cart.totalItem = totalItem;
      cart.discounte = totalPrice - totalDiscountedPrice;

      return cart;
      //    calculatePrices(cartItems) {
      //     let totalPrice = 0;
      //     let totalDiscountedPrice = 0;
      //     let totalItem = 0;

      //     for (const item of cartItems) {
      //       totalPrice += item.price;
      //       totalDiscountedPrice += item.discountedPrice;
      //       totalItem += item.quantity;
      //     }
      //     return {totalItem, totalPrice, totalDiscountedPrice};
      //   },
      //   const{totalPrice, totalDiscountedPrice, totalItem}=await this.calculatePrices(cartItems);
      //   cart.totalPrice= totalPrice;
      //   cart.totalDiscountedPrice= totalDiscountedPrice;
      //   cart.totalItem= totalItem;
      //   return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async addItemToCart(req, userId) {
    try {
      const cart = await Cart.findOne({ costumer: userId });
      const food = await Food.findById(req.menuItemId);
      const isPresent = await CartItem.findOne({
        cart: cart._id,
        food: food._id,
        idUser,
      });
      if (!isPresent) {
        const cartItem = new CartItem({
          cart: cart._id,
          food: food._id,
          idUser,
          quantity: 1,
          totalPrice: food.price,
        });
        const createdCartItem = await cartItem.save();
        cart.items.push(createdCartItem);
        await cart.save();
        return createdCartItem;
      }
      return isPresent;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async updateCartItemQuantity(cartItemId, quantity) {
    try {
      const cartItem = await CartItem.findById(cartItemId).populate([
        { path: "food", select: "_id" },
      ]);
      if (!cartItem) {
        throw new Error("Cart item not found ID: ", cartItemId);
      }
      cartItem.quantity = quantity;
      cartItem.totalPrice = quantity * cartItem.food.price;
      await cartItem.save();
      return cartItem;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async removeItemFromCart(cartItemId, user) {
    try {
      const cart = await Cart.findOne({ costumer: user._id });

      cart.items = cart.items.filter((item) => !item.equals(cartItemId));
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async clearCart(user) {
    try {
      const cart = await Cart.findOne({
        costumer: user._id,
      });
      if (!cart) throw new Error("Cart not found for  this user :", user._id);
      cart.items = [];
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async calculateCartTotals(cart) {
    try {
      let total = 0;
      for (let cartItem of cart) {
        total += cartItem.food.price * cartItem.quantity;
      }
      return total;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
