const Order = require("../schemas/Order");
const OrderList = require("../schemas/OrderList");
const Product = require("../schemas/Product");
const CONTROLLER_ORDER = {};

CONTROLLER_ORDER.POST = async (req, res) => {
  try {
    const { number, date, itemList } = req.body;
    const order = await Order.create({ number, date, items: itemList.length });

    const list = await Promise.all(
      itemList.map((item) => {
        return OrderList.create({
          OrderId: order.id,
          ProductId: item.product,
          quantity: item.quantity,
          total: item.total,
        });
      })
    );

    res.status(201).send({ ...order.dataValues, itemList: list });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

CONTROLLER_ORDER.PUT = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, itemList } = req.body;

    const order = await Order.findByPk(id);
    await order.update({ number, items: itemList.length });
    if (order.state == 2) return res.sendStatus(403);

    const list = await Promise.all(
      itemList.map(async (item) => {
        let temp = await OrderList.findByPk(item.id);
        await temp.update({
          quantity: item.quantity,
          total: item.total,
        });

        return temp;
      })
    );

    res.send({ ...order.dataValues, itemList: list });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

CONTROLLER_ORDER.PATCH = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;

    const order = await Order.findByPk(id);
    if (order.state == 2) return res.sendStatus(403);
    await order.update({ state });

    res.send(order);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

CONTROLLER_ORDER.DELETE = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (order.state == 2) return res.sendStatus(403);
    await order.update({ visible: false });

    res.status(200).send(order);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

CONTROLLER_ORDER.GET_ALL = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { visible: true } });
    res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

CONTROLLER_ORDER.GET_ONE = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    const itemList = await OrderList.findAll({ where: { OrderId: id } });

    res.status(200).send({ ...order.dataValues, itemList });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = CONTROLLER_ORDER;
