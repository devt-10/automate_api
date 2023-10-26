const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Slot = require('./slot');
//!Validation Middleware
const InterviewerSchema = new Schema({
  regno: {
    type: Number,
    required: true,
    unique: true
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
  slots: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Slot'
    }
  ]
});
// Delete all slots associated with the interviewer
InterviewerSchema.post('findOneAndDelete', async (doc)=>{
  if(doc){
      console.log("Deleted!");
      await Slot.deleteMany({
          _id:{
              $in:doc.slots,
          }
      })
  }
})
const Interviewer = mongoose.model('Interviewer', InterviewerSchema);

module.exports = Interviewer;

// {
//     "name": "Interviewer",
//     "email": "h@g.com",
//     "domains": [
//         "Web Development",
//         "Machine Learning"
//     ],
//     "timeSlots": [
//         {
//             "date": "2020-10-10",
//             "time": "10:00",
//             "booked": false
//         },
//         {
//             "date": "2020-10-10",
//             "time": "11:00",
//             "booked": false
//         },
//     ]
// }