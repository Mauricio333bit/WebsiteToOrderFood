const cartService = require("../services/cartService");
const userService = require("../services/userService");
module.exports = {
  //   createCart: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const user = await userService.findUserById(id);
  //       await cartService.createACartForUser(user);
  //     } catch (error) {
  //       if (error instanceof Error) res.status(400).json(error.message);
  //       else res.status(500).json("Server error");
  //     }
  //   },
  addItemToCart: async (req, res) => {
    try {
      const user = req.user;
      const cart = await cartService.addItemToCart(req.body, user._id);
      res.status(200).json(cart);
    } catch (error) {
      if (error instanceof Error) res.status(400).json(error.message);
      else res.status(500).json("Server error");
    }
  },
  updateCartItemQuantity: async (req, res) => {
    try {
      const { cartItemId, quantity } = req.body;
      const updatedCart = await cartService.updateCartItemQuantity(
        cartItemId,
        quantity
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      if (error instanceof Error) res.status(400).json(error.message);
      else res.status(500).json("Server error");
    }
  },
  removeItemFromCart: async (req, res) => {
    try {
      const user = req.user;
      const { cartItemId } = req.params;
      const removedItem = await cartService.removeItemFromCart(
        cartItemId,
        user._id
      );
      res.status(200).json({ removedItem });
    } catch (error) {
      if (error instanceof Error) res.status(400).json(error.message);
      else res.status(500).json("Server error");
    }
  },
  //   calculateCartTotals: async (req, res) => {
  //     try {
  //         const {cartId,jwt}= req.query;
  //       const user = await userService.findUserProfileByJwt(jwt);
  //         const cart = await cartService.findCartByUser(user._id);//getId
  //       const total = await cartService.calculateTotalPrice(cart);

  //       return res.status(200).json(total);
  //     } catch (error) {
  //       if (error instanceof Error) res.status(400).json(error.message);
  //       else res.status(500).json("Server error");
  //     }
  //   },
  findUserCart: async (req, res) => {
    try {
      const user = req.user;
      const cart = await cartService.findCartByUserId(user._id);
      res.status(200).json(cart);
    } catch (error) {
      if (error instanceof Error) res.status(400).json(error.message);
      else res.status(500).json("Server error");
    }
  },
  clearCart: async (req, res) => {
    try {
      const user = req.user;
      const cart = await cartService.clearCart(user);
      res.sendStatus(200).json(cart);
    } catch (error) {
      if (error instanceof Error) res.status(400).json(error.message);
      else res.status(500).json("Server error");
    }
  },
};
