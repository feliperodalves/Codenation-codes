const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:1338/api',
});

export default api;
