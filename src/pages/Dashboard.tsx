import React from "react";
import { FlagHeader } from "@/components/FlagHeader";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, FileText, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [totalStudents, setTotalStudents] = React.useState(0);

  React.useEffect(() => {
    const storedStudents = localStorage.getItem("ncc_students");
    if (storedStudents) {
      setTotalStudents(JSON.parse(storedStudents).length);
    }
  }, []);

  const stats = [
    { title: "Total Students", value: totalStudents.toString(), icon: Users },
    { title: "Today's Attendance", value: "0", icon: TrendingUp },
  ];

  const quickActions = [
    { label: "Add Student", icon: UserPlus, action: () => navigate("/students/new") },
    { label: "View Reports", icon: FileText, action: () => navigate("/reports") },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <FlagHeader />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to the NCC Attendance Portal</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition rounded-xl bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-500">{stat.title}</CardTitle>
                <stat.icon className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-sm rounded-xl bg-white mb-8">
          <CardHeader>
            <CardTitle className="text-gray-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col items-center gap-2 text-gray-800"
                  onClick={action.action}
                >
                  <action.icon className="w-7 h-7" />
                  <span className="font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="shadow-sm rounded-xl bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Student admitted", name: "Rahul Kumar", time: "2 hours ago" },
                { action: "Attendance marked", name: "Company A", time: "4 hours ago" },
                { action: "Certificate issued", name: "Priya Singh", time: "1 day ago" },
                { action: "Event created", name: "Annual Parade", time: "2 days ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-none">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.name}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
