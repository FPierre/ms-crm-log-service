const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    enum: ['create', 'updated', 'delete']
  },
  model: {
    type: String,
    required: true,
    enum: ['agency', 'lead', 'user']
  },
  note: {
    type: String,
    maxlength: 255
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  _userId: {
    type: String,
    required: true
  }
})

const Log = mongoose.model('Log', logSchema)

module.exports = Log
