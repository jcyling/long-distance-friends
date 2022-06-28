import axios from "axios";
const baseUrl = "http://localhost:3001/api/meetings";

const createMeeting = async () => {
  const res = await axios.post(baseUrl);
  return res.data;
};

export default { createMeeting };