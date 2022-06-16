import axios from "axios";
const baseUrl = "http://localhost:3001/api";

const getGroupInfo = async (id) => {
  try {
    const res = await axios.post(`${baseUrl}/groups/${id}`);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

const createGroup = async (newGroup, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  
  try {
    const res = await axios.post(`${baseUrl}/groups/`, newGroup, config);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

const addFriend = async (id, friends, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  try {
    const res = await axios.patch(`${baseUrl}/groups/${id}`, friends, config);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

const deleteGroup = async (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  };

  const res = await axios.delete(`${baseUrl}/groups/${id}`, config);
  return res.data;
};

export default { getGroupInfo, createGroup, deleteGroup, addFriend };