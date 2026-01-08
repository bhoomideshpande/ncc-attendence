import api from '@/lib/api';

export const paradeService = {
  create: (paradeData: any) =>
    api.post('/parades', paradeData),
  
  getAll: () =>
    api.get('/parades'),
  
  getByInstitute: (instituteCode: string) =>
    api.get(`/parades/institute/${instituteCode}`),
  
  update: (id: string, paradeData: any) =>
    api.put(`/parades/${id}`, paradeData),
  
  delete: (id: string) =>
    api.delete(`/parades/${id}`),
};
