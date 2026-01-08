// src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BarChart3 } from "lucide-react";
import { instituteService } from "@/services/institute";

interface Institute {
  id: string;
  name: string;
  shortName: string;
  totalCadets: number;
  logo?: string;
  attendanceRate?: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [institutes, setInstitutes] = useState<Institute[]>([]);
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

  const totalCadets = institutes.reduce((s, i) => s + (i.totalCadets || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero pb-14">
        <div className="container mx-auto px-4 pt-10 text-center text-white">
          <h1 className="text-3xl font-bold">Admin Command Centre</h1>
          <p className="text-sm opacity-85">
            28 Karnataka Battalion NCC – Institutions Overview
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mt-6">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs">Institutions</p>
              <p className="text-2xl font-semibold">{institutes.length}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-xs">Total Cadets</p>
              <p className="text-2xl font-semibold">{totalCadets}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 flex justify-between">
              <p className="font-semibold">28 Karnataka NCC</p>
              <BarChart3 />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 -mt-10 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full text-center py-10">Loading institutes...</div>
        ) : institutes.length > 0 ? (
          institutes.map((inst) => (
            <Card
              key={inst.id}
              className="cursor-pointer hover:shadow-lg"
              onClick={() => navigate(`/admin/institute/${inst.id}`)}
            >
              <CardHeader className="flex flex-row gap-3">
                <div className="w-12 h-12 rounded-full border bg-white overflow-hidden">
                  {inst.logo ? (
                    <img src={inst.logo} alt={inst.shortName} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-xs">
                      {inst.shortName?.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <CardTitle className="text-base">{inst.shortName}</CardTitle>
                  <CardDescription className="text-xs">{inst.name}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {inst.totalCadets || 0}
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <BarChart3 className="w-4 h-4" />
                    {inst.attendanceRate || "N/A"}
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full mt-4">
                  Open institute dashboard <ArrowRight className="ml-auto w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">No institutes found</div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
