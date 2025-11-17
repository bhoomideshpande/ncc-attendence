import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2, Users, TrendingUp, AlertTriangle } from "lucide-react";

// -------------------- INSTITUTE LIST --------------------
const institutes = [
  "KLE Technological University, Hubli",
  "KLE SK Arts College",
  "KLE Science & Commerce College",
  "RLS Institute",
  "KLE BCA College",
  "BVB Campus",
  "PC Jabin Science College",
  "Karnataka Science College Dharwad",
  "Karnataka Arts College Dharwad",
  "JSS Banashankari College",
  "JSS College Dharwad",
  "SKE Society Arts & Commerce College",
  "SKE Society Women’s College",
  "SDM Engineering College",
  "SDM Degree College",
  "KIMS Hubballi",
  "Anjuman-e-Islam Hubballi",
  "Chetana PU & Degree College Hubballi",
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* -------------------- HEADER -------------------- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-wide">
          NCC Admin Dashboard
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Monitor institute performance, attendance, and battalion status
        </p>
      </div>

      {/* ------------------- SUMMARY CARDS ------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <Card className="shadow-md p-4 border">
          <CardHeader>
            <CardTitle>Total Institutes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{institutes.length}</p>
            <p className="text-gray-500 text-sm mt-1">Under Battalion Command</p>
          </CardContent>
        </Card>

        <Card className="shadow-md p-4 border">
          <CardHeader>
            <CardTitle>Total Cadets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">2,450</p>
            <p className="text-gray-500 text-sm mt-1">Across all institutes</p>
          </CardContent>
        </Card>

        <Card className="shadow-md p-4 border">
          <CardHeader>
            <CardTitle>Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">84%</p>
            <p className="text-gray-500 text-sm mt-1">Battalion-wide average</p>
          </CardContent>
        </Card>

      </div>

      {/* ------------------- INSTITUTE GRID ------------------- */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Institutes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {institutes.map((name, idx) => (
          <Card
            key={idx}
            className="cursor-pointer bg-white hover:shadow-xl shadow-sm border transition-all rounded-xl"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="w-6 h-6 text-primary" />
                {name}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Students: <span className="font-semibold">120</span>
              </p>

              <p className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                Attendance: <span className="font-semibold">86%</span>
              </p>

              <p className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Absentees Today: <span className="font-semibold">14</span>
              </p>
            </CardContent>
          </Card>
        ))}

      </div>
    </div>
  );
};

export default AdminDashboard;
