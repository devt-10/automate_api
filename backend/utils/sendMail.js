const nodemailer = require("nodemailer");
const ics = require('ics')

function createICS() {
  const event = {
    start: [2023, 5, 30, 6, 30],
    duration: { hours: 6, minutes: 30 },
    title: 'Bolder Boulder',
    description: 'Annual 10-kilometer run in Boulder, Colorado',
    location: 'Folsom Field, University of Colorado (finish line)',
    url: 'http://www.bolderboulder.com/',
    geo: { lat: 40.0095, lon: 105.2669 },
    categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
    attendees: [
      { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
      { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton', role: 'OPT-PARTICIPANT' }
    ]
  }

  return ics.createEvent(event, (error, value) => {
    if (error) {
      console.log(error)
      return error
    }

    console.log(value)
    return value;
  })
}
async function main(data) {
  // creating ics file as attachment
  let icsFile = createICS();
  let attachments = [{ filename: 'invite.ics', content: icsFile }]
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: process.env.SENDINBLUE_USER,
      pass: process.env.SENDINBLUE_PASS,
    }
  });
  const { from, to, subject, text, html } = data;
  // send mail with defined transport object
  let info = await transporter.sendMail({ from, to, subject, text, html , attachments});
  console.log(info);
}


module.exports = async (data) => {
  main(data).catch(console.error);
};