import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
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
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
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
  create: (data) => api.post('/performers/', data),
  update: (id, data) => api.put(`/performers/${id}/`, data),
  delete: (id) => api.delete(`/performers/${id}/`),
};

// Bookings API
export const bookingsAPI = {
  getAll: () => api.get('/bookings/'),
  getById: (id) => api.get(`/bookings/${id}/`),
  create: (data) => api.post('/bookings/', data),
  update: (id, data) => api.put(`/bookings/${id}/`, data),
  delete: (id) => api.delete(`/bookings/${id}/`),
  getMyBookings: () => api.get('/bookings/my-bookings/'),
};

// Reviews API
export const reviewsAPI = {
  getAll: (params) => api.get('/reviews/', { params }),
  getById: (id) => api.get(`/reviews/${id}/`),
  create: (data) => api.post('/reviews/', data),
  update: (id, data) => api.put(`/reviews/${id}/`, data),
  delete: (id) => api.delete(`/reviews/${id}/`),
};

export default api;

