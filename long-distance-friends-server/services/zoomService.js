const axios = require("axios");
const auth = require("../utils/auth.js");

const zoomUrl = `https://api.zoom.us/v2/users/${process.env.ZOOM_EMAIL}`;

const createZoomMeeting = async (meetingTime) => {
  let token = await auth.getZoomToken();

  const headers = { authorization: `Bearer ${token}` };

  const body = {
    "agenda": "Hangout",
    "type": 2,
    "join-before-host": true,
    "start_time": meetingTime,
    "waiting-room": false
  };

  try {
    const meeting = await axios.post(`${zoomUrl}/meetings`, body, {headers: headers});
    let joinLink = meeting.data.join_url;
    return joinLink;
  }
  catch (error) {
    console.log(error);
  }
};

module.exports = {
  createZoomMeeting
};
