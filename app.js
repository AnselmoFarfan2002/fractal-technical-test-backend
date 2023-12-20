require("dotenv").config();
const express = require("express");
const CONTROLLER_ORDER = require("./controllers/order");

const sequelize = require("./config/db.connection");
const OrderList = require("./schemas/OrderList");
const path = require("path");

const CONTROLLER_PRODUCT = require("./controllers/product");

function main() {
  const app = express();

  app.use(express.json());
  app.use(require("cors")({ origin: "*" }));

  app
    .route("/api/order")
    .post(CONTROLLER_ORDER.POST)
    .get(CONTROLLER_ORDER.GET_ALL);
  app
    .route("/api/order/:id")
    .put(CONTROLLER_ORDER.PUT)
    .delete(CONTROLLER_ORDER.DELETE)
    .get(CONTROLLER_ORDER.GET_ONE)
    .patch(CONTROLLER_ORDER.PATCH);

  app
    .route("/api/product")
    .post(CONTROLLER_PRODUCT.POST)
    .get(CONTROLLER_PRODUCT.GET_ALL);

  app
    .route("/api/product/:id")
    .put(CONTROLLER_PRODUCT.PUT)
    .delete(CONTROLLER_PRODUCT.DELETE);

  app.use(express.static("out"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "out", "index.html"));
  });

  app.listen(80, () => {
    console.log("Server running 🏭");
  });
}

sequelize.sync().then(main);
