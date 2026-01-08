import api from '@/lib/api';

export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (staffData: any) =>
    api.post('/auth/register', staffData),
};
