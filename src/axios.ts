import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://alexstr-ashop.onrender.com',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token');
  return config;
});

export default instance;
