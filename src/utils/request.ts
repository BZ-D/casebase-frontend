import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:8081'
});

axios.interceptors.request.use((config) => {
  const requestConfig = {
    ...config,
    url: `${config.url}`
  };
  return requestConfig;
});

export {
  service as axios
};