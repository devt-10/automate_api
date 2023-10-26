const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//!Validation Middleware
const intervieweeSchema = new Schema({
  regno: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: String,
  domains: [String],
  info: String,
  slot: {
    type: Schema.Types.ObjectId,
    ref: 'Slot'
  }

});

const Interviewee = mongoose.model('Interviewee', intervieweeSchema);

module.exports = Interviewee;