import axios from 'axios';
const baseUrl = '/api/login';

const localUserKey = 'bloglistUser';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const loginService = { login, localUserKey };
export default loginService;
