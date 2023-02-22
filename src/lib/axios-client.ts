import axios from 'axios';

const host = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : '';
const baseURL = `${host}/apis`;

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosClient;