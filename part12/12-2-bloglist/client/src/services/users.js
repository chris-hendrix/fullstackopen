import axios from 'axios';
const baseUrl = process.env.REACT_APP_BACKEND_URL + 'api/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const userService = { getAll };
export default userService;
