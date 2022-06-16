const axios = require("axios");

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
    const timezoneLocale = res.data.timeZoneId;
    const timezoneName = res.data.timeZoneName;
    const dstHour = res.data.dstOffset / 3600;
    const hours = res.data.rawOffset / 3600;
    return hours + dstHour;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = { 
  convertLocationToTimezone,
  convertLocationToLatLong,
  convertLatLongToTimezone
};