import api from '@/lib/api';

export const instituteService = {
  getAll: () =>
    api.get('/institutes'),
  
  getById: (id: string) =>
    api.get(`/institutes/${id}`),
  
  create: (instituteData: any) =>
    api.post('/institutes', instituteData),
  
  update: (id: string, instituteData: any) =>
    api.put(`/institutes/${id}`, instituteData),
  
  getStats: (id: string) =>
    api.get(`/institutes/${id}/stats`),
};
