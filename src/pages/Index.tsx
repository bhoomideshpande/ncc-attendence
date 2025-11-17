import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Award, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center gap-10 mb-10">

            {/* --- NCC EMBLEM (Left Side) --- */}
            <div className="w-36 h-36 rounded-full shadow-[0_0_25px_rgba(255,255,255,0.8),0_0_35px_rgba(0,102,204,0.6)] border-4 border-white flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_National_Cadet_Corps_%28India%29.png/960px-Emblem_of_National_Cadet_Corps_%28India%29.png"
                alt="NCC Emblem"
                className="w-full h-full object-contain p-3"
              />
            </div>

            {/* --- INDIAN FLAG PHOTO (Right Side) --- */}
            <div className="w-36 h-36 rounded-full shadow-[0_0_25px_rgba(255,255,255,0.8),0_0_35px_rgba(0,102,204,0.6)] border-4 border-white flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105">
              <img
                src="https://thumbs.dreamstime.com/b/india-paper-flag-patriotic-background-national-138241478.jpg"
                alt="Indian Flag"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            NCC Attendance Portal
          </h1>
          <p className="text-xl text-white/90 mb-2">National Cadet Corps</p>
          <p className="text-lg text-white/80 italic">Unity and Discipline</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 max-w-5xl mx-auto">
  {[
    { icon: Users, title: "Student Management", desc: "Comprehensive student records" },
    { icon: TrendingUp, title: "Attendance Tracking", desc: "Real-time attendance monitoring" },
    { icon: Award, title: "Certificates", desc: "Digital certificate issuance" },
  ].map((feature, index) => (
    <div
      key={index}
      className="
        rounded-2xl 
        p-6 
        text-center 
        bg-white/10 
        backdrop-blur-xl 
        border border-white/20
        shadow-[0_0_20px_rgba(255,255,255,0.15),0_0_30px_rgba(0,102,204,0.4)]
        hover:shadow-[0_0_25px_rgba(255,255,255,0.5),0_0_40px_rgba(0,102,204,0.7)]
        hover:scale-[1.03]
        transition-all
        duration-300
      "
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="
        w-20 h-20 
        mx-auto mb-4 
        rounded-full 
        bg-white/20 
        flex items-center justify-center 
        border border-white/40
        shadow-[0_0_20px_rgba(255,255,255,0.3)]
        backdrop-blur-md
      ">
        <feature.icon className="w-10 h-10 text-white" />
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-sm text-white/80">{feature.desc}</p>
    </div>
  ))}
</div>


        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
            onClick={() => navigate("/login")}
          >
            <Shield className="w-5 h-5 mr-2" />
            Staff Login
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 border-2"
            onClick={() => navigate("/admin-login")}
          >
            Admin Portal
          </Button>
        </div>

        <div className="mt-12 text-center text-white/70 text-sm">
          <p>
            New to the portal?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-white underline hover:text-white/90"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
