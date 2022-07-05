import axios from "axios";
const baseUrl = "http://localhost:3001/api/meetings";

const getMeeting = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const createMeeting = async (meetingInfo, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const res = await axios.post(baseUrl, meetingInfo, config);
  return res.data;
};

const deleteMeeting = async (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

export default { getMeeting, createMeeting, deleteMeeting };