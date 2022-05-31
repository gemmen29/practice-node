const Product = require('../models/product');

const getAllProductsTesting = async (req, res) => {
  const products = await Product.find({
    featured: true,
  });
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true';
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  // Numeric Filter
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '<': '$lt',
      '>=': '$gte',
      '<=': '$lte',
      '=': '$eq',
    };
    const regex = /\b(<|>|>=|<=|=)\b/g;
    const filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters.split(',').forEach((filter) => {
      const [field, operator, value] = filter.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = Product.find(queryObject);
  //sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }
  // Return specific fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }
  //Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProductsTesting, getAllProducts };
