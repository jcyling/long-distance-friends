import axios from "axios";
const baseUrl = "http://localhost:3001/api/bookings";

const createBooking = async (bookingInfo, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const res = await axios.post(baseUrl, bookingInfo, config);
  return res.data;
};

export default { createBooking };