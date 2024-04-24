const orderService = require("../services/orderService");
const { getAllRestaurants } = require("../services/restaurantService");
module.exports = {
  // COSTUMER ORDER CONTROLLERS
  async createOrder(req, res) {
    try {
      const order = req.body;
      const user = req.user;
      const paymentResponse = await orderService.createOrder(order, user);
      res.status(201).json(paymentResponse);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getAllUserOrders(req, res) {
    try {
      const user = req.user;
      const userOrders = orderService.getUserOrders(user._id);
      req.status(200).json(userOrders);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
  // ADMIN ORDER CONTROLLERS
  async deleteOrder(req, res) {
    try {
      const { orderId } = req.params;
      await orderService.cancelOrder(orderId);
      res.status(200).json("Order deleted with id: " + orderId);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getAllRestaurantOrders(req, res) {
    try {
      const { restaurantId } = req.params;
      const { orderStatus } = req.query;
      const orders = await orderService.getRestaurantOrders(
        restaurantId,
        orderStatus
      );
      res.status(200).json(orders);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async updateStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { orderStatus } = req.query;
      const order = await orderService.updateOrderStatus(orderId, orderStatus);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
