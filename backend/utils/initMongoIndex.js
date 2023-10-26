const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Interviewer = require('../models/interviewer');
const Interviewee = require('../models/interviewee');
const Slot = require('../models/slot');

async function initMongoIndex() {
  await Interviewer.init();
  await Interviewee.init();
  await Slot.init();

  console.log("Mongo unique indexes initialized");
} 

module.exports = initMongoIndex;