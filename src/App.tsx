// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import NewStudent from "./pages/NewStudent";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

// ⭐ Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminInstitute from "./pages/AdminInstitute";

// ⭐ Staff page (NEW)
import StaffInstituteDashboard from "./pages/StaffInstituteDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          {/* ⭐ PUBLIC ROUTES */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ⭐ ADMIN ROUTES */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/institute/:slug" element={<AdminInstitute />} />

          {/* ⭐ STAFF ROUTES */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:slug" element={<StaffInstituteDashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/new" element={<NewStudent />} />
          <Route path="/reports" element={<Reports />} />

          {/* ⭐ 404 PAGE */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
