import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Base URL - Update this to your Railway backend URL
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:8000/api'  // Local development
  : 'https://giggh-production.up.railway.app/api';  // Production

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });
        const { access } = response.data;
        await AsyncStorage.setItem('access_token', access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (err) {
        await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
        // Navigate to login (handled by navigation)
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register/', data),
  login: (data) => api.post('/auth/login/', data),
  getCurrentUser: () => api.get('/auth/me/'),
  refreshToken: (refresh) => api.post('/auth/refresh/', { refresh }),
};

// Performers API
export const performersAPI = {
  getAll: (params) => api.get('/performers/', { params }),
  getById: (id) => api.get(`/performers/${id}/`),
  getFeatured: () => api.get('/performers/featured/'),
  search: (query) => api.get('/performers/search/', { params: { q: query } }),
};

// Bookings API
export const bookingsAPI = {
  getAll: () => api.get('/bookings/'),
  getById: (id) => api.get(`/bookings/${id}/`),
  create: (data) => api.post('/bookings/', data),
  update: (id, data) => api.put(`/bookings/${id}/`, data),
  getMyBookings: () => api.get('/bookings/my-bookings/'),
};

// Reviews API
export const reviewsAPI = {
  getAll: (params) => api.get('/reviews/', { params }),
  getById: (id) => api.get(`/reviews/${id}/`),
  create: (data) => api.post('/reviews/', data),
};

export default api;

