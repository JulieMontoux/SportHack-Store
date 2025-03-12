import axios from 'axios';

const mode = localStorage.getItem('mode') || 'vulnerable';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'X-App-Mode': mode
  }
});

export default api;
