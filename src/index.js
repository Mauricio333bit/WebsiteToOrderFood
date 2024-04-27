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
//user
const userRoutes = require("./routes/userRoute");
app.use("/api/user", userRoutes);
//restauramt
const restaurantRoutes = require("./routes/restaurantRoute");
app.use("/api/restaurants", restaurantRoutes);
const adminRestaurantRoutes = require("./routes/adminRestaurantRoute");
app.use("/api/admin/restaurants", adminRestaurantRoutes);
//order
const orderRoutes = require("./routes/orderRoute");
app.use("/api/order", orderRoutes);
const adminOrderRoutes = require("./routes/adminOrderRoute");
app.use("/api/admin/order", adminOrderRoutes);
//menu
const menuItemsRoutes = require("./routes/foodRoute");
app.use("/api/menu", menuItemsRoutes);
//cart
const cartRoutes = require("./routes/cartRoute");
app.use("/api/cart", cartRoutes);
const cartItemRoutes = require("./routes/cartItemRoute");
app.use("/api/cart-item", cartItemRoutes);
//category
const categoryRoutes = require("./routes/categoryRoute");
app.use("/api/category", categoryRoutes);
const adminCategoryRoutes = require("./routes/adminCategoryRoute");
app.use("/api/admin/category", adminCategoryRoutes);

//ingredients
const adminIngredientsRoutes = require("./routes/adminIngredientsRoute");
app.use("/api/admin/ingredients", adminIngredientsRoutes);

//events
const eventRoutes = require("./routes/eventRoute");
app.use("/api/event", eventRoutes);
const adminEventRoutes = require("./routes/adminEventRoute");
app.use("/api/admin/event", adminEventRoutes);

module.exports = { app };
