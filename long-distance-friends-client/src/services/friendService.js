import axios from "axios";
const baseUrl = "http://localhost:3001/api/friends";

const addFriend = async (friendInfo, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  try {
    const res = await axios.post(baseUrl, friendInfo, config);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

const editFriend = async (friendInfo, id) => {
  try {
    const res = await axios.patch(`${baseUrl}/${id}`, friendInfo);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

export default { addFriend, editFriend };