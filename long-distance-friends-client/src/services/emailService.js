import axios from "axios";
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

export default { confirmBooking };