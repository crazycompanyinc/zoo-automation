import api from './api.js';
import type { Service, ApiResponse } from '../types/index.js';

export const serviceService = {
  getAll: async () => {
    const res = await api.get<ApiResponse<Service[]>>('/services');
    return res.data;
  },

  getBySlug: async (slug: string) => {
    const res = await api.get<ApiResponse<Service>>(`/services/${slug}`);
    return res.data;
  },
};
