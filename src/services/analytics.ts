import api from '@/lib/api';

export const analyticsService = {
  getInstituteReport: (instituteCode: string, params?: any) =>
    api.get(`/analytics/institute/${instituteCode}`, { params }),
  
  getStudentAbsences: (studentId: string, params?: any) =>
    api.get(`/analytics/student/${studentId}/absences`, { params }),
  
  getBatchReport: (instituteCode: string) =>
    api.get(`/analytics/institute/${instituteCode}/batches`),
  
  getPeriodStats: (params: any) =>
    api.get('/analytics/stats/period', { params }),
  
  getTopAbsentStudents: (params?: any) =>
    api.get('/analytics/students/absent/top', { params }),
};
