const getAllProducts = (req, res) => {
  res.status(200).json({ msg: 'Products route works!' });
};

module.exports = { getAllProducts };
