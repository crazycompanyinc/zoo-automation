import api from './api.js';
import type { AuthResponse, ApiResponse, User } from '../types/index.js';

export const authService = {
  register: async (data: { email: string; password: string; name: string; company?: string }) => {
    const res = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return res.data;
  },

  login: async (data: { email: string; password: string }) => {
    const res = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return res.data;
  },

  getMe: async () => {
    const res = await api.get<ApiResponse<User>>('/auth/me');
    return res.data;
  },
};
