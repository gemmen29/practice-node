const Product = require('../models/product');

const getAllProductsTesting = async (req, res) => {
  const products = await Product.find({
    featured: true,
  });
  console.log(products);
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProductsTesting, getAllProducts };
