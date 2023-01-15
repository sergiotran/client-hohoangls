import axios from 'axios';

const baseURL =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : '';

const axiosClient = axios.create({
  baseURL,
  withCredentials: true
});

export default axiosClient;