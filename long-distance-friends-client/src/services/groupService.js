import axios from "axios";
const baseUrl = "http://localhost:3001/api";

const createGroup = async () => {
  try {
    const res = await axios.get(`${baseUrl}/groups/`);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

export default { createGroup };