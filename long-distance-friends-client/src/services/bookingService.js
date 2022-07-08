import axios from "axios";
const baseUrl = "http://localhost:3001/api/bookings";

const createBooking = async (bookingInfo) => {
  const res = await axios.post(baseUrl, bookingInfo);
  return res.data;
};

export default { createBooking };