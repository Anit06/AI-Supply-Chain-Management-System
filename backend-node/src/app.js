const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
<<<<<<< HEAD
const warehouseRoutes = require("./routes/warehouseRoutes");
=======
>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96

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

<<<<<<< HEAD
app.use(
  "/api/warehouses",
  require("./routes/warehouseRoutes")
);

app.use(
  "/api/warehouses",
  warehouseRoutes
);

=======
>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
module.exports = app;