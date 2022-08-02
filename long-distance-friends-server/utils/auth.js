const axios = require("axios");

const getTokenFrom = req => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};


// Get Zoom API Token with expiration
const getZoomToken = async (req, res, next) => {
  const buffer = Buffer.from(process.env.ZOOM_CID + ":" + process.env.ZOOM_SECRET);

  try {
    const zoomRes = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_AID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${buffer.toString("base64")}`,
      },
    });
    const zoomData = await zoomRes.json();
    return zoomData.access_token;

  }
  catch (error) {
    console.log(error);
    return res.error("Could not connect to Zoom.");
  }
};

module.exports = {
  getTokenFrom,
  getZoomToken
};