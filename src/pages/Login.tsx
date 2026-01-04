import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ⭐ UPDATED LOGIN LOGIC
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });

      toast.success(response.data.message);

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect staff to institute-specific dashboard
      navigate(`/dashboard/${response.data.staff.id}`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary to-secondary p-4">
      <Card className="w-full max-w-md shadow-custom-lg bg-white/10 backdrop-blur-xl border border-white/20">
        <CardHeader className="text-center space-y-2">
          
          {/* Premium NCC Logo */}
          <div
            className="
              w-32 h-32 
              mx-auto 
              rounded-full 
              overflow-hidden 
              flex items-center justify-center
              border-[4px]
              border-transparent
              shadow-[0_0_25px_rgba(255,255,255,0.7),0_0_40px_rgba(0,102,255,0.9),inset_0_0_20px_rgba(0,102,255,0.4)]
              hover:scale-105
              transition-all 
              duration-500 
              animate-softpulse
              bg-transparent
            "
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_National_Cadet_Corps_%28India%29.png/960px-Emblem_of_National_Cadet_Corps_%28India%29.png"
              alt="NCC Emblem"
              className="w-full h-full object-contain p-4"
            />
          </div>

          <CardTitle className="text-2xl font-bold text-white">
            NCC Portal Login
          </CardTitle>
          <CardDescription className="text-white/80">
            Enter your credentials to access the portal
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email or ID
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email or unique ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/20 border-white/30 text-white placeholder-white/70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/20 border-white/30 text-white placeholder-white/70"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-primary hover:bg-white/90 text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="text-sm text-center text-white/70">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white font-medium underline hover:text-white/90"
            >
              Register here
            </Link>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/admin-login"
              className="text-secondary font-medium hover:underline"
            >
              Admin Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
