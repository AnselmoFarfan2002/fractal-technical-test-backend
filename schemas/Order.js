const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.connection.js");
const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    items: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    state: {
      type: DataTypes.TINYINT,
      comment: "0: pending - 1: progress - 2: completed",
      defaultValue: 0,
    },
  },
  { createdAt: false, updatedAt: false }
);

module.exports = Order;
