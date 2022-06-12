import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://neuro-support-backend.vercel.app/api',
  withCredentials: true,
});

export default instance;
