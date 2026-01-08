import { useState } from "react";
import { FlagHeader } from "@/components/FlagHeader";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { studentService } from "@/services/student";

interface Student {
  _id: string;
  roll: string;
  firstName: string;
  lastName: string;
  instituteCode: string;
  status: string;
  photos: string[];
}

const Students = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = React.useState<Student[]>([]);

  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await studentService.getAll();
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (studentId: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/students/${studentId}`);
      setStudents(students.filter(s => s._id !== studentId));
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <FlagHeader />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Students</h1>
            <p className="text-muted-foreground">Manage NCC student records</p>
          </div>
          <Button onClick={() => navigate("/students/new")} className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add New Student
          </Button>
        </div>

        <Card className="shadow-custom-md mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>All Students ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Roll No</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Institute</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-sm">{student.roll}</td>
                      <td className="py-3 px-4 font-medium">{student.firstName} {student.lastName}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{student.instituteCode}</td>
                      <td className="py-3 px-4 text-sm">{student.status}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/students/${student._id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(student._id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Students;
