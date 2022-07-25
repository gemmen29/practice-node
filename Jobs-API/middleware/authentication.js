const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new UnauthenticatedError('Invalid token');
    }

    req.user = { name: user.name, userId: user._id, email: user.email };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = auth;
