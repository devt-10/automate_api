const {Router}  = require('express');
const router = Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Interviewee = require('../models/interviewee');
const Slot = require('../models/slot');
// GET: /interveiwees/
router.get('/', catchAsync(async (req, res) => {
  const interviewees = await Interviewee.find({});
  res.send(interviewees);
}))

// GET: /interveiwees/:id
router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const interviewee = await Interviewee.findById(id);
  if(!interviewee){
    throw new ExpressError('Interviewee not found', 404);
  }
  res.send(interviewee);
}))

// POST: /interveiwees/
router.post('/', catchAsync(async (req, res) => {
  const interviewee = new Interviewee(req.body.interviewee);
  await interviewee.save();
  res.send(interviewee);
}))

// PUT: /interveiwees/:id
router.put('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const interviewee = await Interviewee.findByIdAndUpdate(id, { ...req.body.interviewee }, {returnDocument: 'after'});
  if(!interviewee){
    throw new ExpressError('Interviewee not found', 404);
  }
  res.send(interviewee);
}))

// DELETE: /interveiwees/:id
router.delete('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const interviewee = await Interviewee.findByIdAndDelete(id);
  // set slot to null if any
  if(interviewee){
    if(interviewee.slot){
      const slot = await Slot.findById(interviewee.slot);
      slot.interviewee = null;
      await slot.save();
    }
  }
  else{
    throw new ExpressError('Interviewee not found', 404);
  }
  res.send(interviewee);
}))

module.exports = router;

