const Cart = require("../models/cartModel");
const CartItem = require("../models/cartItemModel");

const Food = require("../models/foodModel");
const Address = require("../models/addressModel");
const Restaurant = require("../models/restaurantModel");
const restaurantService = require("./restaurantService");
const cartService = require("./cartService");
const OrderItem = require("../models/orderItem");
const Order = require("../models/orderModel");
module.exports = {
  async createOrder(order, user) {
    try {
      const address = order.deliveryAddress;
      let saveAddress;
      if (address._id) {
        const isAddressExist = await Address.findById(address._id);
        if (isAddressExist) saveAddress = isAddressExist;
      } else {
        const shippingAddress = new Address(order.deliveryAddress);
        saveAddress = await shippingAddress.save();
      }
      if (!user.addresses.include(saveAddress._id))
        user.addresses.push(saveAddress._id);
      await user.save();
      const restaurant = await restaurantService.findRestaurantById(
        order.restaurantId
      ); //podria usar findById
      const cart = await cartService.findCartByUserId(user._id);
      const orderItems = [];
      for (const cartItem of cart.items) {
        const orderItem = new OrderItem({
          food: cartItem.food,
          ingredients: cartItem.ingredients,
          quantity: cartItem.quantity,
          totalPrice: cartItem.food.price * cartItem.quantity,
        });
        const saveOrderItem = await orderItem.save();
        orderItems.push(saveOrderItem._id);
      }
      const totalPrice = await cartService.calculateCartTotals(cart);
      const createOrder = await new Order({
        costumer: user._id,
        restaurant: restaurant._id,
        totalAmount: totalPrice,
        orderStatus: "Pending",
        createdAt: new Date(),
        deliveryAddress: saveAddress?._id,
        items: orderItems,
      });
      const saveOrder = await createOrder.save();
      await restaurant.save();
      return saveOrder;
      //   const paymentResponse = await paymentService.generatePaymentLink(
      //     saveOrder
      //   );
      //   return paymentResponse;
    } catch (error) {}
  },
};
