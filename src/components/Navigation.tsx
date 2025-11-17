import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Users, FileText } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();

  // HIDE NAVIGATION FOR ADMIN PAGES
  if (location.pathname.startsWith("/admin")) {
    return null; // <- no navbar for admin dashboard or admin pages
  }

  return (
    <div className="w-full bg-white shadow-sm border-b">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-8 py-5 text-lg">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 pb-2 ${
                isActive
                  ? "text-primary font-semibold border-b-4 border-primary"
                  : "text-gray-600"
              }`
            }
          >
            <Home className="w-6 h-6" />
            Dashboard
          </NavLink>

          <NavLink
            to="/students"
            className={({ isActive }) =>
              `flex items-center gap-2 pb-2 ${
                isActive
                  ? "text-primary font-semibold border-b-4 border-primary"
                  : "text-gray-600"
              }`
            }
          >
            <Users className="w-6 h-6" />
            Students
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-2 pb-2 ${
                isActive
                  ? "text-primary font-semibold border-b-4 border-primary"
                  : "text-gray-600"
              }`
            }
          >
            <FileText className="w-6 h-6" />
            Reports
          </NavLink>

        </div>
      </div>
    </div>
  );
};
