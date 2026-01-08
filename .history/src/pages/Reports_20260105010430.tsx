import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FlagHeader } from "@/components/FlagHeader";
import { Navigation } from "@/components/Navigation";
import { instituteService } from "@/services/institute";
import { Download, Loader2 } from "lucide-react";

const batches = ["2023", "2024", "2025", "2026"];
const TOTAL_PARADES = 48;

const dummyStudents = [
  { id: "NCC2025648758", name: "bhavana sherekar", instituteCode: "NDA", batch: "2025", attendance: 12 },
  { id: "NCC2025908269", name: "bhavana sherekar", instituteCode: "IMA", batch: "2024", attendance: 10 },
  { id: "NCC2025113240", name: "sushant tiwari", instituteCode: "NDA", batch: "2025", attendance: 14 },
  { id: "NCC2025676484", name: "Anusha S", instituteCode: "IAF", batch: "2025", attendance: 8 },
  { id: "NCC2025811575", name: "Bhoomi", instituteCode: "INS", batch: "2023", attendance: 16 },
  { id: "NCC2025364205", name: "bhavana sherekar", instituteCode: "RIMC", batch: "2024", attendance: 6 },
  { id: "NCC2025364206", name: "Raj Kumar", instituteCode: "KLE_TECH", batch: "2025", attendance: 20 },
  { id: "NCC2025364207", name: "Priya Singh", instituteCode: "PC_JABIN", batch: "2025", attendance: 15 },
];

const Reports = () => {
  const [selectedInstitute, setSelectedInstitute] = useState("All");
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [showAbsentOnly, setShowAbsentOnly] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await instituteService.getAll();
        setInstitutes(response.data || []);
      } catch (error) {
        console.error("Error fetching institutes:", error);
        setInstitutes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

  const students = dummyStudents;

  const downloadCSV = (records: any[]) => {
    if (!records || records.length === 0) return;

    const header = ["ID", "Name", "Institute", "Batch", "Absent", "Attendance"];

    const rows = records.map((s) => {
      const absent = TOTAL_PARADES - (s.attendance || 0);
      return [
        s.id,
        s.name,
        s.instituteCode,
        s.batch || "N/A",
        `${absent} / ${TOTAL_PARADES}`,
        `${s.attendance || 0} / ${TOTAL_PARADES}`,
      ].join(",");
    });

    const csv = [header.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "NCC_Student_Report.csv";
    a.click();
  };

  const filteredData = students.filter((student) => {
    if (selectedInstitute !== "All" && student.instituteCode !== selectedInstitute)
      return false;

    if (selectedBatch !== "All" && student.batch !== selectedBatch)
      return false;

    if (showAbsentOnly && (student.attendance || 0) >= TOTAL_PARADES)
      return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <FlagHeader />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">View, filter & export NCC student attendance reports</p>
        </div>

        <Card className="shadow-sm rounded-xl bg-white mb-8">
          <CardHeader>
            <CardTitle className="text-gray-900">Filters</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="mb-1 font-medium">Institute</p>
                <Select onValueChange={setSelectedInstitute} value={selectedInstitute}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="All Institutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Institutes</SelectItem>
                    {institutes.map((inst) => (
                      <SelectItem key={inst.id} value={inst.code}>
                        {inst.shortName || inst.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="mb-1 font-medium">Batch</p>
                <Select onValueChange={setSelectedBatch} value={selectedBatch}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="All Batches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Batches</SelectItem>
                    {batches.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="mb-1 font-medium">Report Period</p>
                <Select onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Monthly" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="halfyearly">Half Yearly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="mb-1 font-medium">Filter</p>
                <Button
                  onClick={() => setShowAbsentOnly(!showAbsentOnly)}
                  variant={showAbsentOnly ? "default" : "outline"}
                  className="w-full"
                >
                  {showAbsentOnly ? "Showing Absent Only" : "Show Absent Students"}
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={() => downloadCSV(filteredData)}>
                <Download className="w-4 h-4 mr-1" />
                Download Report (CSV)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm rounded-xl bg-white">
          <CardHeader>
            <CardTitle>
              Student Records ({filteredData.length})
            </CardTitle>
          </CardHeader>

          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Institute</th>
                  <th className="p-3 text-left">Batch</th>
                  <th className="p-3 text-left">Absent</th>
                  <th className="p-3 text-left">Attendance</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((student, i) => {
                    const absent = TOTAL_PARADES - (student.attendance || 0);

                    return (
                      <tr key={i} className="border-b">
                        <td className="p-3">{student.id}</td>
                        <td className="p-3 capitalize">{student.name}</td>
                        <td className="p-3">{student.instituteCode}</td>
                        <td className="p-3">{student.batch || "N/A"}</td>
                        <td className="p-3 text-red-600 font-semibold">{absent} / {TOTAL_PARADES}</td>
                        <td className="p-3 text-green-600 font-semibold">{student.attendance || 0} / {TOTAL_PARADES}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="p-3 text-center">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Reports;
