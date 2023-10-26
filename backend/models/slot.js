const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//!Validation Middleware
const slotSchema = new Schema({
  time: {
    type: Date,
    required: true
  },
  interviewer: {
    type: Schema.Types.ObjectId,
    ref: 'Interviewer',
    required: true
  },
  interviewee : {
    type: Schema.Types.ObjectId,
    ref: 'Interviewee',
    // unique: true,
    // partialFilterExpression: {interviewee: {$type: "binData"}}
  }
});

// Remove interviewee from previous slots to ensure only one interviewee per slot
slotSchema.pre('save', async function(next){
  if(this.isModified('interviewee')){
    await Slot.updateMany({interviewee: this.interviewee}, {interviewee: null});
  }
  next();
});
// while updating as well
slotSchema.pre(['findOneAndUpdate', 'updateOne'], async function(next){
  if(this.isModified('interviewee')){
    await Slot.updateMany({interviewee: this.interviewee}, {interviewee: null});
  }
  next();
});


const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
