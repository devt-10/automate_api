// consts
const express = require('express');
const mongoose = require('mongoose');
const Interviewer = require('./models/interviewer');
const sendMail = require('./utils/sendMail');
const sendMain = require('./utils/sendMail');
require('dotenv').config();
require('./utils/initMongoIndex')();
// Connections and Initialising
const app = express();
const port = 8080;
mongoose.connect('mongodb://localhost:27017/iecse-automate', {
  useNewUrlParser: true, useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
    console.log('Database connected');
});
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use('/api/v1/interviewers', require('./routes/interviewers'));
app.use('/api/v1/interviewees', require('./routes/interviewees'));
app.use('/api/v1/slots', require('./routes/slots'));
//! TODO: Validate Using Morgan
app.post('/interviewer', async (req, res) => {
    console.log(req.body);
    const interviewer = new Interviewer(req.body);
    await interviewer.save();
    res.send(interviewer);

});

app.post('/interviewee', async (req, res) => {

  // extract email and time from req.body

  await sendMail( {
    from: `"IECSE" <IECSE@iecsemanipal.com>`, // sender address
    to: ['lance.barreto05@gmail.com','devthakkarlm10@gmail.com','jawoy62057@ngopy.com'], // list of receivers
    subject: "Come to Class", // Subject line
    text: "You missed the quiz", // plain text body
    html: "<b>Lmao</b>", // html body
  });
  res.send('Interviewee contacted');
});

app.get('/googlemeet', async (req, res) => {
  res.send('Google Meet');
  //http://meet.google.com/new
})