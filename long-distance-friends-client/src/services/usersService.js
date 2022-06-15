import axios from "axios";
const baseUrl = "http://localhost:3001/api";

const getGroups = async(id) => {
  try {
    const res = await axios.get(`${baseUrl}/users/${id}`);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

const createUser = async (credentials) => {
  try {
    const res = await axios.post(baseUrl, credentials);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

export default { getGroups, createUser };