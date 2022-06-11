import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://neuro-support.herokuapp.com/api',
  withCredentials: true,
});

export default instance;
