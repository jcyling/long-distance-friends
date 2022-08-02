const axios = require("axios");
const baseUrl = "http://localhost:3001/api/email";

const confirmBooking = async (name, email) => {
  let mailOptions = {
    to: email,
    subject: `Thanks for letting your friends know when you're free,  ${name}`,
    text: "We'll let you know when everyone's done."
  };

  const res = await axios.post(baseUrl, mailOptions);
  return res.data;
};

const sendMeetingLink = async (name, email, timezone, meetingTime, zoomLink) => {
  let mailOptions = {
    to: email,
    subject: `Your hangout will be on ${meetingTime}`,
    text: `Hi ${name}! Your timezone is ${timezone}. The hangout will be on ${meetingTime}. Join here ${zoomLink}!`
  };

  const res = await axios.post(baseUrl, mailOptions);
  return res.data;
};

const sendRebookLink = async (email) => {
  let mailOptions = {
    to: email,
    subject: "Rebook your hangout time",
    text: "The time doesn't work for everyone! Try and rebook here."
  };

  const res = await axios.post(baseUrl, mailOptions);
  return res.data;
};

module.exports = {
  confirmBooking,
  sendMeetingLink,
  sendRebookLink
};