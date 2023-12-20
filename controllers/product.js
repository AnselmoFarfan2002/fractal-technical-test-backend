const Product = require("../schemas/Product");
const CONTROLLER_PRODUCT = {};

CONTROLLER_PRODUCT.POST = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await Product.create({ name, price });
    res.status(201).send(product);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

CONTROLLER_PRODUCT.PUT = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = await Product.findByPk(id);
    await product.update({ name, price });

    res.status(201).send(product);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

CONTROLLER_PRODUCT.DELETE = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    await product.update({ visible: false });

    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

CONTROLLER_PRODUCT.GET_ALL = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = CONTROLLER_PRODUCT;
