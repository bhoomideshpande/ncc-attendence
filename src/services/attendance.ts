import api from '@/lib/api';

export const attendanceService = {
  markAttendance: (paradeId: string, attendanceRecords: any[]) =>
    api.post('/attendance/mark', { paradeId, attendanceRecords }),
  
  getStudentAttendance: (studentId: string) =>
    api.get(`/attendance/student/${studentId}`),
  
  getInstituteAttendance: (instituteCode: string, date: string) =>
    api.get(`/attendance/institute/${instituteCode}/${date}`),
  
  getReport: (instituteCode: string, params?: { startDate?: string; endDate?: string }) =>
    api.get(`/attendance/report/${instituteCode}`, { params }),
};
