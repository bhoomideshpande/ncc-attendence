// src/pages/AdminDashboard.tsx
import React from "react";
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

const institutes = [
  // ================= COLLEGES =================
  {
    id: "pc_jabin",
    name: "PC Jabin College, Hubli",
    shortName: "PC Jabin",
    totalCadets: 90,
    attendanceRate: "90%",
    logo: "https://media.collegedekho.com/media/img/institute/logo/1446618367.gif",
  },
  {
    id: "jg_college",
    name: "JG College, Hubli",
    shortName: "JG College",
    totalCadets: 85,
    attendanceRate: "88%",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT41OgH3NABo2anwM8DL9sJIi6AIQiuNHF2lQ&s",
  },
  {
    id: "svsb_college",
    name: "SVSB College, Saundatti",
    shortName: "SVSB",
    totalCadets: 70,
    attendanceRate: "89%",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-pCdDv6W5htEkoUOW8xu88lgAyB50ZbJ3w&s",
  },
  {
    id: "csb_college",
    name: "CSB College, Ramdurg",
    shortName: "CSB",
    totalCadets: 65,
    attendanceRate: "87%",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwhMoTMwx6YsVqNikBWh88ZxkNqxqZO7740Q&s",
  },
  {
    id: "kss_college",
    name: "KSS College, Hubli",
    shortName: "KSS",
    totalCadets: 75,
    attendanceRate: "91%",
    logo: "https://image-static.collegedunia.com/public/college_data/images/logos/1470027902vl.jpg",
  },
  {
    id: "krces_college",
    name: "KRCES College, Bailhongal",
    shortName: "KRCES",
    totalCadets: 80,
    attendanceRate: "90%",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSmnvB91fdmXW3InEnjvKqPjGET9q_D8lwmw&s",
  },
  {
    id: "ag_college",
    name: "AG College, Munavalli",
    shortName: "AG College",
    totalCadets: 60,
    attendanceRate: "86%",
    logo: "https://ik.imagekit.io/agcollege/Gallery/AGCLOGO1_Edited.png",
  },
  {
    id: "jss_gokak",
    name: "JSS College, Gokak",
    shortName: "JSS Gokak",
    totalCadets: 78,
    attendanceRate: "89%",
    logo: "https://images.shiksha.com/mediadata/images/1591878652phpsvvpQc.jpg",
  },
  {
    id: "ssca_govt",
    name: "SSCA Government College, KK Koppa",
    shortName: "SSCA Govt",
    totalCadets: 55,
    attendanceRate: "85%",
    logo: "https://via.placeholder.com/80?text=SSCA",
  },
  {
    id: "jss_dharwad",
    name: "JSS College, Dharwad",
    shortName: "JSS Dharwad",
    totalCadets: 82,
    attendanceRate: "88%",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3eCzBHXdkKKsSWYTHXR15rFeomEX3kb8S_A&s",
  },
  {
    id: "kle_tech",
    name: "KLE Technological University, Hubli",
    shortName: "KLE Tech",
    totalCadets: 120,
    attendanceRate: "92%",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp3bDpHc-bOwccM--mCw58OftWOGjTe950Dg&s",
  },

  // ================= SCHOOLS / PU =================
  {
    id: "st_paul",
    name: "St Paul School, Belgaum",
    shortName: "St Paul",
    totalCadets: 45,
    attendanceRate: "91%",
    logo: "https://www.stpaulspuc.in/instlogo.png",
  },
  {
    id: "st_jr_ramdurg",
    name: "St Junior College, Ramdurg",
    shortName: "St Jr",
    totalCadets: 50,
    attendanceRate: "89%",
    logo: "https://content.jdmagicbox.com/comp/belgaum/z7/9999px831.x831.220527132938.k2z7/catalogue/-0zo2s603qw.jpg",
  },
  {
    id: "sk_comp",
    name: "SK Composite Jr College, Saundatti",
    shortName: "SK Comp",
    totalCadets: 48,
    attendanceRate: "88%",
    logo: "https://yt3.googleusercontent.com/-PHWYeqy_GzF12rG7rexTiLSw46Eln50ZGtr28AmKrsIuo5X1E7tCUowiz7VUD6DO8G0Hqc8=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "cd_halyal",
    name: "CD Halyal High School, Ramdurg",
    shortName: "CD Halyal",
    totalCadets: 42,
    attendanceRate: "87%",
    logo: "https://schools.olympiadsuccess.com/assets/images/school_images/b_h_building.jpg",
  },
  {
    id: "kne_hs",
    name: "KNE High School, Hubli",
    shortName: "KNE HS",
    totalCadets: 55,
    attendanceRate: "90%",
    logo: "https://pbs.twimg.com/profile_images/1310475339588493312/WQRGh7mj.jpg",
  },
  {
    id: "mr_sakhare",
    name: "M R Sakhare High School, Hubli",
    shortName: "M R Sakhare",
    totalCadets: 46,
    attendanceRate: "88%",
    logo: "https://www.klemrsems.org/images/KLE-Logo.png",
  },
  {
    id: "gv_hallikeri",
    name: "GV Hallikeri High School, Hosratti",
    shortName: "GV Hallikeri",
    totalCadets: 44,
    attendanceRate: "86%",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjBSCiPVTXScqk94A-sY8sus-0dnQHAmWcQg&s",
  },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const totalCadets = institutes.reduce((s, i) => s + i.totalCadets, 0);

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
        {institutes.map((inst) => (
          <Card
            key={inst.id}
            className="cursor-pointer hover:shadow-lg"
            onClick={() => navigate(`/admin/institute/${inst.id}`)}
          >
            <CardHeader className="flex flex-row gap-3">
              <div className="w-12 h-12 rounded-full border bg-white overflow-hidden">
                <img src={inst.logo} alt={inst.shortName} className="w-full h-full object-contain" />
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
                  {inst.totalCadets}
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <BarChart3 className="w-4 h-4" />
                  {inst.attendanceRate}
                </div>
              </div>

              <Button size="sm" variant="outline" className="w-full mt-4">
                Open institute dashboard <ArrowRight className="ml-auto w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default AdminDashboard;
