import axios from "axios";
const baseUrl = `${process.env.REACT_APP_SERVER}/api/bookings`;

const createBooking = async (bookingInfo) => {
  const res = await axios.post(baseUrl, bookingInfo);
  return res.data;
};

export default { createBooking };