import axios from 'axios';

// Automatically normalize base URL from environment or fallback to relative '/api'
export const getApiBaseUrl = () => {
  let url = (import.meta.env.VITE_API_BASE_URL || '/api').trim();
  // Strip any trailing slashes
  url = url.replace(/\/+$/, '');
  
  // If domain is provided without /api (e.g. 'https://my-backend.onrender.com')
  if (url.startsWith('http') && !url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 35000,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('resumeai_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error formatting
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is a 404 or Network Error
    let message = error.response?.data?.message || error.response?.data?.detail;

    if (!message) {
      if (error.response?.status === 404) {
        message = 'Backend API endpoint not found (404). Please ensure VITE_API_BASE_URL is set to your deployed backend URL.';
      } else if (error.code === 'ERR_NETWORK' || !error.response) {
        message = 'Cannot connect to backend server. Server may be sleeping (Render spin-up) or offline.';
      } else {
        message = error.message || 'An unexpected error occurred. Please try again.';
      }
    }
    
    // Create a normalized error object
    const customError = new Error(message);
    customError.status = error.response?.status;
    customError.data = error.response?.data;
    customError.code = error.code;
    
    return Promise.reject(customError);
  }
);

export default api;
