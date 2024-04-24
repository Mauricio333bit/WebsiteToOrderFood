const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const homeRoute = require("./routes/homeRoute");

app.use("/", homeRoute);

app.use(cors());
app.use(bodyParser.json());

const authRoute = require("./routes/authRoute");
app.use("/auth", authRoute);

const userRoutes = require("./routes/userRoute");
app.use("/api/user", userRoutes);

const restaurantRoutes = require("./routes/restaurantRoute");
app.use("/api/restaurants", restaurantRoutes);
const adminRestaurantRoutes = require("./routes/adminRestaurantRoute");
app.use("/api/admin/restaurants", adminRestaurantRoutes);

const orderRoutes = require("./routes/orderRoute");
app.use("/api/order", orderRoutes);
const adminOrderRoutes = require("./routes/adminOrderRoute");
app.use("/api/admin/order", adminOrderRoutes);

const menuItemsRoutes = require("./routes/foodRoute");
app.use("/api/menu", menuItemsRoutes);

const cartRoutes = require("./routes/cartRoute");
app.use("/api/cart", cartRoutes);
const cartItemRoutes = require("./routes/cartItemRoute");
app.use("/api/cart-item", cartItemRoutes);
module.exports = { app };
