// src/pages/AdminInstitute.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertCircle,
  Download,
} from "lucide-react";

/* ===================== MASTER DATA ===================== */
const institutes = [
  {
    id: "pc_jabin",
    name: "PC Jabin College, Hubli",
    battalion: "28 Karnataka Battalion NCC",
    logo: "https://media.collegedekho.com/media/img/institute/logo/1446618367.gif",
    totalCadets: 90,
    reports: {
      Weekly: { attendance: 92, present: 83, absent: 7, parades: 4 },
      Monthly: { attendance: 90, present: 81, absent: 9, parades: 16 },
      Quarterly: { attendance: 88, present: 79, absent: 11, parades: 36 },
      "Half-Yearly": { attendance: 87, present: 78, absent: 12, parades: 72 },
      Yearly: { attendance: 89, present: 80, absent: 10, parades: 140 },
    },
    students: [
      { roll: "PC-001", name: "Rahul Patil", absents: 8 },
      { roll: "PC-014", name: "Sneha Kulkarni", absents: 6 },
      { roll: "PC-021", name: "Amit Desai", absents: 4 },
      { roll: "PC-032", name: "Neha Joshi", absents: 2 },
    ],
  },

  {
    id: "jg_college",
    name: "JG College, Hubli",
    battalion: "28 Karnataka Battalion NCC",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT41OgH3NABo2anwM8DL9sJIi6AIQiuNHF2lQ&s",
    totalCadets: 85,
    reports: {
      Weekly: { attendance: 90, present: 77, absent: 8, parades: 4 },
      Monthly: { attendance: 88, present: 75, absent: 10, parades: 15 },
      Quarterly: { attendance: 86, present: 73, absent: 12, parades: 34 },
      "Half-Yearly": { attendance: 85, present: 72, absent: 13, parades: 70 },
      Yearly: { attendance: 87, present: 74, absent: 11, parades: 135 },
    },
    students: [
      { roll: "JG-003", name: "Amit Verma", absents: 8 },
      { roll: "JG-019", name: "Rohit Kulkarni", absents: 6 },
      { roll: "JG-025", name: "Neha Joshi", absents: 4 },
      { roll: "JG-041", name: "Pooja Patil", absents: 2 },
    ],
  },

  {
    id: "st_paul",
    name: "St Paul School, Belgaum",
    battalion: "28 Karnataka Battalion NCC",
    logo: "https://www.stpaulspuc.in/instlogo.png",
    totalCadets: 45,
    reports: {
      Weekly: { attendance: 93, present: 42, absent: 3, parades: 3 },
      Monthly: { attendance: 91, present: 41, absent: 4, parades: 12 },
      Quarterly: { attendance: 89, present: 40, absent: 5, parades: 26 },
      "Half-Yearly": { attendance: 88, present: 39, absent: 6, parades: 50 },
      Yearly: { attendance: 90, present: 41, absent: 4, parades: 98 },
    },
    students: [
      { roll: "SP-007", name: "Arjun D", absents: 6 },
      { roll: "SP-014", name: "Riya S", absents: 4 },
      { roll: "SP-021", name: "Karan M", absents: 2 },
    ],
  },
];

/* ===================== CONSTANTS ===================== */
const periods = ["Weekly", "Monthly", "Quarterly", "Half-Yearly", "Yearly"];
const absenceOptions = [2, 4, 6, 8];

/* ===================== COMPONENT ===================== */
const AdminInstitute: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [period, setPeriod] = useState("Monthly");
  const [absenceLimit, setAbsenceLimit] = useState(2);

  const institute = institutes.find((i) => i.id === slug);
  if (!institute) return null;

  const report = institute.reports[period];

  const filteredStudents = institute.students.filter(
    (s) => s.absents >= absenceLimit
  );

  /* ===================== CSV DOWNLOAD ===================== */
  const downloadCSV = () => {
    const rows = [
      ["Institute", institute.name],
      ["Period", period],
      ["Absence Filter", `>= ${absenceLimit} parades`],
      ["Total Cadets", institute.totalCadets],
      ["Attendance (%)", report.attendance],
      ["Present", report.present],
      ["Absent", report.absent],
      ["Parades", report.parades],
      [],
      ["Roll No", "Name", "Absents"],
      ...filteredStudents.map((s) => [s.roll, s.name, s.absents]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${institute.id}_${period}_absent_${absenceLimit}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <div className="bg-gradient-hero pb-16">
        <div className="container mx-auto px-4 pt-8">
          <Button
            size="sm"
            variant="outline"
            className="mb-4 bg-white/10 text-white"
            onClick={() => navigate("/admin-dashboard")}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full overflow-hidden border-4 border-white/80">
              <img src={institute.logo} className="w-full h-full object-contain" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">{institute.name}</h1>
              <p className="text-sm opacity-80">{institute.battalion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main className="container mx-auto px-4 -mt-10 pb-12 space-y-6">
        {/* FILTERS */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filters</CardTitle>
            <CardDescription>
              Attendance period & absentee threshold
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-2">
              {periods.map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={period === p ? "default" : "outline"}
                  onClick={() => setPeriod(p)}
                >
                  {p}
                </Button>
              ))}
            </div>

            <div className="flex gap-3 items-center">
              <select
                className="border rounded-md px-3 py-1 text-sm"
                value={absenceLimit}
                onChange={(e) => setAbsenceLimit(Number(e.target.value))}
              >
                {absenceOptions.map((o) => (
                  <option key={o} value={o}>
                    Absent ≥ {o} parades
                  </option>
                ))}
              </select>

              <Button size="sm" onClick={downloadCSV}>
                <Download className="w-4 h-4 mr-1" />
                Download CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Attendance</CardTitle></CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-600">
                {report.attendance}%
              </p>
              <p className="text-xs text-muted-foreground">
                Present {report.present} · Absent {report.absent}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Parades</CardTitle></CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{report.parades}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Note</CardTitle></CardHeader>
            <CardContent className="flex gap-2 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Data filtered dynamically
            </CardContent>
          </Card>
        </div>

        {/* ABSENT STUDENTS */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Students Absent ≥ {absenceLimit} Parades
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredStudents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No students match this criteria.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Roll</th>
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Absents</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td>{s.roll}</td>
                      <td>{s.name}</td>
                      <td>{s.absents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminInstitute;
