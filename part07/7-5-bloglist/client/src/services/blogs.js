import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const addComment = async (id, comment) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config);
  return response.data;
};

const deleteOne = async (id) => {
  console.log(id);
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const blogService = { setToken, getAll, create, update, deleteOne, addComment };
export default blogService;
