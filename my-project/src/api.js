import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const PUBLIC_ENDPOINTS = [
  '/User/Login',
  '/Admin/Login',
  '/admin/login',
  '/User/Register',
  '/api/users',
  '/reviews/parking',
  '/reviews/average',
];

api.interceptors.request.use(
  (config) => {
    const requestUrl = (config.url || '').toString();
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) => requestUrl.includes(endpoint));
    const token = sessionStorage.getItem('jwtToken') || localStorage.getItem('token');
    if (!sessionStorage.getItem('jwtToken') && token) {
      sessionStorage.setItem('jwtToken', token);
    }
    console.log('TOKEN:', token);

    if (!isPublicEndpoint && !token) {
      console.error('User not authenticated');
      return Promise.reject(new Error('User not authenticated'));
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      console.error('Authentication error: unauthorized or forbidden request.', error?.response?.data || error.message);
      sessionStorage.clear();
      localStorage.removeItem('token');
      if (window.location.pathname !== '/Login') {
        window.location.href = '/Login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
