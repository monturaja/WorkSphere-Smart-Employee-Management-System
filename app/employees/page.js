"use client";
import { Plus, UserPlus, Users } from 'lucide-react';
import Link from "next/link";
import EmployeeList from "@/components/employee/EmployeeList";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function EmployeesPage() {
  const { data: session } = useSession();
  const userRole = session?.user?.role || 'employee';
  const isAdmin = userRole === 'admin';
  const isHR = userRole === 'hr';

  const theme = {
    accent: isAdmin ? "text-amber-500" : isHR ? "text-emerald-500" : "text-indigo-500",
    gradient: isAdmin 
      ? "from-amber-600 to-amber-500" 
      : isHR 
        ? "from-emerald-600 to-sky-500" 
        : "from-indigo-600 to-indigo-500",
    blur: isAdmin ? "bg-amber-600/5" : isHR ? "bg-emerald-600/5" : "bg-indigo-600/5"
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative">
        {/* Decorative background for admin/HR */}
        {(isAdmin || isHR) && <div className={`absolute -top-10 -right-10 w-64 h-64 ${theme.blur} rounded-full blur-[80px] -z-10`}></div>}
        
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users className={`w-5 h-5 ${theme.accent}`} />
            <h1 className="text-4xl font-black text-white tracking-tighter">
              {isAdmin ? 'Personnel' : isHR ? 'Workforce' : 'Employees'} <span className={theme.accent}>Matrix</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
            {isAdmin ? 'High-Level Workforce Oversight & Provisioning' : isHR ? 'Human Resource Talent Management & Acquisition' : 'Manage your workforce and their roles.'}
          </p>
        </div>
        
        <Link 
          href="/employees/add"
          className={`flex items-center gap-2 bg-gradient-to-r ${theme.gradient} text-slate-950 px-7 py-4 rounded-2xl hover:brightness-110 transition-all text-xs font-black uppercase tracking-widest shadow-2xl active:scale-95`}
        >
          <UserPlus className="w-5 h-5" />
          {isAdmin ? 'Provision Personnel' : isHR ? 'Recruit Personnel' : 'Add Employee'}
        </Link>
      </header>

      <EmployeeList />
    </DashboardLayout>
  );
}
