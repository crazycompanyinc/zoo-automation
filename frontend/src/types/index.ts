export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: string;
  createdAt?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  priceRange: string;
  active: boolean;
  createdAt: string;
}

export interface Lead {
  id: string;
  userId?: string;
  serviceId?: string;
  service?: Service;
  name: string;
  email: string;
  company?: string;
  description: string;
  budget?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: string;
  project?: Project;
}

export interface Project {
  id: string;
  leadId: string;
  userId: string;
  title: string;
  description: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  startDate?: string;
  endDate?: string;
  budget?: number;
  createdAt: string;
  lead?: Lead;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  details?: Array<{ path: string; message: string }>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
