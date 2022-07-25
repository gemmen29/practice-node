const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide a company name'],
    maxlength: [50, 'Company name must be at most 50 characters long'],
  },
  position: {
    type: String,
    required: [true, 'Please provide a position'],
    maxlength: [100, 'Position must be at most 100 characters long'],
  },
  status: {
    type: String,
    enum: ['interview', 'declined', 'pending', 'hired'],
    default: 'pending',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user'],
  },
});

module.exports = mongoose.model('Job', JobSchema);
