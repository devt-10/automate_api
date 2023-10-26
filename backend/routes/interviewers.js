const {Router}  = require('express');
const router = Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Interviewer = require('../models/interviewer');
const { default: mongoose } = require('mongoose');

// GET: /interviewers/
router.get('/', catchAsync(async (req, res) => {
  const interviewers = await Interviewer.find({});
  res.send(interviewers);
}))

// GET: /interviewers/:id
router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const interviewer = await Interviewer.findById(id);
  if(!interviewer){
    throw new ExpressError('Interviewer not found', 500);
  }
  res.send(interviewer);
}))
// POST: /interviewers/
router.post('/', catchAsync(async (req, res) => {
  const interviewer = new Interviewer(req.body.interviewer);
  await interviewer.save();
  res.send(interviewer);
}))

// PUT: /interviewers/:id
router.put('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const interviewer = await Interviewer.findByIdAndUpdate(id, { ...req.body.interviewer }, {returnDocument: 'after'});
  if(!interviewer){
    throw new ExpressError('Interviewer not found', 404);
  }
  res.send(interviewer);
}))

// DELETE: /interviewers/:id
router.delete('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const interviewer = await Interviewer.findByIdAndDelete(id);
  if(!interviewer){
    throw new ExpressError('Interviewer not found', 404);
  }
  res.send(interviewer);
}))

module.exports = router;
