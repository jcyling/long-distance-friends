const axios = require("axios");
const baseUrl = "http://localhost:3001/api/email";

const confirmBooking = async (targetName, targetEmail) => {
  let mailOptions = {
    to: targetEmail,
    subject: `Thanks for letting your friends know when you're free,  ${targetName}`,
    text: "We'll let you know when everyone's done."
  };

  const res = await axios.post(baseUrl, mailOptions);
  return res.data;
};

const sendMeetingLink = async (targetEmail, targetTimezone, targetMeetingTime) => {
  let mailOptions = {
    to: targetEmail,
    subject: `Your hangout will be at ${targetMeetingTime}`,
    text: `Your timezone is ${targetTimezone}. The hangout will be on ${targetMeetingTime}.`
  };

  const res = await axios.post(baseUrl, mailOptions);
  return res.data;
};

const sendRebookLink = async (targetEmail) => {
  let mailOptions = {
    to: targetEmail,
    subject: "Rebook your hangout time",
    text: "The time doesn't work for everyone! Try and rebook here"
  };

  const res = await axios.post(baseUrl, mailOptions);
  return res.data;
};

module.exports = {
  confirmBooking,
  sendMeetingLink,
  sendRebookLink
};