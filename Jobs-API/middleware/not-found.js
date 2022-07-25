const notFound = (req, res) => {
  res.status(404).json({
    message: 'Not Route does not exist',
  });
};

module.exports = notFound;
