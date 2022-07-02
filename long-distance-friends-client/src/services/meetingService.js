import axios from "axios";
const baseUrl = "http://localhost:3001/api/meetings";

const createMeeting = async (meetingWindow) => {
  const req = {
    window: meetingWindow
  };
  const res = await axios.post(baseUrl, req);
  return res.data;
};

export default { createMeeting };