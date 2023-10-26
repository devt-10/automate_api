const {Router}  = require('express');
const router = Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Slot = require('../models/slot');
const Interviewer = require('../models/interviewer');
const Interviewee = require('../models/interviewee');


// GET: /slots/
router.get('/', catchAsync(async (req, res) => {
  let slots = [];
  let {interviewer, isFree} = req.query;
  if(interviewer){
    slots = await Slot.find({interviewer}).populate("interviewee"); 
  }
  else if(isFree){
    slots = await Slot.find({interviewee: null});
  }
  else
    slots = await Slot.find({});
  res.send(slots);
}));

// GET: /slots/:id
router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const slot = await Slot.findById(id).populate(["interviewee", "interviewer"]);
  if(!slot){
    throw new ExpressError('Slot not found', 404);
  }
  res.send(slot);
}));

// POST: /slots/
router.post('/', catchAsync(async (req, res) => {
  let slotData = req.body.slot;
  if(req.body.slot.interviewee){
    slotData.interviewee = await Interviewee.findById(req.body.slot.interviewee);
    if(!slotData.interviewee){
      throw new ExpressError('Interviewee not found', 404);
    }
  }
  if(req.body.slot.interviewer){
    slotData.interviewer = await Interviewer.findById(req.body.slot.interviewer);
    if(!slotData.interviewer){
      throw new ExpressError('Interviewer not found', 404);
    }
  }
  const slot = new Slot(req.body.slot);
  await slot.save();
  res.send(slot);
}));

// PUT: /slots/:id
router.put('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  let slotData = req.body.slot;
  if(req.body.slot.interviewee){
    slotData.interviewee = await Interviewee.findById(req.body.slot.interviewee);
    if(!slotData.interviewee){
      throw new ExpressError('Interviewee not found', 404);
    }
  }
  if(req.body.slot.interviewer){
    slotData.interviewer = await Interviewer.findById(req.body.slot.interviewer);
    if(!slotData.interviewer){
      throw new ExpressError('Interviewer not found', 404);
    }
  }
  const slot = await Slot.findByIdAndUpdate(id, { ...slotData }, {returnDocument: 'after'});
  if(!slot){
    throw new ExpressError('Slot not found', 404);
  }
  res.send(slot);
}));

module.exports = router;

