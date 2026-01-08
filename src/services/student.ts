import api from '@/lib/api';

export const studentService = {
  register: (studentData: any) =>
    api.post('/students/register', studentData),
  
  getAll: () =>
    api.get('/students'),
  
  getByInstitute: (instituteCode: string) =>
    api.get(`/students/institute/${instituteCode}`),
  
  getByRoll: (roll: string) =>
    api.get(`/students/roll/${roll}`),
  
  update: (id: string, studentData: any) =>
    api.put(`/students/${id}`, studentData),
  
  delete: (id: string) =>
    api.delete(`/students/${id}`),
};
