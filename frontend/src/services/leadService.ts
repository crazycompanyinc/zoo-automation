import api from './api.js';
import type { Lead, ApiResponse } from '../types/index.js';

export const leadService = {
  getAll: async () => {
    const res = await api.get<ApiResponse<Lead[]>>('/leads');
    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get<ApiResponse<Lead>>(`/leads/${id}`);
    return res.data;
  },

  create: async (data: { serviceId?: string; name: string; email: string; company?: string; description: string; budget?: string }) => {
    const res = await api.post<ApiResponse<Lead>>('/leads', data);
    return res.data;
  },

  update: async (id: string, data: Partial<Lead>) => {
    const res = await api.patch<ApiResponse<Lead>>(`/leads/${id}`, data);
    return res.data;
  },

  getStats: async () => {
    const res = await api.get<ApiResponse<{ total: number; new: number; converted: number }>>('/leads/stats');
    return res.data;
  },
};
