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
        orderStatus: "PENDING",
        createdAt: new Date(),
        deliveryAddress: saveAddress?._id,
        items: orderItems,
      });
      const saveOrder = await createOrder.save();
      restaurant.orders.push(saveOrder._id);
      await restaurant.save();
      return saveOrder;
      //   const paymentResponse = await paymentService.generatePaymentLink(
      //     saveOrder
      //   );
      //   return paymentResponse;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async cancelOrder(orderId) {
    try {
      await Order.findByIdAndDelete(orderId);
    } catch (error) {
      throw new Error(
        "Failed to cancel order with  id " + orderId + error.message
      );
    }
  },
  async findOrderById(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) throw new Error("No order found with id: " + orderId);

      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getUserOrders(userId) {
    try {
      const orders = await Order.find({ costumer: userId });
      return orders;
    } catch (error) {
      throw new Error("Error getting the user orders");
    }
  },
  async getRestaurantOrders(restaurantId, orderStatus) {
    try {
      const orders = await Order.find({ restaurant: restaurantId });
      if (orderStatus) {
        orders = orders.filter((order) => order.orderStatus === orderStatus);
      }
      return orders;
    } catch (error) {
      throw new Error(
        "Error getting the restaurant orders. Id: " + restaurantId
      );
    }
  },
  async updateOrderStatus(orderId, orderStatus) {
    try {
      const validStatus = [
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "COMPLETED",
        "PENDING",
      ];
      if (!validStatus.includes(orderStatus)) throw new Error("Invalid status");

      const updatedOrder = await Order.findById(orderId);
      updatedOrder.orderStatus = orderStatus;
      await updatedOrder.save();
    } catch (error) {}
  },
};
