const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.connection.js");

const OrderList = sequelize.define(
  "OrderList",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  { createdAt: false, updatedAt: false }
);

module.exports = OrderList;

const Product = require("./Product.js");
const Order = require("./Order.js");
OrderList.belongsTo(Order);
OrderList.belongsTo(Product);
