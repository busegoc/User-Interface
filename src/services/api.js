import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

const api = {
  getUsers: () => axios.get(`${BASE_URL}/users?page=1`),
  getSingleUser: (userId) => axios.get(`${BASE_URL}/users/${userId}`),
  createUser: (data) => axios.post(`${BASE_URL}/users`, data),
};

export default api;
