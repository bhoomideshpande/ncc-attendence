import React from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp } from "lucide-react";

// Institute details
const institutes: any = {
  pc_jabin: {
    name: "PC Jabin College, Hubli",
    logo: "https://media.collegedekho.com/media/img/institute/logo/1446618367.gif",
    totalStudents: 90,
    todayAttendance: 83,
  },
  jg_college: {
    name: "JG College, Hubli",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT41OgH3NABo2anwM8DL9sJIi6AIQiuNHF2lQ&s",
    totalStudents: 85,
    todayAttendance: 77,
  },
  svsb_college: {
    name: "SVSB College, Saundatti",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-pCdDv6W5htEkoUOW8xu88lgAyB50ZbJ3w&s",
    totalStudents: 70,
    todayAttendance: 63,
  },
  csb_college: {
    name: "CSB College, Ramdurg",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwhMoTMwx6YsVqNikBWh88ZxkNqxqZO7740Q&s",
    totalStudents: 65,
    todayAttendance: 57,
  },
  kss_college: {
    name: "KSS College, Hubli",
    logo: "https://image-static.collegedunia.com/public/college_data/images/logos/1470027902vl.jpg",
    totalStudents: 75,
    todayAttendance: 68,
  },
  krces_college: {
    name: "KRCES College, Bailhongal",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSmnvB91fdmXW3InEnjvKqPjGET9q_D8lwmw&s",
    totalStudents: 80,
    todayAttendance: 72,
  },
  ag_college: {
    name: "AG College, Munavalli",
    logo: "https://ik.imagekit.io/agcollege/Gallery/AGCLOGO1_Edited.png",
    totalStudents: 60,
    todayAttendance: 52,
  },
  jss_gokak: {
    name: "JSS College, Gokak",
    logo: "https://images.shiksha.com/mediadata/images/1591878652phpsvvpQc.jpg",
    totalStudents: 78,
    todayAttendance: 70,
  },
  ssca_govt: {
    name: "SSCA Government College, KK Koppa",
    logo: "https://via.placeholder.com/80?text=SSCA",
    totalStudents: 55,
    todayAttendance: 47,
  },
  jss_dharwad: {
    name: "JSS College, Dharwad",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3eCzBHXdkKKsSWYTHXR15rFeomEX3kb8S_A&s",
    totalStudents: 82,
    todayAttendance: 73,
  },
  kle_tech: {
    name: "KLE Technological University, Hubli",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp3bDpHc-bOwccM--mCw58OftWOGjTe950Dg&s",
    totalStudents: 120,
    todayAttendance: 110,
  },
  st_paul: {
    name: "St Paul School, Belgaum",
    logo: "https://www.stpaulspuc.in/instlogo.png",
    totalStudents: 45,
    todayAttendance: 42,
  },
  st_jr_ramdurg: {
    name: "St Junior College, Ramdurg",
    logo: "https://content.jdmagicbox.com/comp/belgaum/z7/9999px831.x831.220527132938.k2z7/catalogue/-0zo2s603qw.jpg",
    totalStudents: 50,
    todayAttendance: 45,
  },
  sk_comp: {
    name: "SK Composite Jr College, Saundatti",
    logo: "https://yt3.googleusercontent.com/-PHWYeqy_GzF12rG7rexTiLSw46Eln50ZGtr28AmKrsIuo5X1E7tCUowiz7VUD6DO8G0Hqc8=s900-c-k-c0x00ffffff-no-rj",
    totalStudents: 48,
    todayAttendance: 42,
  },
  cd_halyal: {
    name: "CD Halyal High School, Ramdurg",
    logo: "https://schools.olympiadsuccess.com/assets/images/school_images/b_h_building.jpg",
    totalStudents: 42,
    todayAttendance: 37,
  },
  kne_hs: {
    name: "KNE High School, Hubli",
    logo: "https://pbs.twimg.com/profile_images/1310475339588493312/WQRGh7mj.jpg",
    totalStudents: 55,
    todayAttendance: 50,
  },
  mr_sakhare: {
    name: "M R Sakhare High School, Hubli",
    logo: "https://via.placeholder.com/80?text=MRS",
    totalStudents: 46,
    todayAttendance: 41,
  },
};

const StaffDashboard = () => {
  const { slug } = useParams();
  const info = institutes[slug];

  if (!info) {
    return (
      <div className="p-10 text-center text-2xl font-bold">
        Invalid Institute
      </div>
    );
  }

  return (
    <>
      <Navigation />

      <div className="container mx-auto p-6 space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard - {info.name}</h1>
            <p className="text-gray-500">Welcome to NCC Attendance Portal</p>
          </div>

          {/* Institute logo */}
          <img
            src={info.logo}
            alt="logo"
            className="w-20 h-20 object-contain rounded-lg shadow-md"
          />
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Students</CardTitle>
              <Users className="w-6 h-6" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{info.totalStudents}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Today's Attendance</CardTitle>
              <TrendingUp className="w-6 h-6" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{info.todayAttendance}</p>
            </CardContent>
          </Card>

        </div>

        {/* QUICK ACTIONS */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 text-center text-sm">
            <div className="p-5 border-r cursor-pointer hover:bg-gray-100">
              Add Student
            </div>
            <div className="p-5 cursor-pointer hover:bg-gray-100">
              View Reports
            </div>
          </CardContent>
        </Card>

        {/* RECENT ACTIVITIES */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            <div className="flex justify-between">
              <div>
                <p className="font-medium">Attendance marked</p>
                <p className="text-gray-500 text-sm">{info.name}</p>
              </div>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="font-medium">Student admitted</p>
                <p className="text-gray-500 text-sm">New Cadet</p>
              </div>
              <p className="text-sm text-gray-500">6 hours ago</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StaffDashboard;
