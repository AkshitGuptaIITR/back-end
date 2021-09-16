const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  letter: {
    type: String,
    required: true,
  },
  numeric: {
    type: Number,
    required: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;