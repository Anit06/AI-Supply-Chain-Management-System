const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const warehouseRoutes = require("./routes/warehouseRoutes");


const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);

app.get("/", (req, res) => {
  res.send(
    "AI Supply Chain API Running"
  );
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/warehouses",
  require("./routes/warehouseRoutes")
);

app.use(
  "/api/warehouses",
  warehouseRoutes
);

module.exports = app;