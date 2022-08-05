import axios from "axios";
const baseUrl = `${process.env.REACT_APP_SERVER}/api`;

const getInfo = async (id) => {
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

const editUserProfile = async (profile) => {
  try {
    const res = await axios.post(baseUrl, profile);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

export default { getInfo, createUser, editUserProfile };