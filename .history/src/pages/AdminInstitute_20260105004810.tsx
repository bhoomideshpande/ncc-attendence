// src/pages/AdminInstitute.tsx
import React, { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import { instituteService } from "@/services/institute";

/* ===================== COMPONENT ===================== */
const AdminInstitute: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [institute, setInstitute] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("Monthly");
  const [absenceLimit, setAbsenceLimit] = useState(2);

  const periods = ["Weekly", "Monthly", "Quarterly", "Half-Yearly", "Yearly"];
  const absenceOptions = [2, 4, 6, 8];

  useEffect(() => {
    const fetchInstitute = async () => {
      try {
        const response = await instituteService.getById(slug);
        setInstitute(response.data);
      } catch (error) {
        console.error("Error fetching institute:", error);
        setInstitute(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitute();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p>Loading institute...</p>
        </div>
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
          <p className="text-lg font-semibold">Institute not found</p>
          <Button onClick={() => navigate("/admin-dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Mock data - in production, this would come from API
  const mockReport = {
    Weekly: { attendance: 92, present: 83, absent: 7, parades: 4 },
    Monthly: { attendance: 90, present: 81, absent: 9, parades: 16 },
    Quarterly: { attendance: 88, present: 79, absent: 11, parades: 36 },
    "Half-Yearly": { attendance: 87, present: 78, absent: 12, parades: 72 },
    Yearly: { attendance: 89, present: 80, absent: 10, parades: 140 },
  };

  const mockStudents = [
    { roll: `${institute.code}-001`, name: "Sample Student 1", absents: 8 },
    { roll: `${institute.code}-002`, name: "Sample Student 2", absents: 6 },
    { roll: `${institute.code}-003`, name: "Sample Student 3", absents: 4 },
    { roll: `${institute.code}-004`, name: "Sample Student 4", absents: 2 },
  ];

  const report = mockReport[period] || mockReport.Monthly;
  const filteredStudents = mockStudents.filter(
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
    a.download = `${institute.code}_${period}_absent_${absenceLimit}.csv`;
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
            <div className="w-20 h-20 bg-white rounded-full overflow-hidden border-4 border-white/80 flex items-center justify-center">
              {institute.logo ? (
                <img src={institute.logo} className="w-full h-full object-contain" />
              ) : (
                <div className="text-2xl font-bold text-gray-600">
                  {institute.shortName?.charAt(0)}
                </div>
              )}
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
            <CardHeader><CardTitle className="text-sm">Total Cadets</CardTitle></CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{institute.totalCadets}</p>
              <p className="text-xs text-muted-foreground">
                {institute.city}
              </p>
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
