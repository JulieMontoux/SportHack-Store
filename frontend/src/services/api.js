import axios from 'axios';

const mode = localStorage.getItem('mode') || 'vulnerable';

const api = axios.create({
  baseURL: 'https://sporthack-store.onrender.com/api',
  headers: {
    'X-App-Mode': mode
  }
});

export default api;
