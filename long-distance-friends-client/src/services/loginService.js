import axios from "axios";
const baseUrl = `${process.env.REACT_APP_SERVER}/api/login`;

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data;

};

export default { login };