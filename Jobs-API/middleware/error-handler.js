const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something went wrong, Please try again later';

  res.status(statusCode).json({
    msg: message,
  });
};

module.exports = errorHandlerMiddleware;
