import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://p5000-z0808c543-zf8cc8751-gtw.zb20e5e48.qovery.fr',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token');
  return config;
});

export default instance;
