import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Admin Login Successful!");
      // ⭐ VERY IMPORTANT: GO TO ADMIN DASHBOARD, NOT STAFF DASHBOARD
      navigate("/admin-dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/75 to-secondary p-4">
      <Card className="w-full max-w-md relative rounded-2xl shadow-2xl border border-orange-300/50">
        {/* NCC Logo with glow */}
        <div className="absolute top-[-35px] left-1/2 -translate-x-1/2">
          <div className="w-28 h-28 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse ring-4 ring-orange-300/40">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_National_Cadet_Corps_%28India%29.png/960px-Emblem_of_National_Cadet_Corps_%28India%29.png"
              alt="NCC"
              className="w-16 h-16 drop-shadow-md"
            />
          </div>
        </div>

        <CardHeader className="pt-20 text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-orange-600 tracking-wide">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-gray-600">
            Restricted access for administrators only
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="font-medium text-gray-700">Admin ID</label>
              <Input
                type="text"
                placeholder="Enter admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-700">Password</label>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl"
            >
              {loading ? "Logging in..." : "Admin Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center">
          <Link to="/login" className="text-blue-700 hover:underline text-sm font-medium">
            Back to Staff Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
