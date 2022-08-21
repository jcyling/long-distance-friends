const mongoose = require("mongoose");
const axios = require("axios");
const _ = require("lodash");
const { DateTime } = require("luxon");
const { nanoid } = require("nanoid");

const checkBookingsOverlaps = async (uid) => {
  const meeting = await mongoose.model("Meeting")
    .findOne({ "uid": uid })
    .populate({
      path: "bookings",
      model: "Booking",
      populate: {
        path: "booker"
      }
    })
    .exec();
  const bookings = meeting.bookings;

  // Get array of each booking's availability
  const availabilities = bookings.map(booking => {
    const list = booking.availability;
    // Convert each datetime in list to a string
    const listToString = list.map(datetime => {
      return datetime.toISOString();
    });
    return listToString;
  });

  // Find intersection of arrays
  const overlap = _.intersection(...availabilities);
  
  if (overlap.length > 0) {
    // Ensure it is the soonest overlapped time
    const firstOverlap = overlap[0];

    // Convert to luxon datetime
    return DateTime.fromISO(firstOverlap);
  }
  else {
    return false;
  }
};

const convertToUserTimezone = (datetime, iana) => {
  return datetime.setZone(iana).toFormat("yyyy-MM-dd HH:mma ZZZZ");
};

const convertLocationToTimezone = async (city) => {
  const latLng = await convertLocationToLatLong(city);
  const timezone = await convertLatLongToTimezone(latLng);
  return timezone;
};

const convertLocationToLatLong = async (city) => {
  // Find lat long from location
  const locationAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GMAPS_KEY}`;

  try {
    const res = await axios.get(locationAPI);
    const result = res.data.results[0].geometry.location;
    return result;
  }
  catch (error) {
    console.log(error);
  }
};

const convertLatLongToTimezone = async ({ lat, lng }) => {
  // Get timestamp in seconds
  const timestamp = Math.round(Date.now() / 1000);

  // Find timezone from lat long
  const timezoneAPI = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${process.env.GMAPS_KEY}`;

  try {
    const res = await axios.get(timezoneAPI);
    const timezoneIANA = res.data.timeZoneId;
    const dstHour = res.data.dstOffset / 3600;
    const hours = res.data.rawOffset / 3600;
    const total = hours + dstHour;
    return { iana: timezoneIANA, offset: total };
  }
  catch (error) {
    console.log(error);
  }
};

const genUID = () => {
  return nanoid(10);
};

module.exports = {
  checkBookingsOverlaps,
  convertToUserTimezone,
  convertLocationToTimezone,
  convertLocationToLatLong,
  convertLatLongToTimezone,
  genUID
};