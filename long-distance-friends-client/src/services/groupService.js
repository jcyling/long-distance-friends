import axios from "axios";
const baseUrl = "http://localhost:3001/api";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const createGroup = async (newGroup) => {
  const config = {
    headers: { Authorization: token },
  };
  
  try {
    const res = await axios.post(`${baseUrl}/groups/`, newGroup, config);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

const deleteGroup = async () => {
  
};

export default { createGroup, deleteGroup, setToken };