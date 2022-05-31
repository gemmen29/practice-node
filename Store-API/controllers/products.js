const Product = require('../models/product');

const getAllProductsTesting = async (req, res) => {
  const products = await Product.find({
    featured: true,
  });
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company } = req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true';
  }

  if (company) {
    queryObject.company = company;
  }

  const products = await Product.find(queryObject);
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProductsTesting, getAllProducts };
