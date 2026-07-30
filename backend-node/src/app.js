const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const warehouseRoutes = require("./routes/warehouseRoutes");
const supplierRoutes = require("./routes/supplierRoutes.js")
const inventoryRoutes = require("./routes/inventoryRoutes");
const profileRoutes = require("./routes/profileRoutes");
const shopkeeperRoutes = require("./routes/shopkeeperRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const catalogRoutes = require("./routes/catalogRoutes");
const aiRoutes = require("./routes/aiRoutes");
<<<<<<< HEAD
=======
const historyRoutes = require("./routes/historyRoutes");
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("AI Supply Chain API Running");
});

<<<<<<< HEAD
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/suppliers",
  supplierRoutes
);

app.use(
  "/api/warehouses",
  require("./routes/warehouseRoutes")
);

=======
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);

app.use("/api/suppliers",supplierRoutes);
app.use("/api/warehouses",require("./routes/warehouseRoutes"));
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/shopkeeper", shopkeeperRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/catalog", catalogRoutes);

app.use("/api/ai", aiRoutes);
<<<<<<< HEAD
=======
app.use("/api/history", historyRoutes);
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78

module.exports = app;
